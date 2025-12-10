/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          primary: "#2563EB",   // blue-600
          secondary: "#F59E0B", // amber-500
          success: "#F59E0B",
          error: "#EF4444",
          text: "#111827",
          bg: "#f9fafb",
          surface: "#ffffff",
        }
      },
      boxShadow: {
        soft: "0 8px 24px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl: "14px"
      },
      transitionTimingFunction: {
        gentle: "cubic-bezier(.2,.8,.2,1)"
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(249,250,251,1) 100%)"
      }
    }
  },
  plugins: []
};
