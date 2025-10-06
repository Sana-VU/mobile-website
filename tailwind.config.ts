import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./styles/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["Sora", "var(--font-sora)", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          DEFAULT: "#6366f1",
          start: "#6366f1",
          end: "#7c3aed"
        }
      },
      borderRadius: {
        "2xl": "1.5rem"
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(15, 23, 42, 0.3)"
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(135deg, #6366f1 0%, #7c3aed 100%)"
      }
    }
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("hocus", ["&:hover", "&:focus"]);
    })
  ]
};

export default config;
