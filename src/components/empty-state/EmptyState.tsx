/**
 * EmptyState — Estado vacío genérico.
 *
 * Componente que se muestra cuando no hay datos disponibles.
 * Incluye ícono, título, descripción y acción opcional (botón).
 *
 * @example
 * ```tsx
 * import { EmptyState } from '@/components/empty-state'
 * import { FileText } from 'lucide-react'
 * import { Button } from '@/components/ui/button'
 *
 * <EmptyState
 *   icon={<FileText className="h-12 w-12" />}
 *   title="No hay cotizaciones"
 *   description="Crea tu primera cotización para comenzar."
 *   action={<Button onClick={crearCotizacion}>Crear cotización</Button>}
 * />
 * ```
 */

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Props del componente EmptyState */
interface EmptyStateProps {
  /** Ícono grande mostrado arriba del título (ReactNode) */
  icon?: ReactNode
  /** Título principal del estado vacío */
  title: string
  /** Descripción secundaria (opcional) */
  description?: string
  /** Botón o acción (opcional) */
  action?: ReactNode
  /** Clases adicionales de Tailwind */
  className?: string
}

/**
 * Componente EmptyState centrado verticalmente.
 * Se usa en tablas vacías, listas sin datos, etc.
 */
export default function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
      {icon && <div className="mb-4 text-muted-foreground">{icon}</div>}
      <h3 className="text-lg font-medium text-foreground">{title}</h3>
      {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
