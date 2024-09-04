/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primaryColor: "#12B24B",
        dark: "#232323",
        muted: "#ACB0AD",
        background: "#f4f4f4",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
