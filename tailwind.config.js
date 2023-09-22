// You can't use import statements in your tailwind.js file
// reference: https://github.com/tailwindlabs/discuss/issues/119#issuecomment-364932948
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  // corePlugins: {
  //   outline: false
  // },
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          200: "#eaeaea",
          300: "#404040",
          400: "#2b2b2b",
          900: "#151515"
        },
        jedi: {
          300: "#63a5a1",
          400: "#497975",
          500: "#314f41",
          600: "#1b2a25",
          700: "#0c120c",
          800: "#24211a",
          900: "#2c2921"
        }
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        wide: ["widescreen-mixed", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
