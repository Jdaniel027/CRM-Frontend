/**
 * types/rol — Tipo de rol de usuario.
 *
 * Define los roles disponibles en el CRM:
 * - `admin`: Acceso completo a todos los módulos
 * - `empleado`: Acceso limitado (cotizaciones, kanban, clientes, servicios, etc.)
 *
 * @example
 * ```tsx
 * import type { Rol } from '@/types/rol'
 * import { ROL_LABELS } from '@/types/rol'
 *
 * const rol: Rol = 'admin'
 * ROL_LABELS[rol]  // "Administrador"
 * ```
 *
 * @see src/lib/permissions.ts para la matriz de permisos por rol
 */

/** Roles disponibles en el sistema */
export type Rol = 'admin' | 'empleado'

/** Labels legibles en español para cada rol */
export const ROL_LABELS: Record<Rol, string> = {
  admin: 'Administrador',
  empleado: 'Empleado',
}
