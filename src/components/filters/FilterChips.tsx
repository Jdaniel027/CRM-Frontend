/**
 * FilterChips — Filtros activos como chips removibles.
 *
 * Muestra los filtros actualmente aplicados como chips con botón X.
 * Permite quitar filtros individuales o limpiar todos de una vez.
 * Se renderiza debajo del buscador/tabla.
 *
 * @example
 * ```tsx
 * <FilterChips
 *   chips={[
 *     { id: '1', label: 'Estado: Pendiente', value: 'pendiente' },
 *     { id: '2', label: 'Rol: Admin', value: 'admin' },
 *   ]}
 *   onRemove={(id) => { /* quitar filtro * / }}
 *   onClearAll={() => { /* limpiar todos * / }}
 * />
 * ```
 *
 * @see {@link FilterDropdown} para los dropdowns que generan estos chips
 */

import { X } from 'lucide-react'

/** Chip de filtro activo */
export interface FilterChip {
  /** ID único del chip (para key y onRemove) */
  id: string
  /** Texto mostrado al usuario (ej. "Estado: Pendiente") */
  label: string
  /** Valor interno del filtro */
  value: string
}

/** Props del componente FilterChips */
interface FilterChipsProps {
  /** Lista de filtros activos */
  chips: FilterChip[]
  /** Callback al quitar un chip individual */
  onRemove: (id: string) => void
  /** Callback para limpiar todos los filtros (opcional, solo se muestra si hay >1 chip) */
  onClearAll?: () => void
}

/**
 * Componente FilterChips que muestra filtros activos.
 * No renderiza nada si no hay chips.
 */
export default function FilterChips({ chips, onRemove, onClearAll }: FilterChipsProps) {
  if (chips.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground"
        >
          {chip.label}
          <button
            onClick={() => onRemove(chip.id)}
            className="ml-1 rounded-full p-0.5 hover:bg-border"
          >
            <X className="h-3 w-3" />
          </button>
        </span>
      ))}
      {onClearAll && chips.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-xs font-medium text-primary hover:underline"
        >
          Limpiar todos
        </button>
      )}
    </div>
  )
}
