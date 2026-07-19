/**
 * CategoryBadge — Badge de categoría de documento.
 *
 * Muestra la categoría de un documento usando tokens de color de tailwind.config.ts.
 * Se usa en el perfil de Cliente > tab Documentos.
 *
 * @example
 * ```tsx
 * <CategoryBadge categoria="cotizacion" />
 * <CategoryBadge categoria="identificacion" />
 * <CategoryBadge categoria="permiso" />
 * ```
 *
 * @see {@link StatusBadge} para estados de cotización/tarea
 * @see tailwind.config.ts para los tokens de color `category.*`
 */

import { cn } from '@/lib/utils'

/** Tipo de categoría de documento */
type Categoria = 'cotizacion' | 'identificacion' | 'permiso'

/** Props del componente CategoryBadge */
interface CategoryBadgeProps {
  /** Categoría del documento */
  categoria: Categoria
  /** Clases adicionales de Tailwind */
  className?: string
}

/** Mapeo de categoría a etiqueta legible */
const categoriaLabels: Record<Categoria, string> = {
  cotizacion: 'Cotización',
  identificacion: 'Identificación',
  permiso: 'Permiso',
}

/** Mapeo de categoría a clases de Tailwind (fondo, borde, texto) */
const categoriaStyles: Record<Categoria, string> = {
  cotizacion: 'bg-category-cotizacion-bg border-category-cotizacion-border text-category-cotizacion-text',
  identificacion: 'bg-category-identificacion-bg border-category-identificacion-border text-category-identificacion-text',
  permiso: 'bg-category-permiso-bg border-category-permiso-border text-category-permiso-text',
}

/**
 * Badge de categoría de documento.
 * Muestra la etiqueta legible de la categoría.
 */
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
