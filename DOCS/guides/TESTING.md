# Guía de Testing — CRM Gasolineras

## Filosofía de Testing

El testing en este proyecto sigue la pirámide de testing:

```
        /  E2E  \          (10%)
       / Integración \     (25%)
      /    Unitarios    \   (65%)
```

### Principios Fundamentales
1. **Testear comportamiento, no implementación** — qué hace, no cómo
2. **TestsIndependientes** — cada test funciona sin dependencias de otros
3. **Tests reproducibles** — mismos resultados cada vez
4. **Tests rápidos** — los unitarios < 50ms, integración < 500ms
5. **Naming descriptivo** — el nombre del test explica qué verifica
6. **Co-ubicación** — los tests viven junto al código que testean

---

## Setup del Entorno

### Dependencias Necesarias
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom
```

### Configuración de Vitest
```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['node_modules/', 'src/test/'],
    },
  },
})
```

### Setup File
```typescript
// src/test/setup.ts
import '@testing-library/jest-dom'
```

### Scripts
```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage",
  "test:ui": "vitest --ui"
}
```

---

## Estructura de Tests

### Ubicación de Archivos
```
src/
├── features/
│   └── empleados/
│       ├── components/
│       │   ├── EmpleadoTable.tsx
│       │   └── EmpleadoTable.test.tsx    # Test junto al componente
│       ├── hooks/
│       │   ├── useEmpleados.ts
│       │   └── useEmpleados.test.ts      # Test junto al hook
│       └── api.ts
│           └── api.test.ts               # Test junto a la utilidad
├── lib/
│   ├── utils.ts
│   │   └── utils.test.ts
│   └── permissions.ts
│       └── permissions.test.ts
└── test/
    ├── setup.ts
    └── mocks/
        └── handlers.ts                   # Mock Service Worker
```

### Naming de Archivos
- `Componente.test.tsx` — para componentes
- `useHook.test.ts` — para hooks
- `utilidad.test.ts` — para utilidades
- `api.test.ts` — para funciones API

### Anatomy de un Test
```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EmpleadoTable } from './EmpleadoTable'

describe('EmpleadoTable', () => {
  // Setup antes de cada test
  beforeEach(() => {
    // Mock de datos, servicios, etc.
  })

  it('debería renderizar la tabla con empleados', () => {
    // Arrange (preparar)
    const empleados = [{ id: '1', nombre: 'Juan', email: 'juan@test.com' }]
    
    // Act (ejecutar)
    render(<EmpleadoTable data={empleados} />)
    
    // Assert (verificar)
    expect(screen.getByText('Juan')).toBeInTheDocument()
  })

  it('debería mostrar loading cuando está cargando', () => {
    render(<EmpleadoTable isLoading={true} />)
    expect(screen.getByText('Cargando...')).toBeInTheDocument()
  })

  it('debería mostrar empty state cuando no hay datos', () => {
    render(<EmpleadoTable data={[]} />)
    expect(screen.getByText('No hay empleados')).toBeInTheDocument()
  })
})
```

---

## Tipos de Tests y Ejemplos

### 1. Test de Utilidad (Unit)
```typescript
// lib/utils.test.ts
import { formatCurrency, formatDate } from './utils'

describe('formatCurrency', () => {
  it('debería formatear números como moneda', () => {
    expect(formatCurrency(1500)).toBe('$1.500,00')
  })

  it('debería manejar cero', () => {
    expect(formatCurrency(0)).toBe('$0,00')
  })

  it('debería manejar negativos', () => {
    expect(formatCurrency(-500)).toBe('-$500,00')
  })
})

describe('formatDate', () => {
  it('debería formatear fechas ISO', () => {
    expect(formatDate('2026-07-23')).toBe('23 jul 2026')
  })
})
```

### 2. Test de Componente
```typescript
// components/status-badge/StatusBadge.test.tsx
import { render, screen } from '@testing-library/react'
import { StatusBadge } from './StatusBadge'

describe('StatusBadge', () => {
  it('debería mostrar el label del estado', () => {
    render(<StatusBadge status="aprobada" />)
    expect(screen.getByText('Aprobada')).toBeInTheDocument()
  })

  it('debería tener el color correcto para aprobada', () => {
    render(<StatusBadge status="aprobada" />)
    const badge = screen.getByText('Aprobada')
    expect(badge).toHaveClass('bg-status-aprobada')
  })
})
```

### 3. Test de Hook
```typescript
// hooks/use-debounce.test.ts
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './use-debounce'

describe('useDebounce', () => {
  it('debería devolver el valor inicial inmediatamente', () => {
    const { result } = renderHook(() => useDebounce('test', 500))
    expect(result.current).toBe('test')
  })

  it('debería debaunciar el valor después del delay', async () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'test', delay: 500 } }
    )

    rerender({ value: 'changed', delay: 500 })
    expect(result.current).toBe('test')

    act(() => vi.advanceTimersByTime(500))
    expect(result.current).toBe('changed')

    vi.useRealTimers()
  })
})
```

### 4. Test de Integración
```typescript
// features/empleados/components/EmpleadoList.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { EmpleadoListPage } from './EmpleadoListPage'

const createWrapper = () => {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

describe('EmpleadoListPage (integración)', () => {
  it('debería cargar y mostrar empleados', async () => {
    render(<EmpleadoListPage />, { wrapper: createWrapper() })

    // Esperar que carguen los datos
    await waitFor(() => {
      expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    })
  })

  it('debería filtrar empleados por búsqueda', async () => {
    const user = userEvent.setup()
    render(<EmpleadoListPage />, { wrapper: createWrapper() })

    await screen.findByText('Juan Pérez')

    const searchInput = screen.getByPlaceholderText('Buscar...')
    await user.type(searchInput, 'María')

    await waitFor(() => {
      expect(screen.queryByText('Juan Pérez')).not.toBeInTheDocument()
      expect(screen.getByText('María García')).toBeInTheDocument()
    })
  })
})
```

---

## Coverage Goals

| Categoría | Objetivo |
|-----------|----------|
| Statements | 80%+ |
| Branches | 75%+ |
| Functions | 80%+ |
| Lines | 80%+ |

### Estrategia por criticidad
- **Pagos/Seguridad:** 95%+
- **Lógica de negocio:** 85%+
- **Componentes UI:** 75%+
- **Configuración:** 60%+

---

## Qué Testear y Qué No

### ✅ SÍ testear
- Utilidades puras (formatCurrency, formatDate, cn)
- Lógica de permisos (puedeVer, puedeEditar)
- Formularios (validación, submit, error handling)
- Componentes con comportamiento (clicks, filtros, paginación)
- Hooks custom (useDebounce, useMediaQuery)
- Integración de componentes con datos

### ❌ NO testear
- Implementación de shadcn/ui (ya está testeado)
- Estilos CSS (se validan visualmente)
- Librerías externas (TanStack Query, Zustand)
- Tipos TypeScript (el compilador los valida)
- Configuración de Vite/Tailwind

---

## Fixtures y Mocks

### Shared Fixtures
```typescript
// test/fixtures/empleados.ts
export const mockEmpleado = {
  id: '1',
  nombre: 'Juan Pérez',
  email: 'juan@test.com',
  telefono: '0412-1234567',
  puesto: 'Gerente',
  departamento: 'Operaciones',
  estado: 'activo' as const,
  fechaIngreso: '2024-01-15',
  salario: 1500,
}

export const mockEmpleados = [mockEmpleado, { ...mockEmpleado, id: '2', nombre: 'María García' }]
```

### Mock Service Worker
```typescript
// test/mocks/handlers.ts
import { http, HttpResponse } from 'msw'

export const handlers = [
  http.get('/api/empleados', () => {
    return HttpResponse.json({
      data: mockEmpleados,
      total: 2,
      page: 1,
      limit: 10,
    })
  }),
]
```

---

## Debugging Tips

1. **screen.debug()** — Imprime el DOM actual
2. **logTestingPlaygroundURL()** — Genera URL para explorar el DOM
3. **vi.fn()** — Mock de funciones
4. **vi.spyOn()** — Espiar llamadas a funciones
5. **waitFor()** — Esperar asincronía
6. **userEvent** — Simular interacciones de usuario (mejor que fireEvent)

---

## Checklist de PR (Testing)

- [ ] Tests unitarios para utilidades nuevas
- [ ] Tests de componentes con comportamiento
- [ ] Tests de hooks custom
- [ ] Coverage no disminuye
- [ ] Todos los tests pasan (`npm run test:run`)
