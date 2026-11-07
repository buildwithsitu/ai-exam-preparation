import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: 'rgb(var(--color-brand-primary-rgb) / <alpha-value>)',
          hover: 'var(--color-brand-hover)',
          dark: 'var(--color-brand-ink)',
          ink: 'var(--color-brand-ink)',
          light: 'rgb(var(--color-brand-light-rgb) / <alpha-value>)',
          subtle: 'var(--color-brand-subtle)',
        },
        content: {
          primary: 'var(--color-content-primary)',
          secondary: 'var(--color-content-secondary)',
        },
        background: {
          base: 'var(--color-bg-base)',
        },
        surface: {
          card: 'var(--color-surface-card)',
          subtle: 'var(--color-surface-subtle)',
          border: 'var(--color-surface-border)',
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
