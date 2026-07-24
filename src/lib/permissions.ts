/**
 * lib/permissions — Matriz de permisos por rol y módulo.
 *
 * Define qué puede hacer cada rol en cada módulo del CRM.
 * Estos guards son SOLO para UX (ocultar botones, filtrar sidebar).
 * La validación real DEBE estar en el backend.
 *
 * @example
 * ```ts
 * import { puedeVer, puedeEditar, puedeCrear, puedeEliminar } from '@/lib/permissions'
 *
 * puedeVer('admin', 'empleados')        // true
 * puedeVer('empleado', 'empleados')     // false
 * puedeEditar('empleado', 'cotizaciones') // true
 * puedeEliminar('empleado', 'clientes')   // false
 * ```
 *
 * @see src/app/layout/Sidebar.tsx para filtrado de ítems del sidebar
 * @see src/app/routes.tsx para protección de rutas
 */

import { type Rol } from '@/types/rol'

/** Módulos disponibles en el CRM */
type Modulo = 'clientes' | 'empleados' | 'dashboard' | 'pagos' | 'cotizaciones' | 'proyectos' | 'servicios' | 'configuracion' | 'home'

/** Acciones permitidas sobre un módulo */
type PermisoAccion = 'ver' | 'editar' | 'crear' | 'eliminar'

/**
 * Matriz de permisos: módulo → acción → roles permitidos.
 * Si un rol NO está en la lista, NO tiene ese permiso.
 */
const permisos: Record<Modulo, Record<PermisoAccion, Rol[]>> = {
  clientes: {
    ver: ['admin', 'empleado'],
    editar: ['admin'],
    crear: ['admin'],
    eliminar: ['admin'],
  },
  empleados: {
    ver: ['admin'],
    editar: ['admin'],
    crear: ['admin'],
    eliminar: ['admin'],
  },
  dashboard: {
    ver: ['admin'],
    editar: ['admin'],
    crear: ['admin'],
    eliminar: ['admin'],
  },
  pagos: {
    ver: ['admin'],
    editar: ['admin'],
    crear: ['admin'],
    eliminar: ['admin'],
  },
  cotizaciones: {
    ver: ['admin', 'empleado'],
    editar: ['admin', 'empleado'],
    crear: ['admin', 'empleado'],
    eliminar: ['admin'],
  },
  proyectos: {
    ver: ['admin', 'empleado'],
    editar: ['admin', 'empleado'],
    crear: ['admin', 'empleado'],
    eliminar: ['admin'],
  },
  servicios: {
    ver: ['admin', 'empleado'],
    editar: ['admin'],
    crear: ['admin'],
    eliminar: ['admin'],
  },
  configuracion: {
    ver: ['admin', 'empleado'],
    editar: ['admin', 'empleado'],
    crear: ['admin', 'empleado'],
    eliminar: ['admin'],
  },
  home: {
    ver: ['admin', 'empleado'],
    editar: ['admin', 'empleado'],
    crear: ['admin', 'empleado'],
    eliminar: ['admin', 'empleado'],
  },
}

/**
 * Verificación genérica de permisos.
 * @param rol - Rol del usuario
 * @param modulo - Módulo a verificar
 * @param accion - Acción a verificar
 * @returns `true` si el rol tiene el permiso
 */
export function tienePermiso(rol: Rol, modulo: Modulo, accion: PermisoAccion): boolean {
  return permisos[modulo]?.[accion]?.includes(rol) ?? false
}

/** Verifica si el rol puede VER el módulo */
export function puedeVer(rol: Rol, modulo: Modulo): boolean {
  return tienePermiso(rol, modulo, 'ver')
}

/** Verifica si el rol puede EDITAR en el módulo */
export function puedeEditar(rol: Rol, modulo: Modulo): boolean {
  return tienePermiso(rol, modulo, 'editar')
}

/** Verifica si el rol puede CREAR en el módulo */
export function puedeCrear(rol: Rol, modulo: Modulo): boolean {
  return tienePermiso(rol, modulo, 'crear')
}

/** Verifica si el rol puede ELIMINAR en el módulo */
export function puedeEliminar(rol: Rol, modulo: Modulo): boolean {
  return tienePermiso(rol, modulo, 'eliminar')
}
