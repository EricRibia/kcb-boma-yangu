/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary_color: "#21343c",
        accent_color: "#7db14f",
      },
      fontFamily: {
        poppins: ["Poppins"],
        dinpro_regular: ["dinpro_regular"],
        dinpro_bold: ["dinpro_bold"],
      },
    },
  },
  plugins: [],
};
