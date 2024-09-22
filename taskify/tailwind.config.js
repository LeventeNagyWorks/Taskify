/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      keyframes: {
        shake: {
          '0%, 100%': { transform: '-translateX(5px)' },
          '50%': { transform: 'translateX(5px)' },
        },
      },
      animation: {
        shake: 'shake 1s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

