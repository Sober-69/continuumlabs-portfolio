/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        neon: { cyan: "#00f0ff", purple: "#8b5cf6", pink: "#ec4899" },
      },
    },
  },
  plugins: [],
};
