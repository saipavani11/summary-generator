/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.3s ease-out forwards',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: 0, transform: 'scale(0.95)' },
        '100%': { opacity: 1, transform: 'scale(1)' },
      },
    },
  }
}

// // tailwind.config.js
// export default {
//   content: ['./index.html', './src/**/*.{js,jsx}'],
//   darkMode: 'class', // Use class-based dark mode
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

