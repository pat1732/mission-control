/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        mission: {
          dark: '#0a0e17',
          card: '#111827',
          border: '#1e293b',
          text: '#e2e8f0',
          muted: '#94a3b8',
        },
        agent: {
          mo: '#3b82f6',      // โม่เน่ - Blue
          nan: '#22c55e',     // ณลิน - Green  
          may: '#eab308',     // เมย์ - Yellow
          ee: '#a855f7',      // เอ - Purple
          bee: '#ef4444',     // บี - Red
          see: '#06b6d4',     // ซี - Cyan
          dee: '#ec4899',     // ดี - Pink
        },
        status: {
          working: '#22c55e',
          idle: '#64748b',
          ready: '#3b82f6',
          waiting: '#f59e0b',
          blocked: '#ef4444',
          error: '#dc2626',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px currentColor' },
          '100%': { boxShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        }
      }
    },
  },
  plugins: [],
}
