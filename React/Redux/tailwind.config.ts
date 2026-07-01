import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#72470a",
        "primary-hover": "#BDA88B",

        secondary: "#8A735A",

        background: "#F8F5F0",
        surface: "#FFFFFF",

        border: "#E8DED0",

        text: "#2F2A25",
        muted: "#6B7280",

        danger: "#B65E4A",
        success: "#6B8E6B",

        warning: "#C99A2E",
        "warning-bg": "#F6E7C8",
      },
    },
  },
  plugins: [],
} satisfies Config;