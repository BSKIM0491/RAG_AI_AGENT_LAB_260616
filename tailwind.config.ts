import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
        },
        signal: {
          buy: "#10b981",
          sell: "#ef4444",
          watch: "#f59e0b",
          hold: "#6b7280",
        },
      },
      fontFamily: {
        sans: ["Pretendard", "Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
