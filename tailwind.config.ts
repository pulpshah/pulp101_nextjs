import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import typography from "@tailwindcss/typography";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./app/**/*.{ts,tsx,mdx}",
    "./src/**/*.{ts,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1300px",
      },
    },
    extend: {
      colors: {
        textColor: "hsl(var(--text-color))",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        code: ["var(--font-geist-mono)"],
        regular: ["var(--font-geist-sans)"],
        RG: ['Roc Grotesk', 'sans-serif'],
        inter: ['Inter'],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "infinite-scroll": {
          to: { transform: "translateX(calc(-100% - 0.1rem))" },
        },
        typing: {
          "0%": { width: "0ch" },
          "100%": { width: "18ch" },
        },
        cursor: {
          "0%, 100%": { borderColor: "transparent" },
          "50%": { borderColor: "black" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "infinite-scroll": "infinite-scroll 20s linear infinite",
        typing: "typing 2s forwards",
        cursor: "cursor 0.4s step-end infinite alternate",
      },
    },
  },
  plugins: [
    typography,
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".mask-image-fade-x": {
          WebkitMaskImage:
            "linear-gradient(to left, rgba(208, 27, 27, 0) 0%, rgb(234, 42, 42) 128px, rgb(168, 36, 36) calc(100% - 128px), rgba(255, 255, 0, 0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(172, 66, 66, 0) 0%, rgb(202, 39, 39) 48px, rgb(227, 47, 47) calc(100% - 128px), rgba(0, 0, 0, 0) 100%)",
        },
      });
    },
  ],
} satisfies Config;

export default config;
