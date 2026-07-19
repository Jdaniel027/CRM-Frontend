import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5D88CD',
          hover: '#4A75B8',
          light: '#E8F0FA',
        },
        sidebar: {
          DEFAULT: '#1E2A47',
          hover: '#2A3A5C',
          active: '#34476B',
        },
        status: {
          pendiente: {
            bg: '#E9E9E7',
            border: '#C9C9C6',
            text: '#6B6B68',
          },
          borrador: {
            bg: '#E4E1FA',
            border: '#C2BCF0',
            text: '#6B5FD6',
          },
          enviada: {
            bg: '#FBF0D9',
            border: '#EDCF8F',
            text: '#B8860B',
          },
          aprobada: {
            bg: '#D9F2E3',
            border: '#A3DDBB',
            text: '#1BAF7A',
          },
          rechazada: {
            bg: '#FADADA',
            border: '#F0A8A8',
            text: '#C0392B',
          },
        },
        category: {
          cotizacion: {
            bg: '#E8E7FB',
            border: '#B8B5F0',
            text: '#5B54D6',
          },
          identificacion: {
            bg: '#DFF5F3',
            border: '#A8E3DD',
            text: '#1A8F82',
          },
          permiso: {
            bg: '#F5E9DF',
            border: '#E3C3A3',
            text: '#A66A34',
          },
        },
        background: '#F8F9FC',
        foreground: '#1A1A2E',
        muted: {
          DEFAULT: '#F1F3F9',
          foreground: '#6B7280',
        },
        border: '#E5E7EB',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
    },
  },
  plugins: [],
}

export default config
