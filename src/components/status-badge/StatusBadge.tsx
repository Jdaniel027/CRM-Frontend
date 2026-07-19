/**
 * StatusBadge — Badge de estado de cotización/tarea.
 *
 * Muestra el estado actual usando los tokens de color de tailwind.config.ts.
 * Los colores son CONSISTENTES en todo el sistema: badges, tablas Kanban,
 * gráficas de dona y perfiles.
 *
 * **Este es el ÚNICO componente que debe usarse para mostrar estados.**
 * No usar colores de estado "a mano" en ningún otro componente.
 *
 * @example
 * ```tsx
 * <StatusBadge estado="aprobada" />
 * <StatusBadge estado="pendiente" />
 * <StatusBadge estado="rechazada" />
 * ```
 *
 * @see {@link CategoryBadge} para categorías de documento
 * @see tailwind.config.ts para los tokens de color `status.*`
 */

import { cn } from '@/lib/utils'
import type { Estado } from '@/types/estado'
import { ESTADO_LABELS } from '@/types/estado'

/** Props del componente StatusBadge */
interface StatusBadgeProps {
  /** Estado de la cotización/tarea */
  estado: Estado
  /** Clases adicionales de Tailwind */
  className?: string
}

/** Mapeo de estado a clases de Tailwind (fondo, borde, texto) */
const estadoStyles: Record<Estado, string> = {
  pendiente: 'bg-status-pendiente-bg border-status-pendiente-border text-status-pendiente-text',
  borrador: 'bg-status-borrador-bg border-status-borrador-border text-status-borrador-text',
  enviada: 'bg-status-enviada-bg border-status-enviada-border text-status-enviada-text',
  aprobada: 'bg-status-aprobada-bg border-status-aprobada-border text-status-aprobada-text',
  rechazada: 'bg-status-rechazada-bg border-status-rechazada-border text-status-rechazada-text',
}

/**
 * Badge de estado con color consistente.
 * Muestra la etiqueta legible del estado (ej. "Aprobada", "Pendiente").
 */
export default function StatusBadge({ estado, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        estadoStyles[estado],
        className
      )}
    >
      {ESTADO_LABELS[estado]}
    </span>
  )
}
