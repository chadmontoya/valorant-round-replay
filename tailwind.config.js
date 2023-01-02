/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#0F1923',
        'primary-light': '#ECE8E1',
        'secondary-dark': '#FF4655',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
