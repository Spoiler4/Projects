import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#050816",
          card: "#0B1120",
          border: "#1E293B",
          muted: "#64748B",
        },
        light: {
          bg: "#FFFFFF",
          card: "#F8FAFC",
          border: "#E2E8F0",
          muted: "#475569",
        },
        accent: {
          cyan: "#00F5FF",
          indigo: "#6366F1",
          purple: "#7C3AED",
          blue: "#06B6D4",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
        mono: ["Space Grotesk", "monospace"],
        display: ["Clash Display", "sans-serif"],
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
export default config;