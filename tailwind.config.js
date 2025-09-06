/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#eee3ff",
          600: "#8054c7",
          700: "#5a3696",
        },
        secondary: {
          600: "#63d839",
        },
      },
    },
  },
  plugins: [],
};