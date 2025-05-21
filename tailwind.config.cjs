/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
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
      fontSize: {
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        'h1-custom': ['2.5rem', { lineHeight: '2.75rem', fontWeight: '700'}],
        'h2-custom': ['2rem', { lineHeight: '2.25rem', fontWeight: '700'}],
        'h3-custom': ['1.75rem', { lineHeight: '2rem', fontWeight: '600'}],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            color: theme('colors.main-text'),
            a: {
              color: theme('colors.primary-accent'),
              '&:hover': {
                color: theme('colors.secondary-accent'),
              },
            },
            h1: {
              fontSize: theme('fontSize.h1-custom[0]'),
              lineHeight: theme('fontSize.h1-custom[1].lineHeight'),
              fontWeight: theme('fontSize.h1-custom[1].fontWeight'),
              color: theme('colors.main-text'),
              marginBottom: theme('spacing.4'), 
            },
            h2: {
              fontSize: theme('fontSize.h2-custom[0]'),
              lineHeight: theme('fontSize.h2-custom[1].lineHeight'),
              fontWeight: theme('fontSize.h2-custom[1].fontWeight'),
              color: theme('colors.main-text'),
              marginTop: theme('spacing.10'),
              marginBottom: theme('spacing.4'),
            },
            h3: {
              fontSize: theme('fontSize.h3-custom[0]'),
              lineHeight: theme('fontSize.h3-custom[1].lineHeight'),
              fontWeight: theme('fontSize.h3-custom[1].fontWeight'),
              color: theme('colors.main-text'),
              marginTop: theme('spacing.8'),
              marginBottom: theme('spacing.3'),
            },
            p: {
              marginTop: theme('spacing.2'),              
              marginBottom: theme('spacing.6'),
              lineHeight: theme('lineHeight.relaxed'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary-accent'),
              '&:hover': {
                color: theme('colors.sky.400'),
              },
            },
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            p: {
              color: theme('colors.gray.300'),
            }
          },
        },
      }),
      borderRadius: {
        'card': '12px',
        'button': '8px',
      },
      boxShadow: {
        'soft': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'card': '0 5px 15px rgba(0, 0, 0, 0.03)',
        'hover': '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      },
      lineHeight: {
        'relaxed': '1.75',
      }
    },
  },
  plugins: [
    (function() { 
      return import('@tailwindcss/forms').then(forms => forms.default({
        strategy: 'class',
      }));
    })(),
    require('@tailwindcss/typography'),
  ],
}; 