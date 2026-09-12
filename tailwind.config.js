/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sunset: {
          50: '#fff7ed',
          100: '#ffe8d6',
          200: '#ffd0b3',
          300: '#ffb085',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
        },
        cream: '#fbf3e4',
        creamdark: '#f0e2c8',
        lake: {
          100: '#e0fbf7',
          200: '#b8f0ea',
          300: '#8ee8df',
          400: '#4fd3c8',
          500: '#2fc2b8',
          600: '#1fa39a',
          700: '#15817b',
          800: '#11615d',
          900: '#0d4a47',
        },
        leaf: {
          100: '#eef7de',
          200: '#d9efb6',
          300: '#bde587',
          400: '#a3d95f',
          500: '#8fd14f',
          600: '#6fbf3f',
          700: '#58a12f',
          800: '#46802a',
          900: '#345f25',
        },
        plum: {
          400: '#9340a8',
          500: '#6d227f',
          600: '#5c1a69',
          700: '#471146',
          800: '#3d1146',
          900: '#250a2b',
        },
      },
      fontFamily: {
        display: ['"Fredoka"', 'system-ui', 'sans-serif'],
        body: ['"Nunito"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 50px -20px rgba(61,17,70,0.35)',
        pop: '0 30px 80px -30px rgba(249,115,22,0.55)',
      },
      keyframes: {
        floaty: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        floaty: 'floaty 5s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}