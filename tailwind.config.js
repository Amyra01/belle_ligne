/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cormorant: ['"Cormorant Garamond"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      colors: {
        teal: {
          950: '#032024',
          900: '#07353b',
          800: '#0e4e56',
          700: '#146872',
          600: '#1e8894',
          500: '#2cb0bf',
          400: '#4ec7d4',
          300: '#84dee7',
          200: '#bdf0f5',
          100: '#e1f9fb',
          50: '#f0fcfd',
        },
        editorial: {
          bg: '#F9F8F6',
          card: '#FFFFFF',
          darkBg: '#0D0E11',
          darkCard: '#15171C',
          terracotta: '#A65539',
          bronze: '#C0804D',
          gold: '#CBB279',
          slate: '#2C3038',
          subtle: '#7E8695',
          cream: '#F4EFEB'
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
