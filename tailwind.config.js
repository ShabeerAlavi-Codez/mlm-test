/** @type {import('tailwindcss').Config} */
require('@tailwindcss/forms')({ strategy: 'class' })

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

