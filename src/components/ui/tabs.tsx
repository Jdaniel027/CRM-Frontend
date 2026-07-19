/**
 * Tabs — Componente de pestañas.
 *
 * Pestañas accesibles construidas sobre Radix UI Tabs.
 * Permite alternar entre paneles de contenido.
 *
 * @example
 * ```tsx
 * <Tabs defaultValue="dashboard">
 *   <TabsList>
 *     <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
 *     <TabsTrigger value="historial">Historial</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="dashboard">Contenido del dashboard</TabsContent>
 *   <TabsContent value="historial">Contenido del historial</TabsContent>
 * </Tabs>
 * ```
 *
 * Uso típico: Perfiles de cliente/empleado con tabs Dashboard/Historial/Documentos.
 */

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'

/** @see TabsPrimitive.Root — Controla la pestaña activa */
const Tabs = TabsPrimitive.Root

/** Barra de pestañas (contenedor de los triggers) */
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

/** Botón trigger de cada pestaña */
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

/** Contenido del panel asociado a cada pestaña */
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
