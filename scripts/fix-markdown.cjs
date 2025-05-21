#!/usr/bin/env node

/**
 * Markdown 語法修復工具
 * 
 * 此腳本用於修復 Markdown 文件中的常見語法問題，特別是：
 * 1. HTML 標籤平衡問題（多餘或缺失的標籤）
 * 2. 確保標籤屬性符合 JSX 規範（class 變為 className 等）
 * 3. 修復自閉合標籤格式（如 <br> 改為 <br />）
 * 4. 處理行尾空格問題
 * 5. 調整標題、列表格式等
 * 
 * 用法：node fix-markdown.cjs [檔案路徑] [--write] [--lint]
 * --write: 直接修改原始檔案（否則僅顯示修改結果）
 * --lint: 在修復後執行 markdownlint 檢查
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
/* eslint-enable @typescript-eslint/no-require-imports */

// 顏色配置，用於美化輸出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

// 處理命令行參數
const args = process.argv.slice(2);
const writeMode = args.includes('--write');
const lintMode = args.includes('--lint');
let targetFilePath = null;

for (const arg of args) {
  if (!arg.startsWith('--') && arg.endsWith('.md')) {
    targetFilePath = arg;
    break;
  }
}

if (!targetFilePath) {
  console.error(`${colors.red}錯誤：請指定一個 Markdown 檔案路徑${colors.reset}`);
  console.error(`用法：node fix-markdown.cjs [檔案路徑] [--write] [--lint]`);
  process.exit(1);
}

// 確認檔案存在
const fullPath = path.isAbsolute(targetFilePath) 
  ? targetFilePath 
  : path.join(process.cwd(), targetFilePath);

if (!fs.existsSync(fullPath)) {
  console.error(`${colors.red}錯誤：找不到檔案 ${fullPath}${colors.reset}`);
  process.exit(1);
}

// 讀取檔案內容
const originalContent = fs.readFileSync(fullPath, 'utf8');

// HTML 標籤處理相關正則表達式
const selfClosingTags = [
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
  'link', 'meta', 'param', 'source', 'track', 'wbr'
];

// HTML to JSX 屬性轉換映射
const attributeMap = {
  'class': 'className',
  'for': 'htmlFor',
  'tabindex': 'tabIndex',
  'maxlength': 'maxLength',
  'readonly': 'readOnly',
  'contenteditable': 'contentEditable',
  'crossorigin': 'crossOrigin',
  'allowfullscreen': 'allowFullScreen',
  'frameborder': 'frameBorder',
  'enctype': 'encType',
};

// 待修復的標記類型及對應的正則表達式
const fixers = [
  // 修復開始和結束標籤不匹配的問題
  {
    name: '標籤平衡',
    fix: fixHtmlTagBalance
  },
  // 修復無屬性的自閉合標籤 <br> -> <br />
  {
    name: '自閉合標籤',
    regex: new RegExp(`<(${selfClosingTags.join('|')})\\s*>`, 'g'),
    replacement: '<$1 />'
  },
  // 修復有屬性的自閉合標籤 <img src="..."> -> <img src="..." />
  {
    name: '自閉合標籤（帶屬性）',
    regex: new RegExp(`<(${selfClosingTags.join('|')})\\s+([^>]*[^/])>`, 'g'),
    replacement: '<$1 $2 />'
  },
  // 修復格式不標準的自閉合標籤 <br/> -> <br />
  {
    name: '自閉合標籤空格',
    regex: /<([a-zA-Z][a-zA-Z0-9]*)([^>]*?)\/>/g,
    replacement: (match, tag, attrs) => {
      if (selfClosingTags.includes(tag.toLowerCase())) {
        return `<${tag}${attrs} />`;
      }
      return match;
    }
  },
  // 修復 class 到 className 的轉換
  {
    name: 'HTML 屬性轉 JSX',
    fix: convertHtmlAttributesToJsx
  },
  // 修復行尾空格
  {
    name: '行尾空格',
    regex: /[ \t]+$/gm,
    replacement: ''
  },
  // 修復連續空行
  {
    name: '連續空行',
    regex: /\n{3,}/g,
    replacement: '\n\n'
  }
];

// 主要修復函數
function fixMarkdown(content) {
  let fixed = content;
  
  // 應用每一個修復步驟
  for (const fixer of fixers) {
    if (fixer.fix && typeof fixer.fix === 'function') {
      fixed = fixer.fix(fixed);
    } else if (fixer.regex && fixer.replacement) {
      fixed = fixed.replace(fixer.regex, fixer.replacement);
    }
  }

  // 特殊處理 - 修復縮進式代碼塊為圍欄式代碼塊
  fixed = fixIndentedCodeBlocks(fixed);

  // 特殊處理 - 確保文件末尾有單個換行符
  if (!fixed.endsWith('\n')) {
    fixed += '\n';
  } else if (fixed.endsWith('\n\n')) {
    while (fixed.endsWith('\n\n')) {
      fixed = fixed.substring(0, fixed.length - 1);
    }
  }
  
  // 特殊處理 - 修復多餘的連續空行
  fixed = fixed.replace(/\n{3,}/g, '\n\n');
  
  // 特殊處理 - 確保表格前後有空行
  fixed = fixed.replace(/([^\n])\n([ \t]*\|)/g, '$1\n\n$2');
  fixed = fixed.replace(/([ \t]*\|[^\n]+\|[ \t]*)\n([^\n\|])/g, '$1\n\n$2');

  return fixed;
}

// HTML 到 JSX 屬性轉換
function convertHtmlAttributesToJsx(content) {
  let result = content;

  // 處理常規屬性轉換
  Object.entries(attributeMap).forEach(([htmlAttr, jsxAttr]) => {
    // 匹配帶引號的屬性
    const quotedRegex = new RegExp(`\\s${htmlAttr}=(['"])(.+?)\\1`, 'g');
    result = result.replace(quotedRegex, (match, quote, value) => {
      return ` ${jsxAttr}=${quote}${value}${quote}`;
    });
    
    // 匹配不帶引號的屬性
    const unquotedRegex = new RegExp(`\\s${htmlAttr}=([^\\s'"]+)`, 'g');
    result = result.replace(unquotedRegex, (match, value) => {
      return ` ${jsxAttr}="${value}"`;
    });
  });

  // 處理布爾屬性
  const booleanAttrs = ['checked', 'disabled', 'readonly', 'required', 'selected', 'hidden'];
  booleanAttrs.forEach(attr => {
    // 處理獨立布爾屬性 <input disabled> -> <input disabled={true}>
    const boolRegex = new RegExp(`\\s${attr}(?=[\\s>])`, 'g');
    result = result.replace(boolRegex, ` ${attr === 'readonly' ? 'readOnly' : attr}={true}`);
  });

  return result;
}

// 標籤平衡修復
function fixHtmlTagBalance(content) {
  // 分析文件中的所有 HTML 標籤
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)[^>]*>/g;
  const matches = [...content.matchAll(tagRegex)];
  
  // 跟踪標籤的開閉情況
  const tagStack = [];
  const problems = [];
  
  for (const match of matches) {
    const [fullTag, tagName] = match;
    const isClosing = fullTag.startsWith('</');
    const isSelfClosing = selfClosingTags.includes(tagName.toLowerCase()) || fullTag.endsWith('/>');
    
    if (isClosing) {
      // 檢查是否與最近的開始標籤匹配
      if (tagStack.length > 0 && tagStack[tagStack.length - 1].name === tagName) {
        tagStack.pop(); // 匹配，從堆疊彈出
      } else {
        // 找不到匹配的開始標籤
        problems.push({
          type: 'extra-closing',
          tag: tagName,
          position: match.index
        });
      }
    } else if (!isSelfClosing) {
      // 非自閉合的開始標籤
      tagStack.push({
        name: tagName,
        position: match.index
      });
    }
  }
  
  // 處理未關閉的標籤
  for (const openTag of tagStack) {
    problems.push({
      type: 'unclosed',
      tag: openTag.name,
      position: openTag.position
    });
  }
  
  // 修復文檔
  let fixedContent = content;
  
  // 從後向前處理，避免位置偏移
  problems.sort((a, b) => b.position - a.position);
  
  for (const problem of problems) {
    if (problem.type === 'extra-closing') {
      // 移除多餘的閉合標籤
      const tagToRemove = `</${problem.tag}>`;
      const startPos = problem.position;
      const endPos = startPos + tagToRemove.length;
      fixedContent = fixedContent.substring(0, startPos) + fixedContent.substring(endPos);
    } else if (problem.type === 'unclosed') {
      // 為未關閉的標籤添加閉合標籤
      // 複雜情況可能需要更準確的位置，這裡簡單添加到文檔末尾
      fixedContent += `</${problem.tag}>`;
    }
  }
  
  return fixedContent;
}

// 修復縮進式代碼塊為圍欄式代碼塊
function fixIndentedCodeBlocks(content) {
  const lines = content.split('\n');
  let inCodeBlock = false;
  let codeBlockStart = -1;
  let codeBlockIndent = 0;
  let result = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 檢測縮進式代碼塊 (至少4個空格或1個Tab縮進)
    const indentMatch = line.match(/^(\s+)(\S+)/);
    const isEmptyLine = line.trim() === '';
    
    if (indentMatch && !inCodeBlock && (indentMatch[1].length >= 4 || indentMatch[1].includes('\t'))) {
      // 開始一個新的代碼塊
      inCodeBlock = true;
      codeBlockStart = i;
      codeBlockIndent = indentMatch[1].length;
      
      // 檢查前一行是否為空行，如果不是，先添加一個空行
      if (i > 0 && lines[i - 1].trim() !== '') {
        result.push('');
      }
      
      // 嘗試檢測代碼語言
      let language = detectCodeLanguage(line.substring(codeBlockIndent));
      
      // 添加圍欄式代碼塊開始標記
      result.push('```' + language);
      
      // 添加代碼行，但移除縮進
      result.push(line.substring(codeBlockIndent));
    } else if (inCodeBlock) {
      if ((indentMatch && indentMatch[1].length >= codeBlockIndent) || isEmptyLine) {
        // 繼續代碼塊，移除縮進
        if (isEmptyLine) {
          result.push('');
        } else {
          result.push(line.substring(codeBlockIndent));
        }
      } else {
        // 代碼塊結束
        inCodeBlock = false;
        
        // 添加圍欄式代碼塊結束標記
        result.push('```');
        
        // 添加一個空行
        result.push('');
        
        // 添加當前行
        result.push(line);
      }
    } else {
      // 常規行，直接添加
      result.push(line);
    }
  }
  
  // 如果文件末尾有未閉合的代碼塊，關閉它
  if (inCodeBlock) {
    result.push('```');
  }
  
  // 修復空的代碼塊標記
  let fixedContent = result.join('\n');
  
  // 修復沒有指定語言的代碼塊
  fixedContent = fixedContent.replace(/```\s*\n/g, '```text\n');
  
  // 確保代碼塊前後有空行
  fixedContent = fixedContent.replace(/([^\n])```/g, '$1\n```');
  fixedContent = fixedContent.replace(/```\n([^\n])/g, '```\n\n$1');
  
  return fixedContent;
}

// 嘗試檢測代碼語言
function detectCodeLanguage(firstLine) {
  // 基於首行內容嘗試檢測語言
  const langHints = {
    '<': 'html',
    '<!DOCTYPE': 'html',
    '<html': 'html',
    '<?php': 'php',
    '#include': 'cpp',
    'import ': 'python',
    'function': 'javascript',
    'const ': 'javascript',
    'let ': 'javascript',
    'var ': 'javascript',
    'public class': 'java',
    'class ': 'python',
    'def ': 'python',
    '# ': 'bash',
    '#!/bin/': 'bash',
    '#!/usr/bin/': 'bash',
    'package ': 'go',
    'use strict': 'perl',
    '#pragma': 'cpp',
    'SELECT ': 'sql',
    'CREATE TABLE': 'sql',
    'CREATE ': 'sql',
    'ALTER ': 'sql',
    'DROP ': 'sql',
    'INSERT ': 'sql',
    'UPDATE ': 'sql',
    'DELETE ': 'sql'
  };
  
  for (const [hint, lang] of Object.entries(langHints)) {
    if (firstLine.trim().startsWith(hint)) {
      return lang;
    }
  }
  
  // 如果無法檢測，默認使用 text
  return 'text';
}

// 如果啟用了 lint 功能，檢查文件
async function lintMarkdown(content, filePath) {
  try {
    // 使用 markdownlint-cli2 來檢查
    const { execSync } = require('child_process');
    
    // 創建臨時文件用於檢查
    const tempFilePath = `${filePath}.temp`;
    fs.writeFileSync(tempFilePath, content, 'utf-8');
    
    try {
      // 使用 markdownlint-cli2 檢查臨時文件
      const result = execSync(`npx markdownlint-cli2 "${tempFilePath}"`, { 
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'pipe']
      });
      
      console.log(`${colors.green}✓ 修復後的內容通過了 markdownlint 檢查${colors.reset}`);
      return true;
    } catch (execError) {
      // 如果有錯誤，markdownlint-cli2 會返回非0的退出碼
      console.log(`${colors.yellow}修復後的內容仍有一些問題:${colors.reset}`);
      if (execError.stdout) {
        console.log(execError.stdout.toString());
      }
      if (execError.stderr) {
        console.log(execError.stderr.toString());
      }
      return false;
    } finally {
      // 清理臨時文件
      if (fs.existsSync(tempFilePath)) {
        fs.unlinkSync(tempFilePath);
      }
    }
  } catch (error) {
    console.log(`${colors.yellow}無法執行 markdownlint-cli2 檢查: ${error.message}${colors.reset}`);
    console.log(`確保已安裝 markdownlint-cli2: npm install markdownlint-cli2 --save-dev`);
    return false;
  }
}

// 執行主要邏輯
(async () => {
  console.log(`正在處理檔案: ${targetFilePath}`);
  
  // 修復文件
  const fixedContent = fixMarkdown(originalContent);
  
  // 檢查是否有改變
  const hasChanges = originalContent !== fixedContent;
  
  if (!hasChanges) {
    console.log(`${colors.green}✓ 檔案無需修復${colors.reset}`);
  } else if (writeMode) {
    // 寫入修復後的內容
    fs.writeFileSync(fullPath, fixedContent, 'utf8');
    console.log(`${colors.green}✓ 檔案已修復並保存: ${targetFilePath}${colors.reset}`);
  } else {
    // 顯示差異
    console.log(`${colors.yellow}檔案需要修復，但未寫入（使用 --write 選項來保存修改）${colors.reset}`);
    
    // 可以顯示差異的摘要，但這需要一個更複雜的差異算法
    // 這裡只是簡單地提醒用戶使用 --write 選項
  }
  
  // 如果啟用了 lint 模式，執行 markdownlint 檢查
  if (lintMode) {
    const contentToLint = writeMode ? fixedContent : originalContent;
    await lintMarkdown(contentToLint, targetFilePath);
  }
})().catch(error => {
  console.error(`${colors.red}錯誤: ${error.message}${colors.reset}`);
  process.exit(1);
}); 