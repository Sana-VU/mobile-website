/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  // Dark mode using class strategy for better control
  darkMode: ["class"],

  // Content paths for Tailwind to scan - including all component locations
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      // Container configuration with responsive paddings
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1.5rem",
          lg: "2rem",
          xl: "2.5rem",
          "2xl": "3rem",
        },
        screens: {
          "2xl": "1400px",
        },
      },

      // Font configuration - Inter as primary font
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
      },

      // Safe area spacing for mobile devices
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },

      // Dynamic viewport heights for better mobile experience
      height: {
        "screen-small": "100svh",
        "screen-large": "100lvh",
        "screen-dynamic": "100dvh",
      },

      // Color system based on Zinc scale with #2563EB primary
      // Using semantic tokens for consistent theming
      colors: {
        // Base colors with zinc scale
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Card and surface colors
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Border and input colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Muted colors for subtle elements
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        // Primary color - #2563EB (Blue 600)
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },

        // Secondary colors
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },

        // Destructive colors for errors
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // Accent colors
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Popover colors
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },

      // Enhanced shadow system with utilities
      boxShadow: {
        // Soft shadows for cards and elevated elements
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "soft-hover":
          "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",

        // Elevated shadows for modals and overlays
        elevated:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",

        // Subtle inner shadow
        inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
      },

      // Border radius scale with rounded-2xl support
      borderRadius: {
        none: "0px",
        sm: "0.25rem", // 4px
        DEFAULT: "0.5rem", // 8px
        md: "0.5rem", // 8px
        lg: "0.75rem", // 12px
        xl: "1rem", // 16px
        "2xl": "1.5rem", // 24px - Featured radius
        "3xl": "2rem", // 32px
        full: "9999px",
      },

      // Enhanced transition utilities
      transitionTimingFunction: {
        "soft-spring": "cubic-bezier(0.22, 1, 0.36, 1)",
        gentle: "cubic-bezier(0.25, 0.8, 0.25, 1)",
      },

      transitionDuration: {
        fast: "150ms",
        normal: "200ms",
        soft: "300ms",
        slow: "500ms",
      },

      // Animation utilities
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },

      // Keyframes for animations
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },

  // Plugins for additional functionality
  plugins: [],
};

export default config;
