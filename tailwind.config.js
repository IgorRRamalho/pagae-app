/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          blue: '#4A90E2',
          green: '#6ECCAF',
        },
        secondary: {
          orange: '#FF6B6B',
          purple: '#9B5DE5',
        },
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif']
      }
    },
  },
  plugins: [],
};