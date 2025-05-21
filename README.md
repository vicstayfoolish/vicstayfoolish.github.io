# Vic的知識綠洲 - 知識大補帖平台

一個使用 Astro 和 Tailwind CSS 建立的個人知識管理網站，部署於 GitHub Pages。

## 🚀 專案特色

- 使用 Astro 作為靜態網站生成器
- 整合 Tailwind CSS 實現現代化設計
- 支援 Markdown 內容管理
- 響應式設計，支援各種裝置
- 優化的載入速度和 SEO

## 🛠️ 技術棧

- [Astro](https://astro.build/) - 現代化靜態網站生成器
- [Tailwind CSS](https://tailwindcss.com/) - 實用優先的 CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - JavaScript 的超集
- [Chart.js](https://www.chartjs.org/) - 資料視覺化
- [Font Awesome](https://fontawesome.com/) - 圖示庫

## 📦 安裝

1. 克隆專案
```bash
git clone https://github.com/yourusername/vic-oasis-astro.git
cd vic-oasis-astro
```

2. 安裝依賴
```bash
npm install
```

3. 啟動開發伺服器
```bash
npm run dev
```

## 🏗️ 專案結構

```
vic-oasis-astro/
├── src/
│   ├── components/     # Astro 組件
│   ├── content/        # Markdown 內容
│   ├── layouts/        # 頁面佈局
│   ├── pages/          # 路由頁面
│   └── styles/         # 全域樣式
├── public/            # 靜態資源
├── astro.config.mjs   # Astro 配置
├── tailwind.config.cjs # Tailwind 配置
└── package.json       # 專案依賴
```

## 📝 內容管理

內容使用 Markdown 格式撰寫，存放在 `src/content` 目錄下，按主題分類：

- `psychology/` - 心理學相關文章
- `health/` - 健康相關文章
- `pets/` - 寵物相關文章
- `technology/` - 科技相關文章

## 🚀 部署

本專案使用 GitHub Pages 進行部署。每次推送到 `main` 分支時，GitHub Actions 會自動建置並部署網站。

## 🎨 設計規範

- 使用 Tailwind CSS 的工具類進行樣式設計
- 遵循移動優先的響應式設計原則
- 保持一致的視覺風格和用戶體驗

## 📚 開發指南

1. **新增內容**
   - 在 `src/content` 下創建對應分類的 Markdown 文件
   - 使用 Frontmatter 定義文章元數據

2. **開發組件**
   - 在 `src/components` 下創建可重用的 Astro 組件
   - 使用 TypeScript 增強型別安全性

3. **樣式開發**
   - 優先使用 Tailwind CSS 類別
   - 必要時在 `src/styles` 下添加自定義樣式

## 🤝 貢獻

歡迎提交 Pull Request 或開 Issue 來改進專案。

## 📄 授權

MIT License

```sh
npm create astro@latest -- --template minimal
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/minimal)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/minimal)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/minimal/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
