/**
 * Input — Campo de texto estándar.
 *
 * Wrapper sobre <input> con estilos consistentes del CRM.
 * Soporta forwardRef para integración con react-hook-form.
 *
 * @example
 * ```tsx
 * <Input placeholder="Buscar..." value={query} onChange={...} />
 * <Input type="email" disabled />
 * ```
 */

import * as React from 'react'
import { cn } from '@/lib/utils'

/** Props del componente Input (extiende todos los atributos HTML de input) */
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Componente Input reutilizable.
 * Muestra un borde primario al hacer focus y soporta estado disabled.
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-border bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input }
