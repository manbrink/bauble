/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      white: {
        lighter: "#E5E7EB",
        normal: "#d1d5db",
        bright: "#ffffff",
      },
      black: "#000",
      gray: {
        medium: "#9CA3AF",
        dark: "#111827",
      },
      zinc: {
        dark: "#18181B",
      },
      neutral: {
        medium: "#525252",
        dark: "#262626",
        darkest: "#0A0A0A",
      },
      red: "#DC2626",
      green: "#16A34A",
    },
  },
  plugins: [],
};
