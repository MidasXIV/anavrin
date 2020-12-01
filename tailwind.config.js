// You can't use import statements in your tailwind.js file
// reference: https://github.com/tailwindlabs/discuss/issues/119#issuecomment-364932948
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    customForms: theme => ({
      default: {
        button: {
          "&:focus": {
            outline: "none",
            boxShadow: "none",
            borderColor: "none"
          }
        }
      }
    }),
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {
    backgroundColor: ["responsive", "hover", "focus", "active"]
  },
  plugins: []
};
