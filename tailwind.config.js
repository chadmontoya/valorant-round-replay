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
        'primary-dark': '#0E1822',
        'primary-dark-variant': '#1A2733',
        'primary-light': '#ECE8E1',
        'secondary-dark': '#FD4654',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
};
