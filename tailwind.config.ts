import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        'primary-blue': '#3182ce',
        'secondaryBlue': '#022859',
        'custom-border': '#000000', // Add your custom border color
      },
    },
  },
  plugins: [],
} satisfies Config;
