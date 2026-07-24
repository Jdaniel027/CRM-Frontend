# Estándares de Código — CRM Gasolineras

## Formateo

- **Prettier** formatea todo el código automáticamente
- Ejecutar `npm run format` antes de commitear
- Configuración en `.prettierrc`:
  ```json
  {
    "semi": false,
    "singleQuote": true,
    "trailingComma": "es5",
    "printWidth": 100,
    "tabWidth": 2,
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```

---

## Naming Conventions

### Archivos
| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Componentes React | `PascalCase.tsx` | `EmpleadoTable.tsx` |
| Hooks | `camelCase.ts` con `use` | `useEmpleados.ts` |
| Utilidades | `camelCase.ts` | `formatCurrency.ts` |
| Tipos | `camelCase.ts` | `estado.ts` |
| API | `camelCase.ts` | `api.ts` |
| Estilos | `camelCase.css` | `globals.css` |

### Variables y Funciones
```tsx
// Components: PascalCase
function EmpleadoTable() { }

// Hooks: camelCase con use
function useEmpleados() { }

// Variables: camelCase
const isLoading = true
const empleadosList = []

// Constants: UPPER_SNAKE_CASE
const API_BASE_URL = 'http://localhost:3001/api'

// Types/Interfaces: PascalCase
type Empleado = { id: string; nombre: string }
interface EmpleadoFormValues { nombre: string }

// Functions: camelCase
function formatCurrency(amount: number) { }
function calcularTotal(items: Item[]) { }
```

---

## Componentes

### Estructura de un Componente
```tsx
/**
 * Descripción breve del componente.
 *
 * Descripción más detallada si es necesaria.
 *
 * @example
 * ```tsx
 * <Componente prop1="valor" prop2={42} />
 * ```
 */
export function Componente({ prop1, prop2, className }: ComponenteProps) {
  return (
    <div className={cn('base-classes', className)}>
      {/* contenido */}
    </div>
  )
}
```

### Reglas
1. **Una función por archivo** — no exportar múltiples componentes
2. **Props como interface** — definir `ComponenteProps` separado
3. **className como prop** — siempre aceptar className para personalización
4. **Usar cn()** — para combinar clases
5. **Export named** — `export function Componente` (no default)

---

## Hooks

### Estructura de un Hook
```tsx
/**
 * Hook para [descripción].
 *
 * @param param1 - Descripción del parámetro
 * @returns Descripción del retorno
 *
 * @example
 * ```tsx
 * const { data, isLoading } = useMiHook(param1)
 * ```
 */
export function useMiHook(param1: string) {
  // lógica
  return { data, isLoading }
}
```

---

## Formularios

### Patrón con RHF + Zod
```tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  email: z.string().email('Email inválido'),
})

type FormValues = z.infer<typeof schema>

function MiFormulario() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* campos */}
    </form>
  )
}
```

---

## API Calls

### Patrón con TanStack Query
```tsx
// api.ts — Funciones puras
export async function getEmpleados(): Promise<Empleado[]> {
  const response = await apiClient.get('/empleados')
  return response.json()
}

// hooks/useEmpleados.ts — Hook con Query
import { useQuery } from '@tanstack/react-query'
import { getEmpleados } from '../api'

export function useEmpleados() {
  return useQuery({
    queryKey: ['empleados'],
    queryFn: getEmpleados,
  })
}

// hooks/useEmpleadoMutations.ts — Mutaciones
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { crearEmpleado } from '../api'

export function useCrearEmpleado() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: crearEmpleado,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['empleados'] })
    },
  })
}
```

### Reglas
1. **Nunca** llamar a `fetch()` directo desde componentes
2. **Siempre** usar `api-client.ts` para llamadas HTTP
3. **Siempre** usar TanStack Query para estado del servidor
4. **Siempre** invalidar queries en mutaciones exitosas

---

## Seguridad

1. **Nunca** loguear datos sensibles (tokens, passwords, emails)
2. **Nunca** commitear `.env`
3. **Siempre** validar formularios con Zod antes de enviar
4. **Siempre** usar el api-client para llamadas HTTP
5. Los permisos del frontend son solo UX — la validación real es en backend

---

## Tamaño de Archivos

| Tipo | Máximo recomendado |
|------|-------------------|
| Componentes | ~200 líneas |
| Hooks | ~100 líneas |
| Utilidades | ~80 líneas |
| Archivos de types | ~100 líneas |

Si un archivo supera el máximo, considerar:
- Extraer sub-componentes
- Extraer hooks custom
- Separar en módulos más pequeños

---

## Anti-Patrones a Evitar

❌ **No hacer esto:**
```tsx
// No usar fetch directo
const response = await fetch('/api/empleados')

// No loguear datos sensibles
console.log(user.token)

// No hardcodear colores
className="bg-[#5D88CD]"

// No usar any
function处理datos(data: any) { }

// No poner lógica en componentes
function EmpleadoPage() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('/api/empleados').then(r => r.json()).then(setData)
  }, [])
  // ...
}
```

✅ **Hacer esto:**
```tsx
// Usar api-client
const empleados = await empleadosApi.getAll()

// Usar design tokens
className="bg-primary"

// Tipar todo
function procesarDatos(data: Empleado[]) { }

// Usar TanStack Query
const { data: empleados, isLoading } = useEmpleados()
```
