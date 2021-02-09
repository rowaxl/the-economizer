const px = (pixels) => `${pixels / 16} rem`

module.exports = {
  purge: ["./src/components/**/*.{js,ts,jsx,tsx}", "./src/pages/**/*.{js,ts,jsx,tsx}"],
  prefix: "tw-",
  important: false,
  theme: {
    screens: { sm: "640px" },
    fontSize: {
      xs: px(12),
      sm: px(14),
      base: px(15),
      lg: px(18),
      xl: px(20),
      "2xl": px(24),
      "3xl": px(30),
      "4xl": px(36),
      "5xl": px(48),
      "6xl": px(64),
    },
    colors: {
      black: "#000", white: "#fff",
      gray: { light: "#f7fafc", mid: "#a0aec0", dark: "#1a202c" },
      red: { light: "#fff5f5", mid: "#f56565", dark: "#742a2a" },
      blue: { light: "#ebf8ff", mid: "#4299e1", dark: "#2a4365" },
    },
    spacing: { "4": "4px", "8": "8px", "16": "16px", "24": "24px" },
    backgroundColor: theme => theme("colors"),
    fontSize: { "14": "14px", "16": "16px", "18": "18px" },
    padding: theme => theme("spacing"),
    margin: theme => ({ ...theme("spacing"), "-1": "-1px" }),
    textColor: theme => theme("colors"),
    extend: {
      screens: {
        xs: "480px",
      },
    },
  },
  variants: {
    backgroundColor: [], textColor: [], boxShadow: [],
  },
  darkMode: 'media',
  variants: {},
  plugins: [require("@tailwindcss/ui")],
  corePlugins: [
    "display", "position", "textColor", "backgroundColor", "margin",
    "padding", "fontSize",
  ],
}