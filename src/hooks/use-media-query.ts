/**
 * useMediaQuery — Hook para detectar breakpoints CSS.
 *
 * Escucha cambios en la media query y retorna `true` cuando coincide.
 * Útil para comportamientos responsive como colapsar el sidebar en tablet.
 *
 * @param query - Media query CSS (ej. `(max-width: 1024px)`)
 * @returns `true` si la media query coincide, `false` si no
 *
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isTablet = useMediaQuery('(max-width: 1024px)')
 *
 * // Forzar sidebar colapsado en tablet
 * const effectiveCollapsed = isTablet ? true : collapsed
 * ```
 *
 * @see src/app/layout/Sidebar.tsx para uso en el sidebar
 */

import { useEffect, useState } from 'react'

/**
 * Hook que detecta breakpoints CSS via window.matchMedia.
 * Se actualiza en tiempo real cuando cambia el tamaño de ventana.
 * Incluye valor inicial para evitar flash de contenido incorrecto.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches)

    setMatches(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}
