/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      colors: {
        black: "#191624",
      },

      textColor: {
        lightGray: "#F1EFEE",
        primary: "#FAFAFA",
        secColor: "#efefef",
        navColor: "#BEBEBE",
      }, 
      backgroundColor: {
        mainColor: "#fefefe",
        secondaryColor: "#F0F0F0",
        blackOverlay: "rgba(0, 0 ,0 ,0.3)",
      },
      boxShadow: {
        glow: "0 0 18px rgb(255, 0, 0, 0.7);",
        glowLight: "0 0 24px rgb(255, 0, 0, 0.5)",
      },
    },
    fontFamily: {
      nunito: ["Nunito", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      robotoCondensed: ["Roboto Condensed", "sans-serif"],
    },
  },
  plugins: [],
};
