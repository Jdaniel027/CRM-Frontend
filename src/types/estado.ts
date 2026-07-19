export type Estado =
  | 'pendiente'
  | 'borrador'
  | 'enviada'
  | 'aprobada'
  | 'rechazada'

export const ESTADO_LABELS: Record<Estado, string> = {
  pendiente: 'Pendiente',
  borrador: 'Borrador',
  enviada: 'Enviada',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
}

export const ESTADO_COLORS: Record<Estado, { bg: string; border: string; text: string }> = {
  pendiente: { bg: 'bg-status-pendiente-bg', border: 'border-status-pendiente-border', text: 'text-status-pendiente-text' },
  borrador: { bg: 'bg-status-borrador-bg', border: 'border-status-borrador-border', text: 'text-status-borrador-text' },
  enviada: { bg: 'bg-status-enviada-bg', border: 'border-status-enviada-border', text: 'text-status-enviada-text' },
  aprobada: { bg: 'bg-status-aprobada-bg', border: 'border-status-aprobada-border', text: 'text-status-aprobada-text' },
  rechazada: { bg: 'bg-status-rechazada-bg', border: 'border-status-rechazada-border', text: 'text-status-rechazada-text' },
}
