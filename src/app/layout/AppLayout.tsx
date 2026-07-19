import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'
import { useSidebarStore } from '@/stores/sidebar-store'
import { useMediaQuery } from '@/hooks/use-media-query'
import { cn } from '@/lib/utils'

export default function AppLayout() {
  const { collapsed } = useSidebarStore()
  const isTablet = useMediaQuery('(max-width: 1024px)')

  const effectiveCollapsed = isTablet ? true : collapsed

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div
        className={cn(
          'flex flex-1 flex-col transition-[margin-left] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
          effectiveCollapsed ? 'ml-[72px]' : 'ml-[260px]'
        )}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
