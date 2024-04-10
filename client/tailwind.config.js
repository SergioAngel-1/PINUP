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
        "form": "url('/map-image.png')",
      },
      boxShadow:{
        'forms': '0px 18px 36px 18px rgba(4, 23, 40, 0.75)',
      }
    },
  },
  plugins: [],
};
