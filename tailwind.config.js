/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // 🌾 Ek Mutthi Anaj Theme — Warm, Inviting, Earthy
      colors: {
        primary: "#FF8C00",        // Vibrant orange (logo & key highlights)
        secondary: "#E07B00",      // Deeper orange for hover & contrast
        accent: "#FFD54F",         // Warm yellow accent for highlights
        success: "#43A047",        // Calming green for positive actions
        danger: "#E53935",         // Soft red for errors/deletes
        background: "#FFF8E7",     // Soft beige page background
        surface: "#FFFFFF",        // Clean white for content sections
        card: "#FFFFFF",           // White cards with subtle shadows
        border: "#F0E6D2",         // Warm, subtle beige border
        text: {
          primary: "#3E2723",      // Deep brown for headings
          secondary: "#5D4037",    // Softer brown for paragraphs
          muted: "#8D6E63",        // Muted brown for small details
        },
      },

      // ✍️ Fonts — friendly & approachable
      fontFamily: {
        sans: ["Inter", "Poppins", "system-ui", "sans-serif"],
        heading: ["Poppins", "Inter", "sans-serif"],
        display: ["Poppins", "Inter", "sans-serif"],
      },

      // 💫 Soft shadows (earthy, not harsh)
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.05)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.08)",
        card: "0 6px 18px rgba(0, 0, 0, 0.06)",
      },

      // 🟤 Rounded corners for friendly design
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },

      // 🎞 Smooth transition feel
      transitionTimingFunction: {
        "in-out-soft": "cubic-bezier(0.4, 0, 0.2, 1)",
      },

      // 🌤 Animations (simple fade-in for elements)
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-in-out",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};
