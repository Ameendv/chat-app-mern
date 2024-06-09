/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Adjust this pattern if your frontend files are located elsewhere
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}