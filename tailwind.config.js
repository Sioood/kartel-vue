/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // Need to give Font size too
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "rgb(0, 0, 0)",
          mode: "rgb(18, 18, 18)",
        },
        gray: {
          darkest: "rgb(51, 51, 51)",
          dark: "rgb(74, 74, 74)",
          DEFAULT: "rgb(128, 128, 128)",
          light: "rgb(155, 155, 155)",
          lightest: "rgb(191, 191, 191)",
          extralight: "rgb(216, 216, 216)",
          extralightest: "rgb(238, 238, 238)",
        },
        blue: {
          DEFAULT: "rgb(51, 122, 183)",
        },
        green: {
          DEFAULT: "rgb(184, 233, 134)",
        },
        orange: {
          DEFAULT: "rgb(255, 165, 0)",
        },
        red: {
          DEFAULT: "rgb(220, 65, 84)",
        },
      },
      boxShadow: {
        border: "0 0px 6px -1px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
