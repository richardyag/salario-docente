/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 900: '#0f172a', 800: '#1e3a5f', 700: '#1d4ed8' }
      }
    }
  },
  plugins: []
}
