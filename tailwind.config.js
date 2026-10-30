/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        protech: {
          dark: '#0B0B0E',
          card: '#15151A',
          cardHover: '#1B1B22',
          border: '#23232C',
          muted: '#8E8E9B',
          accent: '#D4F636',       // Amarelo neon da referência
          accentHover: '#BCE024',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
