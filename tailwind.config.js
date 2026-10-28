/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#050A14',
          900: '#070F1E', // Main base dark
          850: '#0B1325', // Surface midnight navy
          800: '#0F1E36', // Card surface
          750: '#13243F', // Hover card
          700: '#1B2E4E', // Elevated / borders
          600: '#2A436D',
        },
        neon: {
          DEFAULT: '#39FF14', // Cyber lime / neon stabilo
          hover: '#45FF24',
          subtle: '#22C55E',
          glow: 'rgba(57, 255, 20, 0.25)',
          dim: 'rgba(57, 255, 20, 0.08)',
        },
        cyber: {
          DEFAULT: '#22C55E',
          lime: '#4ADE80',
          dark: '#15803D',
        },
        lemon: {
          DEFAULT: '#FEF08A', // Soft light yellow accent
          bright: '#FDE047',
          muted: '#FEF9C3',
          amber: '#F59E0B',
        },
        slate: {
          850: '#131D31',
        }
      },
      boxShadow: {
        'neon': '0 0 15px rgba(57, 255, 20, 0.2)',
        'neon-lg': '0 0 25px rgba(57, 255, 20, 0.35)',
        'neon-pill': '0 0 10px rgba(57, 255, 20, 0.3)',
        'lemon': '0 0 15px rgba(254, 240, 138, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
