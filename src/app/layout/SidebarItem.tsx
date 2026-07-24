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
        'flex items-center rounded-md py-2.5 text-sm font-medium transition-colors',
        collapsed ? 'justify-center px-5' : 'mx-3 justify-start gap-3 px-3',
        active
          ? 'text-sidebar-textActive bg-sidebar-active'
          : 'text-sidebar-text hover:text-sidebar-textActive hover:bg-sidebar-hover'
      )}
      title={collapsed ? label : undefined}
    >
      <Icon size={20} className="flex-shrink-0" />
      {!collapsed && <span>{label}</span>}
    </Link>
  )
}
