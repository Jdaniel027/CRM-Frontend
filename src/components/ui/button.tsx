/**
 * Button — Componente de botón con variantes.
 *
 * Wrapper sobre <button> siguiendo el patrón shadcn/ui.
 * Usa class-variance-authority (cva) para definir variantes visuales.
 *
 * @example
 * ```tsx
 * <Button variant="default" size="sm">Guardar</Button>
 * <Button variant="destructive">Eliminar</Button>
 * <Button asChild><a href="/inicio">Link</a></Button>
 * ```
 *
 * @see {@link buttonVariants} para las variantes disponibles
 */

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/** Definición de variantes del botón via class-variance-authority */
const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        /** Botón primario azul (color principal del CRM) */
        default: 'bg-primary text-white hover:bg-primary-hover',
        /** Botón de acción destructiva (rojo) */
        destructive: 'bg-red-500 text-white hover:bg-red-600',
        /** Botón con borde y fondo blanco */
        outline: 'border border-border bg-white hover:bg-muted text-foreground',
        /** Botón secundario con fondo gris claro */
        secondary: 'bg-muted text-foreground hover:bg-muted/80',
        /** Botón transparente que solo muestra hover */
        ghost: 'hover:bg-muted text-foreground',
        /** Botón estilo enlace de texto */
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        /** Tamaño cuadrado para botones de solo ícono */
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

/** Props del componente Button */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /**
   * Si es true, renderiza el botón como el componente hijo (Slot de Radix).
   * Útil para renderizar como <a>, <Link>, etc.
   * @default false
   */
  asChild?: boolean
}

/**
 * Componente Button reutilizable con variantes predefinidas.
 * Soporta forwardRef para ref forwarding.
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
