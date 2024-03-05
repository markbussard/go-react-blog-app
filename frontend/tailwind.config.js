import headlessUITailwindCSS from "@headlessui/tailwindcss";

/**
 * @type {import('tailwindcss').Config}
 */
const config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [headlessUITailwindCSS({ prefix: "ui" })],
};

export default config;
