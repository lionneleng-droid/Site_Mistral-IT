import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone:  "#f7f5f2",
        ink:    "#1a2235",
        slate:  "#3a4a63",
        muted:  "#8492a6",
        sky:    "#3b82f6",
        skylt:  "#eff6ff",
        border: "#e4e8ef",
        accent: "#0ea5e9",
      },
      fontFamily: {
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        outfit:   ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1rem",
        xl3: "1.25rem",
      },
    },
  },
  plugins: [],
};

export default config;
