const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/components/**/*.{js,ts,jsx,tsx}", "./src/pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {},
  plugins: []
};
