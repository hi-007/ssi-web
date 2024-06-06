/** @type {import('tailwindcss').Config} */


export default {
  darkMode: 'class', // เปิดใช้งาน dark mode

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
        sarabun: ['Sarabun', 'sans-serif'],
        prompt: ['Prompt', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        customBlue: '#1A3D93',
      },
    
    },
  },
  plugins: [],
}