/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lime': '#a3e635',
        'teal': '#8b5cf6',
        'cyan': '#67e8f9',
        'emerald': '#22c55e',
        'sky': '#38bdf8'
      }
    },
  },
  plugins: [],
}

