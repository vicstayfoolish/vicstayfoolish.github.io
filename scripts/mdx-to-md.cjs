#!/usr/bin/env node

/**
 * MDX 到 Markdown 轉換工具
 * 
 * 此腳本用於將 MDX 檔案轉換為純 Markdown 檔案 (.md)。
 * 除了更改副檔名外，不會修改檔案內容。
 * 
 * 用法：node scripts/mdx-to-md.cjs [輸入的MDX檔案] [輸出的MD檔案]
 * 或者：node scripts/mdx-to-md.cjs --all (轉換所有 MDX 檔案)
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
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

/**
 * 主函數：執行 MDX 到 MD 的轉換
 */
function main() {
  console.log(`${colors.bright}${colors.cyan}===== MDX 到 Markdown 轉換工具 =====${colors.reset}`);
  
  // 獲取命令行參數
  const args = process.argv.slice(2);
  
  // 處理 --all 選項
  if (args.includes('--all')) {
    convertAllMdxFiles();
    return;
  }
  
  // 處理特定檔案
  if (args.length > 0) {
    const inputFile = args[0];
    const outputFile = args[1] || inputFile.replace(/\.mdx$/, '.md');
    
    if (inputFile.endsWith('.mdx')) {
      convertMdxToMd(inputFile, outputFile);
    } else {
      console.error(`${colors.red}錯誤：請指定一個 .mdx 檔案${colors.reset}`);
    }
    return;
  }
  
  // 如果沒有提供參數，顯示使用說明
  console.log(`${colors.bright}使用說明：${colors.reset}`);
  console.log(`  node scripts/mdx-to-md.cjs [輸入的MDX檔案] [輸出的MD檔案]`);
  console.log(`  node scripts/mdx-to-md.cjs --all (轉換所有 MDX 檔案)`);
}

/**
 * 轉換單個 MDX 檔案為 MD 檔案
 * @param {string} inputFile - 輸入的 MDX 檔案路徑
 * @param {string} outputFile - 輸出的 MD 檔案路徑
 */
function convertMdxToMd(inputFile, outputFile) {
  try {
    // 讀取檔案內容
    const content = fs.readFileSync(inputFile, 'utf8');
    
    // 在檔案頂部加入一個註解，說明這是從 MDX 轉換而來
    const convertedContent = content.trim();
    
    // 寫入輸出檔案
    fs.writeFileSync(outputFile, convertedContent, 'utf8');
    
    console.log(`${colors.green}成功：${colors.reset}${inputFile} -> ${outputFile}`);
    
    // 如果輸出檔案與輸入檔案不同，詢問是否要刪除原始 MDX 檔案
    if (inputFile !== outputFile) {
      // 預設不刪除原始檔案，只提示如果需要您可能想手動刪除
      console.log(`${colors.yellow}提示：${colors.reset}您可能想刪除原始的 MDX 檔案：${inputFile}`);
    }
  } catch (error) {
    console.error(`${colors.red}錯誤：${colors.reset}轉換 ${inputFile} 失敗。`, error.message);
  }
}

/**
 * 轉換所有找到的 MDX 檔案
 */
function convertAllMdxFiles() {
  try {
    // 使用 find 命令找出所有 MDX 檔案
    const cmd = 'find src -name "*.mdx"';
    const output = execSync(cmd, { encoding: 'utf8' }).trim();
    
    if (!output) {
      console.log(`${colors.yellow}注意：${colors.reset}未找到任何 MDX 檔案。`);
      return;
    }
    
    const files = output.split('\n');
    console.log(`${colors.cyan}找到 ${files.length} 個 MDX 檔案。${colors.reset}`);
    
    let successCount = 0;
    
    for (const file of files) {
      const outputFile = file.replace(/\.mdx$/, '.md');
      convertMdxToMd(file, outputFile);
      successCount++;
    }
    
    console.log(`${colors.green}轉換完成：${colors.reset}成功轉換 ${successCount}/${files.length} 個檔案。`);
    console.log(`${colors.yellow}提示：${colors.reset}您可能想手動檢查轉換後的 .md 檔案，確認內容正確。`);
  } catch (error) {
    console.error(`${colors.red}錯誤：${colors.reset}尋找或處理 MDX 檔案時發生錯誤。`, error.message);
  }
}

// 執行主函數
main(); 