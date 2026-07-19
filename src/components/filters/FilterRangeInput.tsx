/**
 * FilterRangeInput — Filtro de rango numérico o de fechas.
 *
 * Popover con dos campos (Desde/Hasta) para filtrar por rango.
 * Soporta tipo `date` (input nativo de fecha) o `number`.
 *
 * @example
 * ```tsx
 * // Filtro de fechas
 * <FilterRangeInput label="Fecha" type="date" onApply={(from, to) => { ... }} />
 *
 * // Filtro de montos
 * <FilterRangeInput label="Monto" type="number" onApply={(from, to) => { ... }} />
 * ```
 *
 * @see {@link FilterDropdown} para filtros de selección múltiple
 */

import { useState } from 'react'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

/** Props del componente FilterRangeInput */
interface FilterRangeInputProps {
  /** Nombre del filtro */
  label: string
  /** Tipo de input: `'date'` (default) o `'number'` */
  type?: 'number' | 'date'
  /** Placeholder del campo "Desde" */
  fromPlaceholder?: string
  /** Placeholder del campo "Hasta" */
  toPlaceholder?: string
  /** Callback al hacer clic en "Aplicar" */
  onApply: (from: string, to: string) => void
}

/**
 * Filtro de rango con popover.
 * Mantiene estado local de los campos hasta que el usuario hace clic en "Aplicar".
 */
export default function FilterRangeInput({
  label,
  type = 'date',
  fromPlaceholder = 'Desde',
  toPlaceholder = 'Hasta',
  onApply,
}: FilterRangeInputProps) {
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <CalendarIcon className="mr-2 h-4 w-4" />
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4" align="start">
        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">{label}</p>
          <div className="flex gap-2">
            <Input
              type={type}
              placeholder={fromPlaceholder}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            <Input
              type={type}
              placeholder={toPlaceholder}
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <Button size="sm" onClick={() => onApply(from, to)}>
            Aplicar
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
