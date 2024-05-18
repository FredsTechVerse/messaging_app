import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      primary: ["Lexend Deca", "sans-serif"],
    },
    screens: {
      phone: "300px",
      tablet: "568px",
      laptop: "1024px",
      "2xl": "1400px",
    },
    extend: {
      colors: {
        card: "#F1F1F1",
        primary: "#1E293B",
        secondary: "#C08261",
        tertiary: "#E2C799",
        cream: "#F2ECBE",
      },
    },
  },
  plugins: [],
};
export default config;
