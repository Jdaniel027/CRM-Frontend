import { Bell, Plus } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

const pageTitles: Record<string, string> = {
  '/': 'Inicio',
  '/cotizaciones': 'Cotizaciones',
  '/proyectos': 'Proyectos',
  '/clientes': 'Clientes',
  '/empleados': 'Empleados',
  '/servicios': 'Servicios',
  '/dashboard': 'Dashboard',
  '/pagos': 'Pagos',
  '/configuracion': 'Configuración',
}

export default function Header() {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'CRM'

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-white px-6">
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>

      <div className="flex items-center gap-4">
        <button className="relative rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
          <Bell size={20} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <Button size="sm">
          <Plus size={16} className="mr-1" />
          Nuevo
        </Button>
      </div>
    </header>
  )
}
