/**
 * NotificationBell — Campana de notificaciones con badge.
 *
 * Botón con ícono de campana que muestra el conteo de notificaciones sin leer.
 * Al hacer clic abre un NotificationPopup con la lista de notificaciones.
 * Se cierra automáticamente al hacer clic fuera del componente.
 *
 * @example
 * ```tsx
 * <NotificationBell
 *   count={5}
 *   notifications={notifications}
 *   onMarkAsRead={(id) => marcarLeida(id)}
 *   onMarkAllAsRead={() => marcarTodasLeidas()}
 * />
 * ```
 *
 * @see {@link NotificationPopup} para el popup desplegable
 * @see {@link NotificationModal} para el modal completo
 */

import { useState, useRef, useEffect } from 'react'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import NotificationPopup from './NotificationPopup'
import type { Notification } from './types'

/** Props del componente NotificationBell */
interface NotificationBellProps {
  /** Cantidad de notificaciones sin leer (muestra badge rojo) */
  count?: number
  /** Lista de notificaciones para mostrar en el popup */
  notifications?: Notification[]
  /** Callback al marcar una notificación como leída */
  onMarkAsRead?: (id: string) => void
  /** Callback al marcar todas como leídas */
  onMarkAllAsRead?: () => void
}

/**
 * Campana de notificaciones con popup.
 * Se renderiza en el Header de la aplicación.
 * Maneja estado de apertura/cierre y click outside.
 */
export default function NotificationBell({
  count = 0,
  notifications = [],
  onMarkAsRead,
  onMarkAllAsRead,
}: NotificationBellProps) {
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
      >
        <Bell className="h-5 w-5 text-foreground" />
        {count > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
            {count > 99 ? '99+' : count}
          </span>
        )}
      </Button>
      {isOpen && (
        <NotificationPopup
          notifications={notifications}
          onMarkAsRead={onMarkAsRead}
          onMarkAllAsRead={onMarkAllAsRead}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
