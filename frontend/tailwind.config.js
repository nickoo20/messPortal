
import daisyui from 'daisyui'
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        poetsen:["Poetsen One", "sans-serif"],
        montserrat:["Montserrat", "sans-serif"],
        roboto:["Roboto Mono", 'monospace'],
      }
    },
  },
  plugins: [
    daisyui
  ],
}

