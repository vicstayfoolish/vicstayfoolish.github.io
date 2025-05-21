#!/usr/bin/env node

/**
 * Markdown 文件檢查工具
 * 使用方法: node scripts/check-markdown.js <檔案路徑>
 * 例如: node scripts/check-markdown.js docs/pets/postpartum-cat-kitten-emergency-care-guide.md
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

// 顏色格式化
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

// 檢查命令行參數
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(`${colors.red}${colors.bold}錯誤: 請提供要檢查的Markdown文件路徑${colors.reset}`);
  console.log(`用法: node scripts/check-markdown.js <檔案路徑>`);
  process.exit(1);
}

const filePath = args[0];

// 檢查文件是否存在
if (!fs.existsSync(filePath)) {
  console.error(`${colors.red}${colors.bold}錯誤: 文件 "${filePath}" 不存在${colors.reset}`);
  process.exit(1);
}

// 檢查是否為Markdown文件
const fileExt = path.extname(filePath).toLowerCase();
if (fileExt !== '.md' && fileExt !== '.mdx') {
  console.error(`${colors.yellow}警告: "${filePath}" 不是標準的Markdown文件(.md或.mdx)，但仍將嘗試檢查${colors.reset}`);
}

console.log(`${colors.blue}${colors.bold}開始檢查Markdown文件: ${filePath}${colors.reset}\n`);

// 執行檢查
try {
  // 使用markdownlint-cli2檢查
  console.log(`${colors.cyan}=== markdownlint-cli2 檢查結果 ===${colors.reset}`);
  try {
    const markdownlintOutput = execSync(`markdownlint-cli2 "${filePath}"`, { encoding: 'utf8' });
    console.log(markdownlintOutput);
    console.log(`${colors.green}✓ markdownlint-cli2 檢查通過，沒有發現問題${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}✗ markdownlint-cli2 檢查失敗:${colors.reset}`);
    console.error(error.stdout ? error.stdout : error.message);
  }
  
  console.log('');

  // 使用remark-lint檢查
  console.log(`${colors.cyan}=== remark-lint 檢查結果 ===${colors.reset}`);
  try {
    const remarkOutput = execSync(`npx remark "${filePath}" --use preset-lint-recommended --quiet`, { encoding: 'utf8' });
    console.log(remarkOutput || `${colors.green}✓ remark-lint 檢查通過，沒有發現問題${colors.reset}`);
  } catch (error) {
    console.error(`${colors.red}✗ remark-lint 檢查失敗:${colors.reset}`);
    console.error(error.stderr ? error.stderr : error.message);
  }

  // 檢查文件內容格式
  console.log('');
  console.log(`${colors.cyan}=== 文件內容分析 ===${colors.reset}`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  
  // 檢查前段matter格式
  const frontMatterMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
  if (frontMatterMatch) {
    console.log(`${colors.green}✓ 已檢測到正確的Front Matter格式${colors.reset}`);
    
    // 檢查Front Matter的必要字段
    const frontMatter = frontMatterMatch[1];
    const requiredFields = ['title', 'description', 'pubDate', 'category', 'tag', 'icon'];
    const missingFields = [];
    
    for (const field of requiredFields) {
      if (!frontMatter.includes(`${field}:`)) {
        missingFields.push(field);
      }
    }
    
    if (missingFields.length > 0) {
      console.log(`${colors.yellow}⚠ Front Matter中缺少以下必要字段: ${missingFields.join(', ')}${colors.reset}`);
    } else {
      console.log(`${colors.green}✓ Front Matter包含所有必要字段${colors.reset}`);
    }
  } else {
    console.log(`${colors.red}✗ 未檢測到正確的Front Matter格式${colors.reset}`);
  }
  
  // 檢查引用的URL
  const bareUrls = fileContent.match(/(?<![`"\(])https?:\/\/\S+/g);
  if (bareUrls && bareUrls.length > 0) {
    console.log(`${colors.yellow}⚠ 檢測到${bareUrls.length}個裸露URL，建議使用Markdown鏈接語法:[文字](URL)${colors.reset}`);
  }
  
  // 檢查標題層級
  const headingLevels = fileContent.match(/^#{1,6}\s+.+$/gm);
  if (headingLevels) {
    const h1Count = headingLevels.filter(h => h.startsWith('# ')).length;
    if (h1Count > 1) {
      console.log(`${colors.yellow}⚠ 檢測到${h1Count}個一級標題(H1)，建議每個文檔只使用一個H1${colors.reset}`);
    }
  }
  
  // 檢查標記符號后空格
  const listItems = fileContent.match(/^[ \t]*[-*+]\s+/gm);
  if (listItems) {
    const badSpacing = listItems.filter(li => !li.match(/[-*+]\s{1}\S/));
    if (badSpacing.length > 0) {
      console.log(`${colors.yellow}⚠ 檢測到${badSpacing.length}個列表項標記後空格數量不正確，應該只有一個空格${colors.reset}`);
    }
  }
  
  // 檢查HTML標籤
  const htmlTags = fileContent.match(/<[^>]+>/g);
  if (htmlTags && htmlTags.length > 0) {
    console.log(`${colors.blue}ℹ 檢測到${htmlTags.length}個HTML標籤。如果使用MDX格式，這是正常的。${colors.reset}`);
  }

  console.log('');
  console.log(`${colors.blue}${colors.bold}檢查完成!${colors.reset}`);

} catch (error) {
  console.error(`${colors.red}執行檢查過程中出現錯誤:${colors.reset}`);
  console.error(error.message);
  process.exit(1);
} 