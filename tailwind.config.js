/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  content: [],
  theme: {
    extend: {
      backgroundColor: {
        "light-gray": "rgb(42, 42, 42)",
      },

      borderColor: {
        "custom-gray": "#888888", // Add your custom gray color code here
      },
      textColor: {
        "custom-gray": "#888888", // Add your custom gray color code here
      },
    },
  },
  plugins: [],
};
