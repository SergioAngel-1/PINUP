/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF00FF",
        secondary: "#3DDEED",
        third: "#7C00EE",
        fourth: "#041728",
        text: "#727576",
        title: "#f8fafc",
      },
      fontFamily: {
        "roboto-slab": ["Roboto Slab", "sans-serif"],
      },
      backgroundImage: {
        form: "url('/map-image.png')",
      },
      boxShadow: {
        forms: "0px 18px 36px 18px rgba(4, 23, 40, 0.75)",
        panel: "4px 2px 8px 0px rgba(124,0,238,1)",
        innerBtns: "inset 0 0 5px rgba(2, 15, 26)",
      },
    },
  },
  plugins: [],
};
