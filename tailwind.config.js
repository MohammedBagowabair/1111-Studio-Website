/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F5F3EF',
        ink: '#121212',
        oak: { DEFAULT: '#C89B6D', deep: '#9A7048', light: '#E6D2BA' },
        cobalt: { DEFAULT: '#2D4BEF', dark: '#1F37C4' },
        rule: '#DDD8CF',
      },
      fontFamily: { sans: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}
