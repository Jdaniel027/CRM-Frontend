/**
 * FilterDropdown — Dropdown de filtros con checkboxes.
 *
 * Filtro de múltiple selección que muestra un dropdown con opciones
 * marcadas/desmarcadas. Muestra un badge con la cantidad de filtros activos.
 * Ideal para filtrar por Rol, Estado, etc.
 *
 * @example
 * ```tsx
 * <FilterDropdown
 *   label="Estado"
 *   options={[
 *     { label: 'Pendiente', value: 'pendiente', checked: true },
 *     { label: 'Aprobada', value: 'aprobada', checked: false },
 *   ]}
 *   onFilterChange={(value, checked) => { ... }}
 * />
 * ```
 *
 * @see {@link FilterChips} para mostrar los filtros activos
 * @see {@link FilterRangeInput} para filtros de rango numérico/fecha
 */

import { SlidersHorizontal, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

/** Opción individual del filtro */
export interface FilterOption {
  /** Texto mostrado al usuario */
  label: string
  /** Valor interno para filtrado */
  value: string
  /** Estado de selección */
  checked: boolean
}

/** Props del componente FilterDropdown */
interface FilterDropdownProps {
  /** Nombre del filtro (ej. "Estado", "Rol") */
  label: string
  /** Lista de opciones con su estado de selección */
  options: FilterOption[]
  /** Callback al cambiar el estado de una opción */
  onFilterChange: (value: string, checked: boolean) => void
}

/**
 * Dropdown de filtros con checkboxes y badge de cantidad activa.
 * Se integra con FilterChips para mostrar filtros aplicados.
 */
export default function FilterDropdown({ label, options, onFilterChange }: FilterDropdownProps) {
  const activeCount = options.filter((o) => o.checked).length

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          {label}
          {activeCount > 0 && (
            <span className="ml-2 rounded-full bg-primary px-1.5 py-0.5 text-xs text-white">
              {activeCount}
            </span>
          )}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>{label}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            checked={option.checked}
            onCheckedChange={(checked) => onFilterChange(option.value, checked)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
