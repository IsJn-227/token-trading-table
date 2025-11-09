import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "#3b82f6", dark: "#2563eb" },
        success: "#10b981",
        danger: "#ef4444",
        warning: "#f59e0b",
      },
      animation: {
        shimmer: "shimmer 2s infinite",
        "price-up": "priceUp 0.6s ease-out",
        "price-down": "priceDown 0.6s ease-out",
        "fade-in": "fadeIn 0.3s ease-in",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        priceUp: {
          "0%": { backgroundColor: "rgba(16, 185, 129, 0.3)" },
          "100%": { backgroundColor: "transparent" },
        },
        priceDown: {
          "0%": { backgroundColor: "rgba(239, 68, 68, 0.3)" },
          "100%": { backgroundColor: "transparent" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
