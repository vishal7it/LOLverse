/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        purple: {
          50: 'rgb(var(--color-purple-50) / <alpha-value>)',
          100: 'rgb(var(--color-purple-100) / <alpha-value>)',
          200: 'rgb(var(--color-purple-200) / <alpha-value>)',
          300: 'rgb(var(--color-purple-300) / <alpha-value>)',
          400: 'rgb(var(--color-purple-400) / <alpha-value>)',
          500: 'rgb(var(--color-purple-500) / <alpha-value>)',
          600: 'rgb(var(--color-purple-600) / <alpha-value>)',
          700: 'rgb(var(--color-purple-700) / <alpha-value>)',
          800: 'rgb(var(--color-purple-800) / <alpha-value>)',
          900: 'rgb(var(--color-purple-900) / <alpha-value>)',
          950: 'rgb(var(--color-purple-950) / <alpha-value>)',
        },
        gray: {
          750: '#2D3748', // A custom gray shade between 700 and 800
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
      },
    },
  },
  plugins: [],
};