/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',          
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      keyframes: {
        ping: {
          '75%, 100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        'ping-slow': 'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
};
