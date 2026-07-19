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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { useSidebarStore } from '@/stores/sidebar-store'
import { useSessionStore } from '@/stores/session-store'
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
  { icon: Settings, label: 'Configuración', path: '/configuracion', modulo: 'configuracion' as const },
]

export default function Sidebar() {
  const { collapsed, toggle } = useSidebarStore()
  const { user } = useSessionStore()
  const location = useLocation()

  const items = allItems.filter((item) =>
    user?.rol ? puedeVer(user.rol, item.modulo) : false
  )

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col bg-sidebar text-white transition-all duration-300',
        collapsed ? 'w-[72px]' : 'w-[260px]'
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-white/10 px-4">
        {!collapsed && (
          <span className="text-lg font-semibold">CRM Gasolineras</span>
        )}
        <button
          onClick={toggle}
          className="rounded-md p-2 hover:bg-sidebar-hover"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        {items.map((item) => (
          <SidebarItem
            key={item.path}
            icon={item.icon}
            label={item.label}
            path={item.path}
            active={location.pathname === item.path}
            collapsed={collapsed}
          />
        ))}
      </nav>

      <div className="border-t border-white/10 p-4">
        {!collapsed && user && (
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium">
              {user.nombre.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user.nombre}</p>
              <p className="truncate text-xs text-white/60">{user.email}</p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}
