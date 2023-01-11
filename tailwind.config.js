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
        'color-lose': '#EE5350',
        'color-win': '#17E5B4',
        'primary-dark': '#0F1923',
        'primary-dark-variant': '#1A2733',
        'primary-light': '#ECE8E1',
        'secondary-dark': '#FF4655',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
