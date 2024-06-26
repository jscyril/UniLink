/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "search-icon":
          "url('/headernavbarsearch-barplaceholdersearchicon@2x.png')",
      },
      colors: {
        gray: {
          100: "#8e8686",
          200: "#818384",
          300: "#262628",
          400: "#1a1a1b",
          500: "#848484",
          600: "rgba(39, 39, 41, 0.9)",
          700: "#272729",
          800: "#28282a",
        },
        mediumslateblue: "#707dff",
        darkslategray: {
          100: "#323232",
          200: "rgba(52, 53, 54, 0)",
          300: "rgba(52, 53, 54, 0.6)",
        },
        white: "#fff",
        black: "#000",
        gainsboro: "#e3e3e3",
        dimgray: "#4f4f4f",
      },
      spacing: {},
      fontFamily: {
        inter: "Inter",
        abeezee: "ABeeZee",
        inherit: "inherit",
        kanit: "Kanit",
      },
      borderRadius: {
        "12xl": "31px",
        "7xl": "26px",
        "12xs": "1px",
        "22xl": "41px",
      },
    },
    fontSize: {
      base: "16px",
      "5xl": "24px",
      xs: "12px",
      xl: "20px",
      sm: "14px",
      "10xl": "29px",
      "13xl": "32px",
      "lg-6": "18.6px",
      "lg-4": "18.4px",
      "9xl": "28px",
      "3xl": "22px",
      "21xl": "40px",
      mid: "17px",
      inherit: "inherit",
    },
    screens: {
      lg: {
        max: "1200px",
      },
      md: {
        max: "960px",
      },
      sm: {
        max: "420px",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
