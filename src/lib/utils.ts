/**
 * lib/utils — Utilidades generales del CRM.
 *
 * Funciones compartidas que se usan en toda la aplicación:
 * - `cn()`: Combinación de clases Tailwind sin conflictos
 * - `formatCurrency()`: Formato de moneda MXN
 * - `formatDate()`: Formato de fecha en español
 * - `formatRelativeTime()`: Tiempo relativo ("Hace 3h", "Hace 2d")
 *
 * @example
 * ```tsx
 * import { cn, formatCurrency, formatDate } from '@/lib/utils'
 *
 * cn('px-4', isActive && 'bg-blue', className)  // clases combinadas
 * formatCurrency(1500)                           // "$1,500.00"
 * formatDate('2024-01-15')                       // "15 de enero de 2024"
 * ```
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combina clases Tailwind sin conflictos.
 * Resuelve conflictos como `px-4 px-6` → `px-6`.
 *
 * @param inputs - Clases de Tailwind (condicionales soportadas)
 * @returns Clases combinadas y limpias
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formatea un número como moneda MXN.
 *
 * @param amount - Cantidad a formatear
 * @returns String formateado (ej. "$1,500.00")
 *
 * @example
 * ```ts
 * formatCurrency(1500)   // "$1,500.00"
 * formatCurrency(0)      // "$0.00"
 * formatCurrency(123456) // "$123,456.00"
 * ```
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN',
  }).format(amount)
}

/**
 * Formatea una fecha en español legible.
 *
 * @param date - Fecha como Date o string ISO
 * @returns String formateado (ej. "15 de enero de 2024")
 *
 * @example
 * ```ts
 * formatDate('2024-01-15')         // "15 de enero de 2024"
 * formatDate(new Date())           // "19 de julio de 2026"
 * ```
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Muestra el tiempo transcurrido desde una fecha en formato relativo.
 *
 * @param date - Fecha como Date o string ISO
 * @returns String con tiempo relativo (ej. "Hace 3h", "Hace 2d")
 *
 * @example
 * ```ts
 * formatRelativeTime(Date.now() - 300000)    // "Hace 5 min"
 * formatRelativeTime(Date.now() - 3600000)   // "Hace 1h"
 * formatRelativeTime(Date.now() - 86400000)  // "Hace 1d"
 * formatRelativeTime(Date.now() - 604800000) // "15 de enero de 2024"
 * ```
 */
export function formatRelativeTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Ahora mismo'
  if (minutes < 60) return `Hace ${minutes} min`
  if (hours < 24) return `Hace ${hours}h`
  if (days < 7) return `Hace ${days}d`
  return formatDate(d)
}
