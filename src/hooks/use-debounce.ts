/**
 * useDebounce — Hook para debounce de valores.
 *
 * Retrasa la actualización de un valor determinado tiempo después
 * del último cambio. Evita llamadas excesivas a la API al escribir
 * en campos de búsqueda.
 *
 * @typeParam T - Tipo del valor a debunciar
 * @param value - Valor a debunciar
 * @param delay - Milisegundos de espera (default: 300)
 * @returns El valor debounced (se actualiza después del delay)
 *
 * @example
 * ```tsx
 * const [query, setQuery] = useState('')
 * const debouncedQuery = useDebounce(query, 300)
 *
 * // debouncedQuery se actualiza 300ms después del último cambio
 * useEffect(() => {
 *   if (debouncedQuery) buscarClientes(debouncedQuery)
 * }, [debouncedQuery])
 * ```
 */

import { useState, useEffect } from 'react'

export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
