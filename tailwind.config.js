/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // Need to give Font size too
  theme: {
    // colors: {
    //   blue: {
    //     light: "#85d7ff",
    //     DEFAULT: "#1fb6ff",
    //     dark: "#009eeb",
    //   },
    //   pink: {
    //     light: "#ff7ce5",
    //     DEFAULT: "#ff49db",
    //     dark: "#ff16d1",
    //   },
    //   gray: {
    //     darkest: "#1f2d3d",
    //     dark: "#3c4858",
    //     DEFAULT: "#c0ccda",
    //     light: "#e0e6ed",
    //     lightest: "#f9fafc",
    //   },
    // },
    extend: {},
  },
  plugins: [],
};
