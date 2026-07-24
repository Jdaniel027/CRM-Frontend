import { useEffect } from 'react'
import {
  LayoutDashboard,
  FileText,
  LayoutGrid,
  Users,
  UserCog,
  Wrench,
  BarChart3,
  CreditCard,
  Settings,
  PanelLeft,
} from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useSidebarStore } from '@/stores/sidebar-store'
import { useSessionStore } from '@/stores/session-store'
import { useMediaQuery } from '@/hooks/use-media-query'
import { puedeVer } from '@/lib/permissions'
import SidebarItem from './SidebarItem'
import { cn } from '@/lib/utils'

const allItems = [
  { icon: LayoutDashboard, label: 'Inicio', path: '/', modulo: 'home' as const },
  { icon: FileText, label: 'Cotizaciones', path: '/cotizaciones', modulo: 'cotizaciones' as const },
  { icon: LayoutGrid, label: 'Kanban', path: '/kanban', modulo: 'kanban' as const },
  { icon: Users, label: 'Clientes', path: '/clientes', modulo: 'clientes' as const },
  { icon: UserCog, label: 'Empleados', path: '/empleados', modulo: 'empleados' as const },
  { icon: Wrench, label: 'Servicios', path: '/servicios', modulo: 'servicios' as const },
  { icon: BarChart3, label: 'Dashboard', path: '/dashboard', modulo: 'dashboard' as const },
  { icon: CreditCard, label: 'Pagos', path: '/pagos', modulo: 'pagos' as const },
  {
    icon: Settings,
    label: 'Configuración',
    path: '/configuracion',
    modulo: 'configuracion' as const,
  },
]

export default function Sidebar() {
  const { collapsed, toggle, setCollapsed } = useSidebarStore()
  const { user } = useSessionStore()
  const location = useLocation()
  const isTablet = useMediaQuery('(max-width: 1024px)')

  const effectiveCollapsed = isTablet ? true : collapsed

  const items = allItems.filter((item) => (user?.rol ? puedeVer(user.rol, item.modulo) : false))

  useEffect(() => {
    if (isTablet) {
      setCollapsed(true)
    }
  }, [location.pathname, isTablet, setCollapsed])

  return (
    <aside
      role="navigation"
      aria-label="Menú principal"
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col overflow-hidden bg-sidebar text-white transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
        effectiveCollapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      <div className={cn(
        "flex h-16 flex-shrink-0 items-center border-b border-white/10",
        effectiveCollapsed ? "justify-center px-0" : "justify-between px-4"
      )}>
        {!effectiveCollapsed && (
          <span className="whitespace-nowrap text-lg font-semibold">CRM Gasolineras</span>
        )}
        <button
          onClick={toggle}
          aria-label={effectiveCollapsed ? 'Expandir menú' : 'Colapsar menú'}
          aria-expanded={!effectiveCollapsed}
          className="text-sidebar-text rounded-md p-2 hover:bg-sidebar-hover"
        >
          <PanelLeft size={20} />
        </button>
      </div>

      <nav
        aria-label="Navegación principal"
        className="flex-1 overflow-y-auto overflow-x-hidden py-4"
      >
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={location.pathname === item.path}
            collapsed={effectiveCollapsed}
          />
        ))}
      </nav>

      <div className="flex-shrink-0 border-t border-white/10 p-4">
        {user && (
          <div
            className="flex items-center gap-3"
            title={effectiveCollapsed ? `${user.nombre} — ${user.email}` : undefined}
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-medium">
              {user.nombre.charAt(0).toUpperCase()}
            </div>
            {!effectiveCollapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium">{user.nombre}</p>
                <p className="truncate text-xs text-white/60">{user.email}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  )
}
