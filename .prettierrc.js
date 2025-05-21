/** @type {import("prettier").Config} */
export default {
  // 主要格式化選項
  semi: true,             // 使用分號
  singleQuote: false,     // 使用雙引號
  trailingComma: "es5",   // 在 ES5 中有效的結尾逗號（例如物件、陣列等）
  tabWidth: 2,            // 縮進使用 2 個空格
  printWidth: 100,        // 每行最大長度
  bracketSpacing: true,   // 在對象文字中的括號之間打印空格
  bracketSameLine: false, // 將多行 HTML (HTML, JSX, Vue, Angular) 元素的 > 放在最後一行的末尾，而不是單獨一行
  arrowParens: "always",  // 在箭頭函數參數周圍包括括號
  endOfLine: "lf",        // 使用 LF 作為行尾

  // Astro 特定配置
  plugins: ["prettier-plugin-astro"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
    {
      // MDX 格式化配置
      files: ["*.mdx", "*.md"],
      options: {
        // MDX 文件特殊處理
        proseWrap: "preserve",  // 保留 Markdown 文本的換行
      },
    },
  ],
}; 