/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [ './src/**/*.html', './src/**/*.ts' ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#ffe4e6',
          DEFAULT: '#FF4757',
          dark: '#e03c4a',
        },
        success: {
          DEFAULT: '#10B981',
        },
        surface: {
          light: '#F8FAFC',
          DEFAULT: '#ffffff',
          dark: '#18181B',
        }
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

