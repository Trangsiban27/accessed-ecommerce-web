/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        subTitle: "#b9b7b8",
        like: "#f9669a",
      },
      keyframes: {
        slideInRight: {
          "0%": { transform: "translateX(60%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" },
        },
      },
      animation: {
        slideInRight: "slideInRight 0.2s ease-out",
        slideOut: "slideOut 0.5s ease-in",
      },
    },
  },
  plugins: [],
};
