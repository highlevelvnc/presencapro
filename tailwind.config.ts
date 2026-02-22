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
        orange: {
          DEFAULT: "#FF6B00",
          light: "#FF8533",
          dark: "#CC5500",
        },
        ice: "#F5F5F5",
        surface: {
          DEFAULT: "#1A1A1A",
          2: "#242424",
          3: "#2E2E2E",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        "glow-sm": "0 0 15px rgba(255,107,0,0.2)",
        "glow-md": "0 0 30px rgba(255,107,0,0.3)",
        "glow-lg": "0 0 60px rgba(255,107,0,0.4)",
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        card: "0 4px 24px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
