/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'Lato': ["Lato", "sans-serif"],
      'Mont': ["Montserrat", "sans-serif"],
      'MPlus': ["M PLUS Rounded 1c", "sans-serif"]
    },
  },
  plugins: [],
}

