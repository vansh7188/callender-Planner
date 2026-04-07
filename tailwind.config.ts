import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 8px 24px rgba(15, 23, 42, 0.08)',
        'soft-md': '0 12px 32px rgba(15, 23, 42, 0.1)',
        'soft-lg': '0 16px 48px rgba(15, 23, 42, 0.12)',
        lift: '0 8px 28px rgba(15, 23, 42, 0.12)',
        'lift-lg': '0 12px 40px rgba(15, 23, 42, 0.14)',
        ring: '0 0 0 1px rgba(255,255,255,0.18), 0 24px 65px rgba(15, 23, 42, 0.18)',
        'pristine': '0 4px 16px rgba(0, 0, 0, 0.05), 0 0 0 0.5px rgba(0, 0, 0, 0.08)',
        'inner-glow': 'inset 0 1px 2px rgba(255, 255, 255, 0.3)',
      },
      backgroundImage: {
        'calendar-grid': 'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)'
      },
      spacing: {
        'card-pad': '1.5rem',
        'section-gap': '2rem',
        'section-gap-lg': '2.5rem'
      },
      keyframes: {
        sheetIn: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.72', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.03)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
      animation: {
        sheetIn: 'sheetIn 220ms ease-out',
        pulseSoft: 'pulseSoft 2.6s ease-in-out infinite',
        scaleIn: 'scaleIn 180ms ease-out',
        slideUp: 'slideUp 200ms ease-out',
        fadeIn: 'fadeIn 280ms ease-out'
      }
    }
  },
  plugins: []
};

export default config;
