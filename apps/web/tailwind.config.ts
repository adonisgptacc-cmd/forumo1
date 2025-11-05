import type { Config } from 'tailwindcss';
import baseConfig from '../../packages/config/tailwind/base.cjs';

export default {
  ...baseConfig,
  content: ['index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2563eb',
          foreground: '#ffffff',
        },
      },
    },
  },
} satisfies Config;
