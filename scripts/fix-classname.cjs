#!/usr/bin/env node

// 此腳本用於將 markdown 檔案中的 className 屬性替換為標準 HTML 的 class 屬性
// 使用方法: node scripts/fix-classname.js <輸入檔案路徑>

const fs = require('fs');
const path = require('path');

// 獲取命令行參數
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error('請提供文件路徑！');
  console.error('使用方法: node scripts/fix-classname.js <輸入檔案路徑>');
  process.exit(1);
}

const filePath = args[0];

// 檢查文件是否存在
if (!fs.existsSync(filePath)) {
  console.error(`文件 ${filePath} 不存在！`);
  process.exit(1);
}

try {
  // 讀取文件內容
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 替換 className 為 class
  const originalContent = content;
  content = content.replace(/className=/g, 'class=');
  
  // 檢查是否有修改
  const changes = content !== originalContent;
  
  if (changes) {
    // 將修改後的內容寫回文件
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`成功將 ${filePath} 中的 className 替換為 class！`);
  } else {
    console.log(`${filePath} 中未發現 className 屬性，無需修改。`);
  }
  
} catch (error) {
  console.error(`處理文件時出錯：${error.message}`);
  process.exit(1);
} 