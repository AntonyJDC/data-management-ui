/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px',
			},
		},
    extend: {
      boxShadow: {
        'uniform-xs': '0px 0px 2px oklch(var(--bc) / 0.1)', // Sombra pequeña uniforme
        'uniform-sm': '0px 0px 4px oklch(var(--bc) / 0.1)', // Sombra pequeña uniforme
        'uniform-md': '0px 0px 6px oklch(var(--bc) / 0.1)', // Sombra mediana uniforme
        'uniform-lg': '0px 0px 8px oklch(var(--bc) / 0.2)', // Sombra grande uniforme
        'uniform-xl': '0px 0px 12px oklch(var(--bc) / 0.1)', // Sombra extra grande uniforme
        'uniform-2xl': '0px 0px 16px oklch(var(--bc) / 0.1)', // Sombra aún más grande uniforme
      },
      colors: {
        border: 'oklch(var(--bc)/0.2)',
        input: 'oklch(var(--bc)/0.2)',
        ring: 'oklch(var(--bc))',
        background: 'oklch(var(--b2))',
        foreground: 'oklch(var(--bc))',
        secondary: {
          DEFAULT: 'oklch(var(--s))',
          foreground: 'oklch(var(--sc))',
        },
        destructive: {
          DEFAULT: 'oklch(var(--er))',
          foreground: 'oklch(var(--erc))',
        },
        muted: {
          DEFAULT: 'oklch(var(--b1))',
          foreground: 'oklch(var(--bc))',
        },
        accent: {
          DEFAULT: 'oklch(var(--a))',
          foreground: 'oklch(var(--ac))',
        },
        popover: {
          DEFAULT: 'oklch(var(--b1))',
          foreground: 'oklch(var(--bc))',
        },
        card: {
          DEFAULT: 'oklch(var(--b1))',
          foreground: 'oklch(var(--bc))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
    fontFamily: {
      emoji: [
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
        'sans-serif',
      ],
      sans: [
        'Public Sans Variable',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ],
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'winter', 'dark', 'night'],
  },
}

