/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // Need to give Font size too
  theme: {
    extend: {
      colors: {
        black: {
          DEFAULT: "rgb(0, 0, 0)",
          mode: "rgb(18, 18, 18)",
          light: "rgb(33, 33, 33)",
          lightest: "rgb(66, 66, 66)",
          extralight: "rgb(216, 216, 216)",
          extralightest: "rgb(238, 238, 238)",
        },
        gray: {
          darkest: "rgb(61, 61, 61)",
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
      gridTemplateColumns: {
        "fluid-14": "repeat(auto-fit, minmax(14rem, 1fr))",
        "fluid-14-lg": "repeat(auto-fit, minmax(14rem, 0.33fr))",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      boxShadow: {
        border: "0 0px 6px -1px rgba(0,0,0,0.5)",
      },
      animation: {
        shake: "shake 3s linear infinite",
      },
      keyframes: {
        shake: {
          "10%, 30%, 50%, 70%, 90%": { transform: "rotate(20deg)" },
          "0%, 20%, 40%, 60%, 80%, 100%": { transform: "rotate(-20deg)" },
        },
      },
    },
  },
  plugins: [],
};
