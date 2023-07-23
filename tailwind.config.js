/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F6FF',
          100: '#B3E0FF',
          200: '#80C9FF',
          300: '#4DA3E6',
          400: '#2699FF',
          500: '#0077B5',
          600: '#0066A2',
          700: '#005999',
          800: '#004D80',
          900: '#003A66'
        },
        secondary: {
          50: '#E6F8FF',
          100: '#B3ECFF',
          200: '#80D6FF',
          300: '#4DB0E6',
          400: '#2698FF',
          500: '#00A0DC',
          600: '#008BBA',
          700: '#0076A2',
          800: '#00648D',
          900: '#004C72'
        },
        accent: {
          50: '#F4F6F9',
          100: '#E9EBEE',
          200: '#D4D8DE',
          300: '#BFC5CE',
          400: '#A9AFBD',
          500: '#939BAE',
          600: '#81899B',
          700: '#6C7488',
          800: '#586072',
          900: '#414954'
        }
      }
    }
  },
  plugins: []
}
