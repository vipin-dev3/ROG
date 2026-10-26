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
        rog: {
          bg: '#0a0a0c',
          card: '#121217',
          cardHover: '#181822',
          surface: '#16161e',
          surfaceBorder: '#232330',
          red: '#ff0033',
          redGlow: 'rgba(255, 0, 51, 0.4)',
          redDark: '#b30024',
          pink: '#ff007f',
          textMuted: '#7c7c94',
          textDim: '#4e4e63',
          border: '#20202c',
          borderLight: '#303042',
          cyan: '#00f0ff',
          amber: '#ffaa00'
        }
      },
      fontFamily: {
        sans: ['Rajdhani', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Orbitron', 'Rajdhani', 'sans-serif'],
        tech: ['Rajdhani', 'sans-serif']
      },
      boxShadow: {
        'rog-red': '0 0 20px rgba(255, 0, 51, 0.35)',
        'rog-red-lg': '0 0 35px rgba(255, 0, 51, 0.55)',
        'rog-cyan': '0 0 20px rgba(0, 240, 255, 0.35)',
        'rog-amber': '0 0 25px rgba(255, 170, 0, 0.45)',
        'hud': 'inset 0 0 15px rgba(0, 0, 0, 0.8), 0 0 10px rgba(255, 0, 51, 0.2)'
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 2.5s infinite ease-in-out',
        'scanline': 'scanline 8s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: 0.9, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.01)' },
        },
        glowPulse: {
          '0%': { filter: 'drop-shadow(0 0 8px rgba(255,0,51,0.4))' },
          '100%': { filter: 'drop-shadow(0 0 18px rgba(255,0,51,0.85))' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' }
        }
      }
    },
  },
  plugins: [],
}
