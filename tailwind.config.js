/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    fill: {
      black: "#000",
      white: "#fff",
    },
  },
  darkMode: "class",
  plugins: [
    function ({ addVariant }) {
      addVariant("every", "& > *");
    },
    require("@tailwindcss/aspect-ratio"),
  ],
};