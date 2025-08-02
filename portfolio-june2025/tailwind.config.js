const { heroui } = require("@heroui/react");

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {},
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        editorial: ['"Editorial New"', "serif"],
        avenir: ["Avenir", "sans-serif"],
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwind-scrollbar-hide"),
    function ({ addUtilities }) {
      addUtilities({
        ".grainy-bg": {
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='f'><feTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23f)' opacity='0.06' /></svg>")`,
          backgroundRepeat: "repeat",
          backgroundSize: "100px 100px",
        },
      });
    },
  ],
};
