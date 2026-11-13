/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bm: {
          blue: '#0073CF',
          'blue-dark': '#005499',
          'blue-light': '#E0F2FE',
          green: '#16A34A',
          'green-light': '#DCFCE7',
          red: '#E51A24',
          'red-light': '#FEE2E2',
          yellow: '#F59E0B',
          'yellow-light': '#FEF3C7',
          navy: '#0B192C',
          'navy-light': '#1E293B',
          'navy-deep': '#060D17',
          slate: '#475569',
          surface: '#F8FAFC'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'hero-pan-desktop': 'heroPanDesktop 20s ease-in-out infinite alternate',
        'hero-pan-mobile': 'heroPanMobile 12s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        },
        heroPanDesktop: {
          '0%': { transform: 'scale(1.03) translate(0%, 0%)' },
          '50%': { transform: 'scale(1.08) translate(-1.5%, -1%)' },
          '100%': { transform: 'scale(1.05) translate(1%, 0.5%)' },
        },
        heroPanMobile: {
          '0%': { transform: 'scale(1.05) translateY(0%)' },
          '50%': { transform: 'scale(1.12) translateY(-2%)' },
          '100%': { transform: 'scale(1.07) translateY(1%)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      }
    },
  },
  plugins: [],
}
