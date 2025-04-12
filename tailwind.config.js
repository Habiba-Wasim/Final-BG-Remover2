// /** @type {import('tailwindcss').Config} */
// export const content = [];
// export const theme = {
//   extend: {},
// };
// export const plugins = [
//   require('@tailwindcss/forms'),
//   require('@tailwindcss/typography'),
// ];




/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")], // 👈 Ensure ye line hai
};
