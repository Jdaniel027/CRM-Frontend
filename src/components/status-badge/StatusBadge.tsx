import { cn } from '@/lib/utils'
import type { Estado } from '@/types/estado'
import { ESTADO_LABELS } from '@/types/estado'

interface StatusBadgeProps {
  estado: Estado
  className?: string
}

const estadoStyles: Record<Estado, string> = {
  pendiente: 'bg-status-pendiente-bg border-status-pendiente-border text-status-pendiente-text',
  borrador: 'bg-status-borrador-bg border-status-borrador-border text-status-borrador-text',
  enviada: 'bg-status-enviada-bg border-status-enviada-border text-status-enviada-text',
  aprobada: 'bg-status-aprobada-bg border-status-aprobada-border text-status-aprobada-text',
  rechazada: 'bg-status-rechazada-bg border-status-rechazada-border text-status-rechazada-text',
}

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
