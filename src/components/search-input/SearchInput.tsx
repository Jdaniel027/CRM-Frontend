/**
 * SearchInput — Campo de búsqueda con lupa y botón limpiar.
 *
 * Input con ícono de búsqueda a la izquierda y botón X a la derecha
 * para limpiar. Ideal para búsquedas en tablas y listas.
 *
 * @example
 * ```tsx
 * <SearchInput
 *   value={query}
 *   onChange={setQuery}
 *   placeholder="Buscar clientes..."
 * />
 * ```
 *
 * @see {@link useDebounce} para debounce de la búsqueda
 */

import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

/** Props del componente SearchInput */
interface SearchInputProps {
  /** Valor actual del campo de búsqueda */
  value: string
  /** Callback al cambiar el valor */
  onChange: (value: string) => void
  /** Placeholder del campo */
  placeholder?: string
  /** Clases adicionales de Tailwind */
  className?: string
  /** Milisegundos de debounce (no implementado aún, usar useDebounce externamente) */
  debounceMs?: number
}

/**
 * Campo de búsqueda con ícono y botón de limpiar.
 * El valor se limpia al hacer clic en X.
 */
export default function SearchInput({
  value,
  onChange,
  placeholder = 'Buscar...',
  className,
}: SearchInputProps) {
  return (
    <div className={cn('relative', className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-9 pr-9"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
