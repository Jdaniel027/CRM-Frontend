# Arquitectura de Componentes y Estilos

## Estructura de Componentes

```
components/
├── ui/                         # Primitivas base (shadcn/ui)
│   ├── button.tsx              # Button con variantes (cva)
│   ├── input.tsx               # Input de texto
│   ├── textarea.tsx            # Área de texto
│   ├── dialog.tsx              # Modal (Radix Dialog)
│   ├── sheet.tsx               # Panel lateral/drawer
│   ├── dropdown-menu.tsx       # Menú desplegable
│   ├── select.tsx              # Select nativo
│   ├── tabs.tsx                # Pestañas
│   ├── tooltip.tsx             # Tooltip informativo
│   ├── avatar.tsx              # Avatar con fallback
│   ├── label.tsx               # Label para formularios
│   ├── separator.tsx           # Línea separadora
│   ├── badge.tsx               # Badge genérico con variantes
│   ├── scroll-area.tsx         # Scroll personalizado
│   ├── switch.tsx              # Toggle switch
│   ├── popover.tsx             # Contenido flotante
│   └── breadcrumb.tsx          # Navegación migas de pan
│
├── data-table/                 # Tabla genérica (TanStack Table)
│   ├── DataTable.tsx           # Wrapper con paginación, sorting, selección
│   └── index.ts
│
├── filters/                    # Filtros reutilizables
│   ├── FilterDropdown.tsx      # Dropdown con checkboxes
│   ├── FilterChips.tsx         # Chips removibles de filtros activos
│   ├── FilterRangeInput.tsx    # Rango numérico/fecha
│   └── index.ts
│
├── notifications/              # Sistema de notificaciones
│   ├── NotificationBell.tsx    # Campana con badge
│   ├── NotificationPopup.tsx   # Popup de lista
│   ├── NotificationModal.tsx   # Modal de todas
│   ├── types.ts               # Interfaz Notification
│   └── index.ts
│
├── status-badge/               # Badges de estado
│   ├── StatusBadge.tsx         # Badge de estado (pendiente/aprobada/etc)
│   └── CategoryBadge.tsx       # Badge de categoría de documento
│
├── search-input/               # Búsqueda
│   ├── SearchInput.tsx         # Campo con lupa + botón X
│   └── index.ts
│
├── page-header/                # Encabezado
│   ├── PageHeader.tsx          # Título + subtítulo + acciones
│   └── index.ts
│
└── empty-state/                # Estado vacío
    ├── EmptyState.tsx          # Ilustración + mensaje + acción
    └── index.ts
```

---

## Convención para Componentes UI

### Componentes Simples (1 archivo)
Un componente simple vive en un solo archivo `.tsx`:

```tsx
// components/ui/badge.tsx
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
    },
  },
  defaultVariants: { variant: 'default' },
})

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />
}
```

### Componentes Complejos (carpeta)
Un componente complejo tiene su propia carpeta:

```
components/data-table/
├── DataTable.tsx         # Componente principal
├── DataTableColumnHeader.tsx  # Sub-componente
└── index.ts              # Barrel export
```

---

## Convención de Estilos

### Tailwind CSS (principal)
Todos los estilos usan Tailwind CSS utility classes:

```tsx
<div className="flex items-center gap-4 rounded-lg border bg-white p-6 shadow-sm">
  <h2 className="text-xl font-semibold text-foreground">Título</h2>
</div>
```

### Design Tokens (colores)
Los colores se definen en `tailwind.config.ts` y se usan como clases:

```tsx
// Colores de sidebar
className="bg-sidebar text-sidebar-text"

// Colores de status
className="bg-status-pendiente text-status-pendiente-text"

// Colores de primary
className="bg-primary text-primary-foreground"
```

### cn() Utility
Para combinar clases condicionalmente:

```tsx
import { cn } from '@/lib/utils'

className={cn(
  'base-classes',
  condition && 'conditional-classes',
  variant === 'active' ? 'active-classes' : 'inactive-classes'
)}
```

---

## Patrón de Componente Feature

Cada feature sigue un patrón consistente:

```tsx
// features/empleados/components/EmpleadoTable.tsx
import { DataTable } from '@/components/data-table'
import { useEmpleados } from '../hooks/useEmpleados'
import { columns } from './columns'

export function EmpleadoTable() {
  const { data: empleados, isLoading } = useEmpleados()

  if (isLoading) return <div>Cargando...</div>

  return <DataTable columns={columns} data={empleados ?? []} />
}
```

---

## Accesibilidad

- Todos los componentes shadcn/ui son accesibles por defecto (Radix UI)
- Usar `aria-label` en botones e iconos interactivos
- Usar `role` cuando sea necesario
- Usar `title` para tooltips nativos
- Respetar el orden de tabulación (tabIndex)
