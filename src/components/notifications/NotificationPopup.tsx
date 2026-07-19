/**
 * NotificationPopup — Popup desplegable de notificaciones.
 *
 * Lista de notificaciones que aparece bajo la campana.
 * Muestra notificaciones con scroll, botón "Marcar todo leído"
 * y indicador visual de no leídas (fondo celeste).
 *
 * @example
 * ```tsx
 * <NotificationPopup
 *   notifications={notifications}
 *   onMarkAsRead={(id) => marcarLeida(id)}
 *   onMarkAllAsRead={() => marcarTodasLeidas()}
 *   onClose={() => setIsOpen(false)}
 * />
 * ```
 *
 * @see {@link NotificationBell} para el trigger
 * @see {@link NotificationModal} para la vista completa en modal
 */

import { CheckCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { Notification } from './types'

/** Props del componente NotificationPopup */
interface NotificationPopupProps {
  /** Lista de notificaciones a mostrar */
  notifications: Notification[]
  /** Callback al marcar una como leída */
  onMarkAsRead?: (id: string) => void
  /** Callback para marcar todas como leídas */
  onMarkAllAsRead?: () => void
  /** Callback para cerrar el popup */
  onClose?: () => void
}

/**
 * Popup de notificaciones posicionado bajo el bell.
 * Muestra las notificaciones más recientes con scroll.
 * Las no leídas tienen fondo celeste claro.
 */
export default function NotificationPopup({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationPopupProps) {
  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-80 rounded-lg border bg-white shadow-lg">
      <div className="flex items-center justify-between border-b px-4 py-3">
        <h3 className="font-semibold">Notificaciones</h3>
        {notifications.some((n) => !n.read) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMarkAllAsRead}
            className="text-xs text-primary hover:underline"
          >
            <CheckCheck className="mr-1 h-3 w-3" />
            Marcar todo leído
          </Button>
        )}
      </div>
      <ScrollArea className="h-[400px]">
        {notifications.length === 0 ? (
          <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
            No hay notificaciones
          </div>
        ) : (
          <div className="divide-y">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'cursor-pointer px-4 py-3 transition-colors hover:bg-muted/50',
                  !notification.read && 'bg-primary-light/30'
                )}
                onClick={() => onMarkAsRead?.(notification.id)}
              >
                <p className="text-sm font-medium">{notification.title}</p>
                <p className="text-xs text-muted-foreground">{notification.message}</p>
                <p className="mt-1 text-[10px] text-muted-foreground">
                  {new Date(notification.createdAt).toLocaleDateString('es-MX')}
                </p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="border-t px-4 py-2 text-center">
        <Button variant="ghost" size="sm" className="text-xs text-primary hover:underline">
          Ver todas las notificaciones
        </Button>
      </div>
    </div>
  )
}
