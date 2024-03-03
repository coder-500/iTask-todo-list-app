/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'color_1': '#fbf0e2',
        'color_2': '#efca9f',
        'color_3': '#fa9744',
        'color_4': '#afbbd0',
        'color_5': '#e45730',
        'color_6': '#443b31',
        'color_7': '#3bbadf',
        'color_8': '#5d67b1',

      },
      screens: {
        'md-special': '850px',
        'sm-special': '295px',
      }
    },
  },
  plugins: [],
}