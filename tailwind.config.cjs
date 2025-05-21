/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // 新的配色方案
        'page-bg': '#F9F7F5',
        'card-bg': '#FFFFFF',
        'accent-bg-1': '#F1F8F7',
        'accent-bg-2': '#FFF0E9',
        'primary-accent': '#FF6B6B',    // 新的主品牌色（溫暖活力）
        'secondary-accent': '#4F46E5',  // 新的輔助品牌色（科技冷調）
        'tertiary-accent': '#FFB74D',
        'main-text': '#1F2937',         // 更深的文字顏色
        'secondary-text': '#4B5563',    // 更深的次要文字
        'footer-text': '#9CA3AF',
        'footer-link': '#FFB74D',
        'soft-blue': '#E3F2FD',
        'soft-pink': '#FCE4EC',
        'soft-green': '#E8F5E9',
        'soft-yellow': '#FEE2E2',       // 低彩度背景色
        'soft-purple': '#F3E5F5',
        'table-header': '#EEF2F7',
        'table-border': '#E0E7EB',
        'table-stripe': '#F5F9FC',
      },
      fontFamily: {
        // 根據建議更新字體順序
        sans: ['"Poppins"', '"Inter"', '"Noto Sans TC"', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'card': '0 5px 15px rgba(0, 0, 0, 0.03)',
        'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1)', // 懸浮效果陰影
      },
      lineHeight: {
        'relaxed': '1.75',  // 增加行高，提升可讀性
      }
    },
  },
  plugins: [
    (function() { 
      return import('@tailwindcss/forms').then(forms => forms.default({
        strategy: 'class',
      }));
    })(),
  ],
}; 