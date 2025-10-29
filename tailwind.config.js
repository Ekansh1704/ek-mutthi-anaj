/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",      // Blue-500 (main accent)
        background: "#FFFFFF",   // White background
        text: "#1F2937",         // Gray-800 text
        card: "#F9FAFB",         // Light card background
      },
    },
  },
  plugins: [],
};
