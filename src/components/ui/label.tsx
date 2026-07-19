/**
 * Label — Etiqueta para campos de formulario.
 *
 * Construido sobre Radix UI Label. Se deshabilita visualmente
 * cuando el campo asociado (peer) está disabled.
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Correo electrónico</Label>
 * <Input id="email" />
 * ```
 */

import * as React from 'react'
import * as LabelPrimitive from '@radix-ui/react-label'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
)

/** Componente Label reutilizable */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
