import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'darkest-blue': '#08396F',
        'dark-blue': '#0255B0',
        'regular-blue': '#0079FF',
        'light-blue': '#E1EFFE',
        'error-red': '#F34B4B',
        'lightest-gray': '#FAFAFA',
        'regular-gray': '#D9D9D9',
        'dark-gray': '#737373',
        'darkest-gray': '#333333',
      },

      fontFamily: {
        Instrument: ['Outfit', 'sans-serif'],
      },
      fontSize: {
        title: ['32px', { fontWeight: '700' }],
        titleSmall: ['24px', { fontWeight: '700' }],
      },
      borderColor: {
        'input-border': '#D9D9D9',
        'focus-border': '#0079FF',
        'error-border': '#F34B4B',
      },
      boxShadow: {
        'custom-blue': '0px 0px 32px 0px rgba(0, 121, 255, 0.25)',
        'custom-gray': '0px 0px 32px 0px rgba(0, 0, 0, 0.10)',
      },
      transitionProperty: {
        fill: 'fill',
      },
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 2.5s linear infinite',
      },
      screens: {
        btab: '700x',
      },
    },
  },
  plugins: [],
};
export default config;
