/**
 * PageHeader — Encabezado de página.
 *
 * Título de página con descripción opcional y área de acciones (botones).
 * Se usa en la parte superior de cada pantalla del CRM.
 *
 * @example
 * ```tsx
 * <PageHeader
 *   title="Clientes"
 *   description="Gestión de clientes del sistema"
 *   actions={<Button onClick={crear}>Nuevo cliente</Button>}
 * />
 * ```
 */

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

/** Props del componente PageHeader */
interface PageHeaderProps {
  /** Título principal de la página */
  title: string
  /** Descripción secundaria (opcional) */
  description?: string
  /** Área de acciones (botones) a la derecha */
  actions?: ReactNode
  /** Clases adicionales de Tailwind */
  className?: string
}

/**
 * Encabezado de página con layout flex.
 * Título a la izquierda, acciones a la derecha.
 */
export default function PageHeader({ title, description, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex items-center justify-between pb-4', className)}>
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  )
}
