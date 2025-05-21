#!/usr/bin/env node

/**
 * Markdown 語法檢查工具
 * 
 * 此腳本用於檢查 Markdown 文件中的語法問題，使用 markdownlint 工具
 * 檢查後會報告所有發現的問題，可用於確定 Markdown 檔案是否符合規範
 * 
 * 用法：node validate-markdown.js [檔案路徑] [--verbose]
 * --verbose: 顯示詳細錯誤信息
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const execAsync = promisify(require('child_process').exec);
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

// 檢查是否安裝了 markdownlint 依賴
async function checkMarkdownlintInstallation() {
  try {
    // 檢查當前目錄的 node_modules 中是否有 markdownlint
    if (fs.existsSync(path.join(process.cwd(), 'node_modules', 'markdownlint'))) {
      return true;
    }

    // 另一種檢查方式 - 使用 npm 命令
    await execAsync('npm list markdownlint');
    return true;
  } catch (error) {
    console.error(`${colors.red}錯誤：未找到 markdownlint 套件。${colors.reset}`);
    console.error(`請運行命令: ${colors.cyan}npm install markdownlint --save-dev${colors.reset} 安裝依賴。`);
    return false;
  }
}

// 處理命令行參數
const args = process.argv.slice(2);
const verboseMode = args.includes('--verbose');
let targetFilePath = null;

for (const arg of args) {
  if (!arg.startsWith('--') && arg.endsWith('.md')) {
    targetFilePath = arg;
    break;
  }
}

if (!targetFilePath) {
  console.error(`${colors.red}錯誤：請指定一個 Markdown 檔案路徑${colors.reset}`);
  console.error(`用法：node validate-markdown.js [檔案路徑] [--verbose]`);
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

// 主要功能：使用 markdownlint 驗證 Markdown 文件
async function validateMarkdownFile() {
  // 檢查依賴是否安裝
  const dependencyInstalled = await checkMarkdownlintInstallation();
  if (!dependencyInstalled) {
    process.exit(1);
  }

  console.log(`${colors.cyan}正在檢查檔案: ${targetFilePath}${colors.reset}`);
  
  try {
    // 動態引入 markdownlint
    const markdownlint = require('markdownlint');
    
    // 設定 markdownlint 配置
    const options = {
      files: [fullPath],
      config: {
        "default": true,
        "line-length": false, // 不檢查行長度
        "no-inline-html": false, // 允許內嵌 HTML
      }
    };
    
    // 執行檢查
    const result = markdownlint.sync(options);
    const resultString = result.toString();
    
    // 判斷是否有錯誤
    if (resultString.trim() === '') {
      console.log(`${colors.green}✓ 檔案通過所有檢查: ${targetFilePath}${colors.reset}`);
      return true;
    } else {
      console.error(`${colors.red}檔案存在以下問題:${colors.reset}`);
      
      if (verboseMode) {
        console.error(resultString);
      } else {
        // 簡化輸出，只顯示問題數量
        const issues = resultString.split('\n').filter(line => line.trim() !== '');
        console.error(`${colors.yellow}發現 ${issues.length} 個問題。使用 --verbose 參數查看詳細信息。${colors.reset}`);
      }
      
      return false;
    }
  } catch (error) {
    console.error(`${colors.red}檢查過程中發生錯誤: ${error.message}${colors.reset}`);
    if (verboseMode) {
      console.error(error);
    }
    return false;
  }
}

// 執行驗證
validateMarkdownFile().then(success => {
  process.exit(success ? 0 : 1);
}).catch(error => {
  console.error(`${colors.red}未預期的錯誤: ${error.message}${colors.reset}`);
  process.exit(1);
}); 