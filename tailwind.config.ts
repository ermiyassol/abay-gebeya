import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)']
      },
      colors: {
        primary: "#139d4b",
        secondary: "#2661a5",
        teritary: "#f86407",
        muted: "#74878b",
        accent: "#32cd8e",
        popover: "#d1dbd0",
      },
      keyframes: {
        "fade": {
          '0%': { opacity: "0" },
          '100%': { opacity: "1" },
        },

        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "spinner": {
          '0%': { opacity: '0', transform: 'scale(0) translateX(-300%)' },
          '50%': { opacity: '1', transform: 'scale(1.25) translateX(0)' },
          '100%': { opacity: '0', transform: 'scale(0) translateX(300%)' },
        },
      },
      animation: {
        fade: 'fade 1s ease-in forwards',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spinner": 'spinner 1s infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
