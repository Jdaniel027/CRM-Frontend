/**
 * types/estado — Tipo de estado de cotización/tarea.
 *
 * Define los estados posibles del flujo de cotización:
 * `pendiente` → `borrador` → `enviada` → `aprobada` | `rechazada`
 *
 * Incluye labels legibles en español y mapeo de colores.
 *
 * @example
 * ```tsx
 * import type { Estado } from '@/types/estado'
 * import { ESTADO_LABELS, ESTADO_COLORS } from '@/types/estado'
 *
 * <StatusBadge estado="aprobada" />  // usa el tipo directamente
 * ESTADO_LABELS['aprobada']          // "Aprobada"
 * ESTADO_COLORS['aprobada'].bg       // "bg-status-aprobada-bg"
 * ```
 *
 * @see src/components/status-badge/StatusBadge.tsx para el componente visual
 * @see tailwind.config.ts para los tokens de color `status.*`
 */

/** Estados posibles de una cotización/tarea */
export type Estado =
  | 'pendiente'
  | 'borrador'
  | 'enviada'
  | 'aprobada'
  | 'rechazada'

/** Labels legibles en español para cada estado */
export const ESTADO_LABELS: Record<Estado, string> = {
  pendiente: 'Pendiente',
  borrador: 'Borrador',
  enviada: 'Enviada',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
}

/** Mapeo de colores CSS por estado (clases de Tailwind) */
export const ESTADO_COLORS: Record<Estado, { bg: string; border: string; text: string }> = {
  pendiente: { bg: 'bg-status-pendiente-bg', border: 'border-status-pendiente-border', text: 'text-status-pendiente-text' },
  borrador: { bg: 'bg-status-borrador-bg', border: 'border-status-borrador-border', text: 'text-status-borrador-text' },
  enviada: { bg: 'bg-status-enviada-bg', border: 'border-status-enviada-border', text: 'text-status-enviada-text' },
  aprobada: { bg: 'bg-status-aprobada-bg', border: 'border-status-aprobada-border', text: 'text-status-aprobada-text' },
  rechazada: { bg: 'bg-status-rechazada-bg', border: 'border-status-rechazada-border', text: 'text-status-rechazada-text' },
}
