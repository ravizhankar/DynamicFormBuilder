/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all .js, .jsx, .ts, and .tsx files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#0090b5", // Custom hex color
        customgrey: "#757575",
        customOrange: "#FFA500",
        customRed: "#FF0000",
      },
      boxShadow: {
        "3xl":
          "0 0px 10px 5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      },
    },
  },
  plugins: [],
};
