/**
 * NotificationModal — Modal con todas las notificaciones.
 *
 * Versión completa de la lista de notificaciones en un modal.
 * Muestra el conteo de no leídas en la descripción.
 *
 * @example
 * ```tsx
 * <NotificationModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 *   notifications={allNotifications}
 *   onMarkAsRead={(id) => marcarLeida(id)}
 * />
 * ```
 *
 * @see {@link NotificationBell} para la campana
 * @see {@link NotificationPopup} para el popup rápido
 */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { Notification } from './types'

/** Props del componente NotificationModal */
interface NotificationModalProps {
  /** Estado de apertura del modal */
  open: boolean
  /** Callback para cambiar el estado de apertura */
  onOpenChange: (open: boolean) => void
  /** Lista completa de notificaciones */
  notifications: Notification[]
  /** Callback al marcar una notificación como leída */
  onMarkAsRead?: (id: string) => void
}

/**
 * Modal que muestra todas las notificaciones del usuario.
 * Controlado externamente via props `open` y `onOpenChange`.
 */
export default function NotificationModal({
  open,
  onOpenChange,
  notifications,
  onMarkAsRead,
}: NotificationModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Todas las notificaciones</DialogTitle>
          <DialogDescription>
            {notifications.filter((n) => !n.read).length} sin leer
          </DialogDescription>
        </DialogHeader>
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
      </DialogContent>
    </Dialog>
  )
}
