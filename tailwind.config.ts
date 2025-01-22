import { type Config } from 'tailwindcss';
import animate from 'tailwindcss-animate';
import { fontFamily } from 'tailwindcss/defaultTheme';

export default {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
      borderRadius: {
        none: '0px',
        sm: 'calc(var(--radius) - 3px)',
        DEFAULT: 'var(--radius)',
        md: 'var(--radius)',
        lg: 'calc(var(--radius) + 3px)',
        xl: 'calc(var(--radius) + 6px)',
        '2xl': 'calc(var(--radius) + 9px)',
        '3xl': 'calc(var(--radius) + 12px)',
        full: '9999px',
      },

      colors: {
        primary: {
          base: 'hsl(var(--primary-1))',
          'bg-subtle': 'hsl(var(--primary-2))',
          bg: 'hsl(var(--primary-3))',
          'bg-hover': 'hsl(var(--primary-4))',
          'bg-active': 'hsl(var(--primary-5))',
          line: 'hsl(var(--primary-6))',
          border: 'hsl(var(--primary-7))',
          'border-hover': 'hsl(var(--primary-8))',
          'focus-ring': 'hsl(var(--primary-8))',
          solid: 'hsl(var(--primary-9))',
          'solid-hover': 'hsl(var(--primary-10))',
          text: 'hsl(var(--primary-11))',
          'text-contrast': 'hsl(var(--primary-12))',
        },

        grey: {
          base: 'hsl(var(--grey-1))',
          'bg-subtle': 'hsl(var(--grey-2))',
          bg: 'hsl(var(--grey-3))',
          'bg-hover': 'hsl(var(--grey-4))',
          'bg-active': 'hsl(var(--grey-5))',
          line: 'hsl(var(--grey-6))',
          border: 'hsl(var(--grey-7))',
          'border-hover': 'hsl(var(--grey-8))',
          'focus-ring': 'hsl(var(--grey-8))',
          solid: 'hsl(var(--grey-9))',
          'solid-hover': 'hsl(var(--grey-10))',
          text: 'hsl(var(--grey-11))',
          'text-contrast': 'hsl(var(--grey-12))',
        },

        info: {
          base: 'hsl(var(--info-1))',
          'bg-subtle': 'hsl(var(--info-2))',
          bg: 'hsl(var(--info-3))',
          'bg-hover': 'hsl(var(--info-4))',
          'bg-active': 'hsl(var(--info-5))',
          line: 'hsl(var(--info-6))',
          border: 'hsl(var(--info-7))',
          'border-hover': 'hsl(var(--info-8))',
          'focus-ring': 'hsl(var(--info-8))',
          solid: 'hsl(var(--info-9))',
          'solid-hover': 'hsl(var(--info-10))',
          text: 'hsl(var(--info-11))',
          'text-contrast': 'hsl(var(--info-12))',
        },

        success: {
          base: 'hsl(var(--success-1))',
          'bg-subtle': 'hsl(var(--success-2))',
          bg: 'hsl(var(--success-3))',
          'bg-hover': 'hsl(var(--success-4))',
          'bg-active': 'hsl(var(--success-5))',
          line: 'hsl(var(--success-6))',
          border: 'hsl(var(--success-7))',
          'border-hover': 'hsl(var(--success-8))',
          'focus-ring': 'hsl(var(--success-8))',
          solid: 'hsl(var(--success-9))',
          'solid-hover': 'hsl(var(--success-10))',
          text: 'hsl(var(--success-11))',
          'text-contrast': 'hsl(var(--success-12))',
        },

        warning: {
          base: 'hsl(var(--warning-1))',
          'bg-subtle': 'hsl(var(--warning-2))',
          bg: 'hsl(var(--warning-3))',
          'bg-hover': 'hsl(var(--warning-4))',
          'bg-active': 'hsl(var(--warning-5))',
          line: 'hsl(var(--warning-6))',
          border: 'hsl(var(--warning-7))',
          'border-hover': 'hsl(var(--warning-8))',
          'focus-ring': 'hsl(var(--warning-8))',
          solid: 'hsl(var(--warning-9))',
          'solid-hover': 'hsl(var(--warning-10))',
          text: 'hsl(var(--warning-11))',
          'text-contrast': 'hsl(var(--warning-12))',
        },

        error: {
          base: 'hsl(var(--error-1))',
          'bg-subtle': 'hsl(var(--error-2))',
          bg: 'hsl(var(--error-3))',
          'bg-hover': 'hsl(var(--error-4))',
          'bg-active': 'hsl(var(--error-5))',
          line: 'hsl(var(--error-6))',
          border: 'hsl(var(--error-7))',
          'border-hover': 'hsl(var(--error-8))',
          'focus-ring': 'hsl(var(--error-8))',
          solid: 'hsl(var(--error-9))',
          'solid-hover': 'hsl(var(--error-10))',
          text: 'hsl(var(--error-11))',
          'text-contrast': 'hsl(var(--error-12))',
        },
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'caret-blink': {
          '0%,70%,100%': { opacity: '1' },
          '20%,50%': { opacity: '0' },
        },
        'collapsible-down': {
          from: { height: '0' },
          to: {
            height: 'var(--radix-collapsible-content-height)',
          },
        },
        'collapsible-up': {
          from: {
            height: 'var(--radix-collapsible-content-height)',
          },
          to: { height: '0' },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'caret-blink': 'caret-blink 1.25s ease-out infinite',
        'collapsible-down': 'collapsible-down 0.15s ease-out',
        'collapsible-up': 'collapsible-up 0.15s ease-out',
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [animate],
} satisfies Config;
