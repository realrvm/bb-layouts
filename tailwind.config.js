/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {},
      container: {
        center: true,
        padding: { DEFAULT: "1.75rem", md: "1.25rem" },
      },
      screens: {
        tablet: "900px",
        desktop: "1200px",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
      },
    },
    fontFamily: {
      inter: "var(--font-family)",
    },
    colors: {
      "common-black": "var(--color-common-black)",
      "common-white": "var(--color-common-white)",
      "common-brand": "var(--color-common-brand)",
      "bg-gray": "var(--color-bg-gray)",
      "bg-light-gray": "var(--color-bg-light-gray)",
      "bg-warn": "var(--color-bg-warn)",
      "text-gray": "var(--color-text-gray)",
      "text-dark": "var(--color-text-dark)",
      "brand-primary": "var(--color-common-brand)",
      "brand-secondary": "var(--color-brand-secondary)",
      "brand-hover": "var(--color-brand-hover)",
      "brand-light": "var(--color-brand-light)",
      "border-icon-black": "var(--color-border-icon-black)",
      "border-gray": "var(--color-border-gray)",
      "border-dark": "var(--color-border-dark)",
      "icon-gray": "var(--color-icon-gray)",
      "icon-bg": "var(--color-icon-bg)",
      "special-red": "var(--color-special-red)",
      "special-green": "var(--color-special-green)",
      "special-green-light": "var(--color-special-green-light)",
      "special-green-medium": "var(--color-special-green-medium)",
      "special-orange": "var(--color-special-orange)",
    },
  },
  plugins: [],
};
