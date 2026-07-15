/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        background: '#0F172A',
        card: '#1E293B',
        primary: '#38BDF8',
        accent: '#60A5FA',
        muted: '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0, 0, 0, 0.25)',
        glow: '0 0 40px rgba(56, 189, 248, 0.15)',
      },
      maxWidth: {
        content: '1200px',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        blink: 'blink 1s step-start infinite',
      },
    },
  },
  plugins: [],
}
