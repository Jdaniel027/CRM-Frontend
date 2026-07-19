/**
 * stores/session-store — Estado de autenticación global.
 *
 * Store de Zustand con persistencia en localStorage.
 * Maneja el usuario logueado, token de autenticación y estado de sesión.
 *
 * @example
 * ```tsx
 * import { useSessionStore } from '@/stores/session-store'
 *
 * // Leer estado
 * const { user, isAuthenticated } = useSessionStore()
 *
 * // Login
 * const { login } = useSessionStore()
 * login({ id: '1', nombre: 'Admin', email: 'admin@crm.com', rol: 'admin' }, 'token-jwt')
 *
 * // Logout
 * const { logout } = useSessionStore()
 * logout()
 *
 * // Actualizar datos del usuario
 * const { updateUser } = useSessionStore()
 * updateUser({ nombre: 'Nuevo Nombre' })
 * ```
 *
 * @see src/app/routes.tsx para uso en ProtectedRoute
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Rol } from '@/types/rol'

/** Interfaz del usuario logueado */
interface User {
  /** ID único del usuario */
  id: string
  /** Nombre completo */
  nombre: string
  /** Correo electrónico */
  email: string
  /** Rol del usuario (admin | empleado) */
  rol: Rol
  /** URL del avatar (opcional) */
  avatar?: string
}

/** Estado y acciones del store de sesión */
interface SessionState {
  /** Datos del usuario logueado (null si no hay sesión) */
  user: User | null
  /** Si hay una sesión activa */
  isAuthenticated: boolean
  /** Inicia sesión guardando el usuario y token */
  login: (user: User, token: string) => void
  /** Cierra sesión limpiando token y usuario */
  logout: () => void
  /** Actualiza parcialmente los datos del usuario */
  updateUser: (user: Partial<User>) => void
}

/**
 * Store de sesión con persistencia.
 * Se guarda en localStorage bajo la key `crm-session`.
 * El token se guarda por separado en `token` (para api-client).
 */
export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (user, token) => {
        localStorage.setItem('token', token)
        set({ user, isAuthenticated: true })
      },
      logout: () => {
        localStorage.removeItem('token')
        set({ user: null, isAuthenticated: false })
      },
      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),
    }),
    {
      name: 'crm-session',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
