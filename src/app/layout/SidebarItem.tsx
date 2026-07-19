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

export default function SidebarItem({
  icon: Icon,
  label,
  path,
  active,
  collapsed,
}: SidebarItemProps) {
  return (
    <Link
      to={path}
      aria-label={label}
      className={cn(
        'mx-3 flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
        active
          ? 'bg-sidebar-active text-sidebar-textActive'
          : 'text-sidebar-text hover:bg-sidebar-hover hover:text-sidebar-textActive'
      )}
      title={collapsed ? label : undefined}
    >
      <Icon size={20} className="flex-shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}
