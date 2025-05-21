/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // 原網站色彩方案轉換為TailwindCSS主題
        'page-bg': '#FDFCFB',
        'card-bg': '#FFFFFF',
        'accent-bg-1': '#F1F8F7',
        'accent-bg-2': '#FFF0E9',
        'primary-accent': '#E57373',
        'secondary-accent': '#81C7D4',
        'tertiary-accent': '#FFB74D',
        'main-text': '#37474F',
        'secondary-text': '#546E7A',
        'footer-text': '#CFD8DC',
        'footer-link': '#FFB74D',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
    },
  },
  plugins: [],
}; 