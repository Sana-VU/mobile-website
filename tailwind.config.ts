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
      // Container configuration with responsive paddings for premium layout
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

      // Premium font configuration - Inter as primary font with tabular numbers
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...defaultTheme.fontFamily.mono],
      },

      // Font feature settings for better typography
      fontFeatureSettings: {
        numeric: ['"tnum"', '"lnum"'], // Tabular numbers and lining numbers
      },

      // Typography variants for premium app-like feel
      fontWeight: {
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
      },

      // Letter spacing for premium typography
      letterSpacing: {
        tight: "-0.025em",
        normal: "0em",
        wide: "0.025em",
      },

      // Premium color palette with semantic naming
      colors: {
        // Base semantic colors using CSS variables
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        // Card and surface colors for layered interfaces
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Interactive element colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        // Muted colors for secondary content
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },

        // Primary brand color - Blue 600 (#2563EB) with hover Blue 700
        primary: {
          DEFAULT: "hsl(var(--primary))", // #2563EB blue-600
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))", // #1D4ED8 blue-700
        },

        // Secondary brand color - Violet 600 (#7C3AED) for accents/chips
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // #7C3AED violet-600
          foreground: "hsl(var(--secondary-foreground))",
        },

        // Status colors for app-like feedback
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },

        warning: {
          DEFAULT: "hsl(var(--warning))",
          foreground: "hsl(var(--warning-foreground))",
        },

        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },

        // Accent colors for highlights
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },

        // Popover and dropdown colors
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // Direct color access for gradients and special cases
        blue: {
          600: "#2563EB", // Primary
        },
        violet: {
          600: "#7C3AED", // Secondary
        },
        emerald: {
          500: "#10B981", // Success
        },
        amber: {
          500: "#F59E0B", // Warning
        },
        red: {
          500: "#EF4444", // Error
        },

        // Premium text colors
        "text-strong": "#111827", // Gray 900 for strong text
        "text-muted": "#6B7280", // Gray 500 for muted text
      },

      // Premium border radius system - Emphasizing rounded-2xl (24px)
      borderRadius: {
        none: "0px",
        sm: "0.375rem", // 6px - Small elements
        DEFAULT: "0.75rem", // 12px - Inputs, buttons
        md: "1rem", // 16px - Medium elements
        lg: "1.25rem", // 20px - Large elements
        xl: "1.5rem", // 24px - Cards (rounded-2xl equivalent)
        "2xl": "1.5rem", // 24px - Premium default for cards/surfaces
        "3xl": "2rem", // 32px - Hero sections
        full: "9999px", // Pills, avatars
      },

      // Premium shadow system for depth and hierarchy
      boxShadow: {
        // Subtle shadows for cards
        soft: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",

        // Medium shadows for elevated components
        medium:
          "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",

        // Strong shadows for modals and dropdowns
        strong:
          "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",

        // Premium glow effect
        glow: "0 0 0 1px rgb(59 130 246 / 0.1), 0 1px 3px 0 rgb(59 130 246 / 0.1)",

        // Inner shadows for pressed states
        inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
      },

      // Premium animation system
      animation: {
        "fade-in": "fadeIn 300ms ease-out",
        "slide-up": "slideUp 300ms ease-out",
        "slide-down": "slideDown 300ms ease-out",
        "scale-in": "scaleIn 200ms ease-out",
        "bounce-subtle": "bounceSubtle 400ms ease-out",
      },

      // Premium keyframes
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.96)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        bounceSubtle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
      },

      // Premium transition timing
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)", // Premium ease
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)", // Material smooth
      },

      // Safe area spacing for mobile app experience
      spacing: {
        "safe-top": "env(safe-area-inset-top)",
        "safe-bottom": "env(safe-area-inset-bottom)",
        "safe-left": "env(safe-area-inset-left)",
        "safe-right": "env(safe-area-inset-right)",
      },

      // Premium viewport heights
      height: {
        "screen-small": "100svh",
        "screen-large": "100lvh",
        "screen-dynamic": "100dvh",
      },

      // Gradient stops for premium backgrounds
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #2563EB 0%, #7C3AED 100%)",
        "gradient-success": "linear-gradient(135deg, #10B981 0%, #059669 100%)",
        "gradient-warning": "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },

  // Plugins for premium functionality
  plugins: [],
};

export default config;
