/**
 * Notification — Interfaz de notificación del sistema.
 *
 * Define la estructura de una notificación que se muestra
 * en la campana del header, el popup y el modal.
 *
 * @example
 * ```ts
 * const notificacion: Notification = {
 *   id: '1',
 *   title: 'Cotización aprobada',
 *   message: 'La cotización #123 fue aprobada por el cliente.',
 *   read: false,
 *   createdAt: '2024-01-15T10:30:00Z',
 *   type: 'success',
 *   link: '/cotizaciones/123',
 * }
 * ```
 */

export interface Notification {
  /** ID único de la notificación */
  id: string
  /** Título breve de la notificación */
  title: string
  /** Mensaje descriptivo */
  message: string
  /** Si ya fue leída por el usuario */
  read: boolean
  /** Fecha de creación en formato ISO */
  createdAt: string
  /** Tipo visual (determina el ícono/color) */
  type?: 'info' | 'success' | 'warning' | 'error'
  /** URL de navegación al hacer clic (opcional) */
  link?: string
}
