import { cn } from '@/lib/utils'

type Categoria = 'cotizacion' | 'identificacion' | 'permiso'

interface CategoryBadgeProps {
  categoria: Categoria
  className?: string
}

const categoriaLabels: Record<Categoria, string> = {
  cotizacion: 'Cotización',
  identificacion: 'Identificación',
  permiso: 'Permiso',
}

const categoriaStyles: Record<Categoria, string> = {
  cotizacion: 'bg-category-cotizacion-bg border-category-cotizacion-border text-category-cotizacion-text',
  identificacion: 'bg-category-identificacion-bg border-category-identificacion-border text-category-identificacion-text',
  permiso: 'bg-category-permiso-bg border-category-permiso-border text-category-permiso-text',
}

export default function CategoryBadge({ categoria, className }: CategoryBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        categoriaStyles[categoria],
        className
      )}
    >
      {categoriaLabels[categoria]}
    </span>
  )
}
