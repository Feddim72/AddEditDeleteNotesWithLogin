const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  // You are missing this block that defines what files tailwind should scan for usage
  
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      'xxs': '375px',
      'xs': '475px',
      ...defaultTheme.screens,
    },
    extend: {
       
    },
  },
  plugins: [
    // function ({ addUtilities }) {
    //   addUtilities({
    //     ".overflow-wrap-anywhere": {
    //       overflowWrap: "anywhere",
    //     },
    //     ".bg-pattern": {
    //       background:
    //         "url('/bg-pattern-left.svg') repeat-y , url('/bg-pattern-right.svg') repeat-y right",
    //       backgroundSize: "20%",
    //     },
    //     ".bg-pattern-newsletter": {
    //       background:
    //         "url('/bg-pattern-left.svg') -310px 838px/40% repeat-y , url('/bg-pattern-right.svg') 1579px -290px/40% repeat-y ",
    //     },
    //   });
    // },
    // require("tailwindcss-children"),
  ],
};
