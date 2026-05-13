/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'corporate-white': '#FFFFFF',
        'deep-space-dark': '#0A0A0A',
        'thermal-orange': '#FF4500',
        'insulation-blue': '#00EDFF'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        technical: ['Space Grotesk', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
