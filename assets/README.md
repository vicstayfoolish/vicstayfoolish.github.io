# Vic的綠洲 - 資源文件說明

這個目錄包含「Vic的綠洲」網站的所有共享資源，包括樣式表、JavaScript 和其他資源文件。

## 目錄結構

```
assets/
├── css/                # 樣式文件
│   ├── theme.css       # 基本主題定義 (顏色、字體等)
│   ├── components.css  # UI 組件樣式
│   ├── responsive.css  # 響應式布局樣式
│   └── knowledge-page.css  # 知識頁面特定樣式
├── js/                 # JavaScript 文件
│   ├── common.js       # 共用功能
│   └── interactive.js  # 互動功能 (測驗、圖表等)
└── README.md           # 本說明文件
```

## 樣式文件使用指南

在新建頁面時，請按以下順序引入樣式表：

```html
<!-- 外部資源 -->
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">

<!-- 自定義樣式 (根據頁面層級調整路徑) -->
<link rel="stylesheet" href="assets/css/theme.css">
<link rel="stylesheet" href="assets/css/components.css">
<link rel="stylesheet" href="assets/css/responsive.css">

<!-- 針對知識頁面，額外添加 -->
<link rel="stylesheet" href="assets/css/knowledge-page.css">
```

## JavaScript 文件使用指南

在頁面底部引入 JavaScript 文件：

```html
<!-- 自定義腳本 (根據頁面層級調整路徑) -->
<script src="assets/js/common.js"></script>
<script src="assets/js/interactive.js"></script>
```

## 變數列表

所有樣式變數都定義在 `theme.css` 中，方便統一修改和維護網站風格：

### 色彩方案
- `--page-bg`: #FDFCFB (頁面背景)
- `--card-bg`: #FFFFFF (卡片背景)
- `--accent-bg-1`: #F1F8F7 (輔助背景1)
- `--accent-bg-2`: #FFF0E9 (輔助背景2)
- `--primary-accent`: #E57373 (主要強調色)
- `--secondary-accent`: #81C7D4 (次要強調色)
- `--tertiary-accent`: #FFB74D (第三強調色)
- `--main-text`: #37474F (主要文字)
- `--secondary-text`: #546E7A (次要文字)
- `--footer-text`: #CFD8DC (頁尾文字)
- `--footer-link`: #FFB74D (頁尾連結)

### 字體設定
- `--main-font`: 'Noto Sans TC', sans-serif
- `--heading-weight`: 700
- `--subheading-weight`: 500
- `--body-weight`: 400

### 間距與圓角
- `--card-radius`: 12px
- `--button-radius`: 8px
- `--spacing-unit`: 8px 