module.exports = {
  env: {
    node: true,
    es2022: true,
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:astro/recommended", // Astro 推薦規則
    "plugin:jsx-a11y/recommended", // JSX 無障礙
    "plugin:mdx/recommended", // MDX 推薦規則
    "prettier", // 放在最後，以覆蓋格式相關規則
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  // 針對不同檔案類型的特殊設定
  overrides: [
    {
      files: ["*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        // Astro 特定規則可在這裡添加
      },
    },
    {
      files: ['*.mdx', '*.md'],
      extends: ['plugin:mdx/recommended'],
      rules: {
        // 將不存在的規則移除
        "react/jsx-no-undef": "off", // 放寬對未定義組件的檢查
        "react/react-in-jsx-scope": "off", // MDX 不需要導入 React
        "jsx-a11y/label-has-associated-control": "off", // 停用MDX中標籤關聯檢查，因為MDX中的HTML和Markdown混合可能導致誤報
      }
    },
    {
      // JavaScript/TypeScript 文件的設定
      files: ["*.js", "*.mjs", "*.cjs", "*.ts", "*.mts", "*.cts"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
      ],
      rules: {
        "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
      }
    }
  ],
  settings: {
    'mdx/code-blocks': true, // 啟用對 MDX 內程式碼區塊的檢查
    'jsx': {
      'runtime': 'automatic', // 使用 React 17+ 的 JSX 轉換
    }
  },
  // 全域規則
  rules: {
    // 這些規則會應用到所有文件
    "no-unused-vars": "warn",
    "no-undef": "error",
  }
}; 