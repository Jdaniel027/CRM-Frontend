import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5D88CD',
          hover: '#4A75B8',
          light: '#E8F0FA',
        },
        // Menu lateral (Sidebar) — fondo, hover y activo. Los colores de los
        sidebar: {
          DEFAULT: '#191c36',
          hover: '#252a45',
          active: '#32405B',
          text: '#A5ADC6',
          textActive: '#ffffff',
        },

        // Estados del flujo de Cotización/Tarea — mismos colores en badges,
        // tarjetas de Kanban y gráficas de dona (Dashboard, perfiles).
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

        // Categoría de documento (perfil Cliente > tab Documentos)
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
          otros: {
            bg: '#E9EBF0',
            border: '#C4C9D4',
            text: '#4A5568',
          },
        },

        // Rol de usuario (badges en Empleados / Agentes externos)
        role: {
          admin: {
            bg: '#D9F2E3',
            border: '#A3DDBB',
            text: '#1BAF7A',
          },
          empleado: {
            bg: '#DCE9FA',
            border: '#A9C8F0',
            text: '#3D6FB8',
          },
        },

        // Activo / Inactivo (Empleados, Agentes externos, Servicios)
        activeState: {
          activo: {
            bg: '#DCE9FA',
            border: '#A9C8F0',
            text: '#3D6FB8',
          },
          inactivo: {
            bg: '#E9E9E7',
            border: '#C9C9C6',
            text: '#6B6B68',
          },
        },

        // Prioridad de tarea (Kanban) — escala distinta a "status" para no
        // confundir prioridad alta con estado rechazado.
        priority: {
          baja: {
            bg: '#DCE9FA',
            border: '#A9C8F0',
            text: '#3D6FB8',
          },
          media: {
            bg: '#FBF0D9',
            border: '#EDCF8F',
            text: '#B8860B',
          },
          alta: {
            bg: '#FBDDD9',
            border: '#EFA79C',
            text: '#C2542F',
          },
        },

        // Paleta fija para chips de color de Proyecto en el Kanban.
        // Limitada a 8 tonos a propósito — no usar un color picker libre,
        // para evitar saturación visual con muchos proyectos activos.
        project: {
          1: '#7C5CD6', // morado
          2: '#3D6FB8', // azul
          3: '#1BAF7A', // verde
          4: '#B8860B', // ámbar
          5: '#C2542F', // terracota
          6: '#1A8F82', // turquesa
          7: '#C0392B', // rojo
          8: '#6B6B68', // gris
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
