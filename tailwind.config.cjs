/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-blue": "hsl(209, 23%, 22%)",
        "dark-dark-blue": "hsl(207, 26%, 17%)",
        "light-dark-blue": "hsl(200, 15%, 8%)",
        "dark-gray": "hsl(0, 0%, 52%)",
        "very-light-gray": "hsl(0, 0%, 98%)",
        white: "hsl(0, 0%, 100%)",
      },
      fontFamily: {
        NunitoSans: ["Nunito Sans", "sans-serif"],
      },
    },
    screens: {
      sm: "375px",
      md: "770px",
      lg: "1440px",
    },
  },
  plugins: [],
};
