// /** @type {import('tailwindcss').Config} */
// const { nextui } = require("@nextui-org/react");

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // Include NextUI theme files
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class", 
//   plugins: [nextui()], 
// };

/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", 
    "./node_modules/@mui/material/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};

