/**
 * stores/sidebar-store — Estado del sidebar.
 *
 * Store de Zustand con persistencia en localStorage.
 * Controla si el sidebar está expandido o colapsado.
 *
 * @example
 * ```tsx
 * import { useSidebarStore } from '@/stores/sidebar-store'
 *
 * // Leer estado
 * const { collapsed } = useSidebarStore()
 *
 * // Toggle (expandir/colapsar)
 * const { toggle } = useSidebarStore()
 * toggle()
 *
 * // Forzar un estado
 * const { setCollapsed } = useSidebarStore()
 * setCollapsed(true)  // colapsar
 * setCollapsed(false) // expandir
 * ```
 *
 * @see src/app/layout/Sidebar.tsx para uso principal
 * @see src/app/layout/AppLayout.tsx para el margen del contenido
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/** Estado y acciones del store del sidebar */
interface SidebarState {
  /** Si el sidebar está colapsado (true = 72px, false = 260px) */
  collapsed: boolean
  /** Alterna entre expandido y colapsado */
  toggle: () => void
  /** Fuerza un estado específico */
  setCollapsed: (collapsed: boolean) => void
}

/**
 * Store del sidebar con persistencia.
 * Se guarda en localStorage bajo la key `crm-sidebar`.
 * El estado se sincroniza entre sidebar y AppLayout.
 */
export const useSidebarStore = create<SidebarState>()(
  persist(
    (set) => ({
      collapsed: false,
      toggle: () => set((state) => ({ collapsed: !state.collapsed })),
      setCollapsed: (collapsed) => set({ collapsed }),
    }),
    {
      name: 'crm-sidebar',
    }
  )
)
