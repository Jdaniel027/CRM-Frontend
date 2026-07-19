import type { LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  path: string
  active: boolean
  collapsed: boolean
}

export default function SidebarItem({ icon: Icon, label, path, active, collapsed }: SidebarItemProps) {
  return (
    <Link
      to={path}
      className={cn(
        'flex items-center gap-3 rounded-md mx-3 px-3 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'bg-sidebar-active text-white'
          : 'text-white/70 hover:bg-sidebar-hover hover:text-white'
      )}
      title={collapsed ? label : undefined}
    >
      <Icon size={20} className="flex-shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}
