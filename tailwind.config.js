/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#EBF5FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          400: '#60A5FA',
          500: '#3B5BF6',
          600: '#2141E8',
        },
      },
    },
  },
  plugins: [],
}
