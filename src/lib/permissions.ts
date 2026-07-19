import { type Rol } from '@/types/rol'

type Modulo = 'clientes' | 'empleados' | 'dashboard' | 'pagos' | 'cotizaciones' | 'kanban' | 'proyectos' | 'servicios' | 'configuracion' | 'home'

type PermisoAccion = 'ver' | 'editar' | 'crear' | 'eliminar'

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
  kanban: {
    ver: ['admin', 'empleado'],
    editar: ['admin', 'empleado'],
    crear: ['admin', 'empleado'],
    eliminar: ['admin'],
  },
  proyectos: {
    ver: ['admin', 'empleado'],
    editar: ['admin'],
    crear: ['admin'],
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

export function tienePermiso(rol: Rol, modulo: Modulo, accion: PermisoAccion): boolean {
  return permisos[modulo]?.[accion]?.includes(rol) ?? false
}

export function puedeVer(rol: Rol, modulo: Modulo): boolean {
  return tienePermiso(rol, modulo, 'ver')
}

export function puedeEditar(rol: Rol, modulo: Modulo): boolean {
  return tienePermiso(rol, modulo, 'editar')
}

export function puedeCrear(rol: Rol, modulo: Modulo): boolean {
  return tienePermiso(rol, modulo, 'crear')
}

export function puedeEliminar(rol: Rol, modulo: Modulo): boolean {
  return tienePermiso(rol, modulo, 'eliminar')
}
