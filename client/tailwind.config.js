/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 theme: {
  extend: {
    colors: {
      alabaster: '#FAFAFA',
      pewter: '#899481',
      beige: '#F5F5DC',
      wine: '#722F37',
      espresso: '#4B2E2B',
    }
  }
},
  plugins: [],
}