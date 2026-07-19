/**
 * Popover — Contenido flotante anchoreado.
 *
 * Panel flotante que aparece al hacer clic en un trigger.
 * Se anchorea al elemento trigger y se posiciona automáticamente.
 * Ideal para filtros, datepickers, paneles de configuración inline.
 *
 * @example
 * ```tsx
 * <Popover>
 *   <PopoverTrigger asChild>
 *     <Button variant="outline">Filtros</Button>
 *   </PopoverTrigger>
 *   <PopoverContent className="w-80">
 *     <div>Contenido del filtro aquí</div>
 *   </PopoverContent>
 * </Popover>
 * ```
 *
 * @see {@link Sheet} para paneles laterales
 * @see {@link Dialog} para modales centrados
 */

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@/lib/utils'

/** @see PopoverPrimitive.Root */
const Popover = PopoverPrimitive.Root
/** @see PopoverPrimitive.Trigger */
const PopoverTrigger = PopoverPrimitive.Trigger

/** Contenido del popover (panel flotante) */
const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-md border bg-white p-4 text-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverTrigger, PopoverContent }
