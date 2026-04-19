/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'construction-amber': '#F59E0B',
        'construction-amber-light': '#FCD34D',
        'deep-slate': '#1E293B',
        'deep-slate-light': '#334155',
        'toolhive-gray': '#F8FAFC',
      },
      fontFamily: {
        'engineering': ['Inter', 'system-ui', 'sans-serif'],
      },
      clipPath: {
        'hexagon': 'polygon(12% 0%, 88% 0%, 100% 50%, 88% 100%, 12% 100%, 0% 50%)',
      },
      animation: {
        'hexagon-float': 'hexagonFloat 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        hexagonFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
