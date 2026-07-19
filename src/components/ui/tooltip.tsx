/**
 * Tooltip — Tooltip informativo.
 *
 * Tooltip accesible construido sobre Radix UI Tooltip.
 * Muestra información al pasar el mouse sobre un elemento.
 * Requiere TooltipProvider en la raíz de la aplicación.
 *
 * @example
 * ```tsx
 * <TooltipProvider>
 *   <Tooltip>
 *     <TooltipTrigger asChild>
 *       <Button variant="ghost">?</Button>
 *     </TooltipTrigger>
 *     <TooltipContent>Información sobre este botón</TooltipContent>
 *   </Tooltip>
 * </TooltipProvider>
 * ```
 */

import * as React from 'react'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { cn } from '@/lib/utils'

/** Provider global de tooltips (requerido en la raíz) */
const TooltipProvider = TooltipPrimitive.Provider
/** @see TooltipPrimitive.Root — Controla la visibilidad del tooltip */
const Tooltip = TooltipPrimitive.Root
/** @see TooltipPrimitive.Trigger — Elemento que activa el tooltip */
const TooltipTrigger = TooltipPrimitive.Trigger

/** Contenido del tooltip (panel flotante) */
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'z-50 overflow-hidden rounded-md border bg-white px-3 py-1.5 text-sm text-foreground shadow-md animate-in fade-in-0 zoom-in-95',
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
