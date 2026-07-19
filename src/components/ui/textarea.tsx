/**
 * Textarea — Área de texto multilínea.
 *
 * Mismo patrón que Input, con altura mínima de 80px.
 * Ideal para descripciones, notas, comentarios.
 *
 * @example
 * ```tsx
 * <Textarea placeholder="Descripción del servicio..." rows={4} />
 * ```
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

/** Props del componente Textarea */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

/** Componente Textarea reutilizable con soporte forwardRef */
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-border bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
