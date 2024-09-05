/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    screens: {
      'sm': '220px', 
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
    },
    extend: {
      boxShadow: {
        'custom-normal': '5px 5px 10px rgba(0, 0, 0, 0.1)',
        'custom-hover': '10px 10px 20px rgba(0, 0, 0, 0.2)',
      },
    },
    
  },
  plugins: [],
}