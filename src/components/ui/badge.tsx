/**
 * Badge — Badge genérico con variantes.
 *
 * Badge visual con variantes de color predefinidas.
 * Para badges de ESTADO usar StatusBadge; para CATEGORÍA usar CategoryBadge.
 *
 * @example
 * ```tsx
 * <Badge>Nuevo</Badge>
 * <Badge variant="secondary">Pendiente</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Borrador</Badge>
 * ```
 *
 * @see {@link StatusBadge} para badges de estado de cotización
 * @see {@link CategoryBadge} para badges de categoría de documento
 */

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/** Definición de variantes del badge */
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        /** Badge azul primario */
        default: 'border-transparent bg-primary text-white',
        /** Badge gris secundario */
        secondary: 'border-transparent bg-muted text-foreground',
        /** Badge rojo de error */
        destructive: 'border-transparent bg-red-500 text-white',
        /** Badge con borde sin fondo */
        outline: 'text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

/** Props del componente Badge */
export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/** Componente Badge genérico */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge, badgeVariants }
