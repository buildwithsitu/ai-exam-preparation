import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#5B3CE8',
          hover: '#4A2ED6',
          dark: '#120E2C',
          light: '#EDE9FE',
          subtle: '#F3F0FF',
        },
        surface: {
          card: '#FFFFFF',
          subtle: '#F8F9FA',
          border: '#E2E8F0',
        }
      },
      borderRadius: {
        pill: '9999px',
        card: '16px',
      }
    },
  },
  plugins: [],
} satisfies Config;
