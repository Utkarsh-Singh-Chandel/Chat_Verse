/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        c1:"#3ABEF9",
        c2:"#3572EF"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}