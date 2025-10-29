/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        background: "#FFFFFF",
        text: "#1F2937",
        card: "#F9FAFB",
        accent: "#22C55E", // green accent for positive stats
      },
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"], // modern readable fonts
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0,0,0,0.05)", // soft shadows for cards
      },
    },
  },
  plugins: [],
};
