# 09 — Componentes Compartidos (Fase 2 COMPLETADA)

## Estado: ✅ COMPLETADA

Este documento describe **todos** los componentes compartidos, hooks, librerías y tipos del proyecto. Está diseñado para que cualquier desarrollador que entre al proyecto pueda entender qué existe, cómo se usa y dónde está.

---

## Índice

1. [Componentes UI (`components/ui/`)](#1-componentes-ui)
2. [DataTable (`components/data-table/`)](#2-datatable)
3. [Filtros (`components/filters/`)](#3-filtros)
4. [StatusBadge y CategoryBadge (`components/status-badge/`)](#4-badges-de-estado-y-categoría)
5. [Notificaciones (`components/notifications/`)](#5-notificaciones)
6. [Componentes compartidos auxiliares](#6-componentes-auxiliares)
7. [Hooks (`hooks/`)](#7-hooks)
8. [Librerías (`lib/`)](#8-librerías)
9. [Stores (`stores/`)](#9-stores)
10. [Types (`types/`)](#10-types)
11. [Layout (`app/layout/`)](#11-layout)

---

## 1. Componentes UI

Todos los componentes UI siguen el patrón **shadcn/ui**: wrappers delgados sobre primitives de Radix UI, estilados con Tailwind y la utilidad `cn()`. No contienen lógica de negocio.

### `components/ui/button.tsx`

Botón con variantes predefinidas via `class-variance-authority`.

**Props:** `variant` (default | destructive | outline | secondary | ghost | link), `size` (default | sm | lg | icon), `asChild` (usa Slot de Radix para renderizar como hijo).

```tsx
import { Button } from '@/components/ui/button'

<Button variant="default" size="sm">Guardar</Button>
<Button variant="destructive">Eliminar</Button>
<Button asChild><a href="/algo">Link</a></Button>
```

---

### `components/ui/input.tsx`

Campo de texto estándar. Extiende `React.InputHTMLAttributes`.

```tsx
import { Input } from '@/components/ui/input'

<Input placeholder="Buscar..." value={query} onChange={...} />
<Input type="email" disabled />
```

---

### `components/ui/textarea.tsx`

Área de texto. Mismo patrón que Input.

```tsx
import { Textarea } from '@/components/ui/textarea'

<Textarea placeholder="Descripción..." rows={4} />
```

---

### `components/ui/dialog.tsx`

Modal de diálogo (Radix Dialog). Composición de `Dialog`, `DialogContent`, `DialogHeader`, `DialogTitle`, `DialogDescription`, `DialogFooter`, `DialogClose`.

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título del modal</DialogTitle>
      <DialogDescription>Descripción opcional</DialogDescription>
    </DialogHeader>
    <div>Contenido del modal</div>
    <DialogFooter>
      <DialogClose asChild><Button variant="outline">Cancelar</Button></DialogClose>
      <Button>Confirmar</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

---

### `components/ui/sheet.tsx`

Panel lateral tipo drawer (Radix Dialog). Usa `side` para controlar posición: `top | bottom | left | right`.

```tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'

<Sheet>
  <SheetTrigger asChild><Button>Abrir panel</Button></SheetTrigger>
  <SheetContent side="right">
    <SheetHeader>
      <SheetTitle>Detalle</SheetTitle>
    </SheetHeader>
    <div>Contenido del drawer</div>
  </SheetContent>
</Sheet>
```

---

### `components/ui/dropdown-menu.tsx`

Menú desplegable (Radix DropdownMenu). Soporta items, checkbox items, radio items, submenús, separadores.

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuLabel } from '@/components/ui/dropdown-menu'

<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Acciones</Button></DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
    <DropdownMenuItem>Editar</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem className="text-red-500">Eliminar</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

---

### `components/ui/select.tsx`

Select/dropdown nativo (Radix Select). Soporta grupos, labels, separadores.

```tsx
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '@/components/ui/select'

<Select>
  <SelectTrigger><SelectValue placeholder="Seleccionar..." /></SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Roles</SelectLabel>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="empleado">Empleado</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

---

### `components/ui/tabs.tsx`

Pestañas (Radix Tabs). Composición de `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'

<Tabs defaultValue="dashboard">
  <TabsList>
    <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
    <TabsTrigger value="historial">Historial</TabsTrigger>
  </TabsList>
  <TabsContent value="dashboard">Contenido dashboard</TabsContent>
  <TabsContent value="historial">Contenido historial</TabsContent>
</Tabs>
```

---

### `components/ui/tooltip.tsx`

Tooltip informativo (Radix Tooltip). Requiere `TooltipProvider` en la raíz.

```tsx
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild><Button variant="ghost">?</Button></TooltipTrigger>
    <TooltipContent>Información útil</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

---

### `components/ui/avatar.tsx`

Avatar con imagen y fallback (Radix Avatar).

```tsx
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

<Avatar>
  <AvatarImage src="/foto.jpg" alt="Nombre" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
```

---

### `components/ui/label.tsx`

Label para campos de formulario (Radix Label).

```tsx
import { Label } from '@/components/ui/label'

<Label htmlFor="email">Correo electrónico</Label>
```

---

### `components/ui/separator.tsx`

Línea separadora horizontal o vertical (Radix Separator).

```tsx
import { Separator } from '@/components/ui/separator'

<Separator />
<Separator orientation="vertical" className="h-6" />
```

---

### `components/ui/badge.tsx`

Badge genérico con variantes. **No confundir** con `StatusBadge` o `CategoryBadge` que usan tokens de color específicos.

```tsx
import { Badge } from '@/components/ui/badge'

<Badge>Nuevo</Badge>
<Badge variant="secondary">Secundario</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
```

---

### `components/ui/scroll-area.tsx`

Área de scroll personalizada (Radix ScrollArea). Útil para listas largas dentro de modales o popups.

```tsx
import { ScrollArea } from '@/components/ui/scroll-area'

<ScrollArea className="h-[300px]">
  {items.map(item => <div key={item.id}>{item.name}</div>)}
</ScrollArea>
```

---

### `components/ui/switch.tsx`

Toggle switch (Radix Switch).

```tsx
import { Switch } from '@/components/ui/switch'

<Switch checked={enabled} onCheckedChange={setEnabled} />
```

---

### `components/ui/popover.tsx`

Contenido flotante anchoreado a un trigger (Radix Popover). Ideal para filtros, datepickers, etc.

```tsx
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'

<Popover>
  <PopoverTrigger asChild><Button variant="outline">Filtros</Button></PopoverTrigger>
  <PopoverContent className="w-80">
    <div>Contenido del filtro</div>
  </PopoverContent>
</Popover>
```

---

### `components/ui/breadcrumb.tsx`

Navegación de migas de pan. Composición de `Breadcrumb`, `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`, `BreadcrumbPage`, `BreadcrumbSeparator`.

```tsx
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Inicio</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Clientes</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

---

## 2. DataTable

### `components/data-table/DataTable.tsx`

Wrapper genérico de **TanStack Table v8**. Provee tabla con sorting por cabecera, paginación, selección de filas y empty state.

**Props principales:**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `columns` | `ColumnDef<TData, TValue>[]` | Definición de columnas (TanStack Table) |
| `data` | `TData[]` | Datos a mostrar |
| `pageSize` | `number` (default: 10) | Filas por página |
| `onRowClick` | `(row: TData) => void` | Callback al clickear una fila |
| `emptyMessage` | `string` | Mensaje cuando no hay datos |

**Uso típico:**

```tsx
import { DataTable, DataTableColumnHeader } from '@/components/data-table'
import type { ColumnDef } from '@tanstack/react-table'

const columns: ColumnDef<Cliente, unknown>[] = [
  {
    accessorKey: 'nombre',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre" />,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'acciones',
    cell: ({ row }) => <Button>Ver</Button>,
  },
]

<DataTable columns={columns} data={clientes} onRowClick={(row) => navigate(`/clientes/${row.id}`)} />
```

---

## 3. Filtros

### `components/filters/FilterDropdown.tsx`

Dropdown con checkboxes para filtros de múltiple selección (ej. Rol, Estado).

**Props:**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `label` | `string` | Nombre del filtro |
| `options` | `FilterOption[]` | Opciones con `label`, `value`, `checked` |
| `onFilterChange` | `(value: string, checked: boolean) => void` | Callback al cambiar |

```tsx
import { FilterDropdown } from '@/components/filters'

<FilterDropdown
  label="Estado"
  options={[
    { label: 'Pendiente', value: 'pendiente', checked: true },
    { label: 'Aprobada', value: 'aprobada', checked: false },
  ]}
  onFilterChange={(value, checked) => { ... }}
/>
```

---

### `components/filters/FilterChips.tsx`

Muestra filtros activos como chips removibles con `X`.

**Props:**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `chips` | `FilterChip[]` | Filtros activos con `id`, `label`, `value` |
| `onRemove` | `(id: string) => void` | Callback al quitar un chip |
| `onClearAll` | `() => void` | Callback para limpiar todos (opcional) |

```tsx
import { FilterChips } from '@/components/filters'

<FilterChips
  chips={[
    { id: '1', label: 'Estado: Pendiente', value: 'pendiente' },
    { id: '2', label: 'Rol: Admin', value: 'admin' },
  ]}
  onRemove={(id) => { ... }}
  onClearAll={() => { ... }}
/>
```

---

### `components/filters/FilterRangeInput.tsx`

Filtro de rango numérico o de fechas con popover.

**Props:**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `label` | `string` | Nombre del filtro |
| `type` | `'number' \| 'date'` (default: `'date'`) | Tipo de input |
| `onApply` | `(from: string, to: string) => void` | Callback al aplicar |

```tsx
import { FilterRangeInput } from '@/components/filters'

<FilterRangeInput label="Fecha" type="date" onApply={(from, to) => { ... }} />
<FilterRangeInput label="Monto" type="number" onApply={(from, to) => { ... }} />
```

---

### `components/filters/index.ts`

Exports centralizados: `FilterDropdown`, `FilterChips`, `FilterRangeInput`, `FilterOption`, `FilterChip`.

---

## 4. Badges de Estado y Categoría

### `components/status-badge/StatusBadge.tsx`

Badge que muestra el estado de una cotización/tarea usando tokens de color de `tailwind.config.ts`.

**Props:** `estado: Estado` (pendiente | borrador | enviada | aprobada | rechazada)

```tsx
import StatusBadge from '@/components/status-badge/StatusBadge'

<StatusBadge estado="aprobada" />
```

---

### `components/status-badge/CategoryBadge.tsx`

Badge para categorías de documento (perfil Cliente > tab Documentos).

**Props:** `categoria: Categoria` (cotizacion | identificacion | permiso)

```tsx
import CategoryBadge from '@/components/status-badge/CategoryBadge'

<CategoryBadge categoria="cotizacion" />
```

> **Regla de oro:** Estos badges son los ÚNICOS componentes que tocan los tokens de color de estado. Nunca usar colores de estado "a mano" en otros componentes.

---

## 5. Notificaciones

### `components/notifications/types.ts`

Define la interfaz `Notification`:

```ts
interface Notification {
  id: string
  title: string
  message: string
  read: boolean
  createdAt: string
  type?: 'info' | 'success' | 'warning' | 'error'
  link?: string
}
```

---

### `components/notifications/NotificationBell.tsx`

Campana de notificaciones con badge de contador. Al hacer clic abre un `NotificationPopup`. Se cierra automáticamente al hacer clic fuera.

**Props:**

| Prop | Tipo | Descripción |
|------|------|-------------|
| `count` | `number` | Número de notificaciones sin leer |
| `notifications` | `Notification[]` | Lista de notificaciones |
| `onMarkAsRead` | `(id: string) => void` | Marcar una como leída |
| `onMarkAllAsRead` | `() => void` | Marcar todas como leídas |

```tsx
import { NotificationBell } from '@/components/notifications'

<NotificationBell count={5} notifications={notifications} onMarkAsRead={...} />
```

---

### `components/notifications/NotificationPopup.tsx`

Popup desplegable que muestra la lista de notificaciones con scroll. Se renderiza posicionado bajo el bell.

---

### `components/notifications/NotificationModal.tsx`

Modal que muestra **todas** las notificaciones. Se controla con `open` / `onOpenChange`.

**Props:** `open`, `onOpenChange`, `notifications`, `onMarkAsRead`.

```tsx
import { NotificationModal } from '@/components/notifications'

<NotificationModal open={isOpen} onOpenChange={setIsOpen} notifications={all} />
```

---

### `components/notifications/index.ts`

Exports: `NotificationBell`, `NotificationPopup`, `NotificationModal`, tipo `Notification`.

---

## 6. Componentes Auxiliares

### `components/empty-state/EmptyState.tsx`

Estado vacío genérico con ícono, título, descripción y acción opcional.

**Props:** `icon` (ReactNode), `title` (string), `description` (string), `action` (ReactNode).

```tsx
import { EmptyState } from '@/components/empty-state'
import { FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

<EmptyState
  icon={<FileText className="h-12 w-12" />}
  title="No hay cotizaciones"
  description="Crea tu primera cotización para comenzar."
  action={<Button>Crear cotización</Button>}
/>
```

---

### `components/search-input/SearchInput.tsx`

Campo de búsqueda con ícono de lupa y botón `X` para limpiar.

**Props:** `value` (string), `onChange` (string), `placeholder` (string), `className` (string).

```tsx
import { SearchInput } from '@/components/search-input'

<SearchInput value={query} onChange={setQuery} placeholder="Buscar clientes..." />
```

---

### `components/page-header/PageHeader.tsx`

Encabezado de página con título, descripción y acciones (botones).

**Props:** `title` (string), `description` (string), `actions` (ReactNode).

```tsx
import { PageHeader } from '@/components/page-header'
import { Button } from '@/components/ui/button'

<PageHeader
  title="Clientes"
  description="Gestión de clientes del sistema"
  actions={<Button>Nuevo cliente</Button>}
/>
```

---

## 7. Hooks

### `hooks/use-debounce.ts`

Retrasa la actualización de un valor. Evita llamadas excesivas a la API al escribir en búsqueda.

**Signature:** `useDebounce<T>(value: T, delay?: number): T`

```tsx
import { useDebounce } from '@/hooks/use-debounce'

const [query, setQuery] = useState('')
const debouncedQuery = useDebounce(query, 300) // espera 300ms después del último cambio
```

---

### `hooks/use-media-query.ts`

Detecta breakpoints CSS. Útil para comportamientos responsive (ej. colapsar sidebar en tablet).

**Signature:** `useMediaQuery(query: string): boolean`

```tsx
import { useMediaQuery } from '@/hooks/use-media-query'

const isMobile = useMediaQuery('(max-width: 768px)')
const isTablet = useMediaQuery('(max-width: 1024px)')
```

---

## 8. Librerías

### `lib/utils.ts`

Utilidades generales:

| Función | Descripción | Ejemplo |
|---------|-------------|---------|
| `cn(...inputs)` | Combina clases Tailwind sin conflictos (clsx + twMerge) | `cn('px-4', isActive && 'bg-blue')` |
| `formatCurrency(amount)` | Formato MXN | `formatCurrency(1500)` → `$1,500.00` |
| `formatDate(date)` | Fecha legible es-MX | `formatDate('2024-01-15')` → `15 de enero de 2024` |
| `formatRelativeTime(date)` | Tiempo relativo | `formatRelativeTime(Date.now() - 3600000)` → `Hace 1h` |

---

### `lib/api-client.ts`

Cliente HTTP singleton. Envía `Content-Type: application/json` y `Authorization: Bearer <token>` automáticamente (token de `localStorage`).

**Métodos:** `get<T>()`, `post<T>()`, `put<T>()`, `patch<T>()`, `delete<T>()`

```tsx
import { apiClient } from '@/lib/api-client'

const clientes = await apiClient.get<Cliente[]>('/clientes')
const nuevo = await apiClient.post<Cliente>('/clientes', { nombre: 'Pemex' })
```

**Nota:** La URL base se configura con `VITE_API_URL` en `.env` (default: `http://localhost:3001/api`).

---

### `lib/permissions.ts`

Matriz de permisos por rol y módulo. Funciones utilitarias:

| Función | Descripción |
|---------|-------------|
| `tienePermiso(rol, modulo, accion)` | Verificación genérica |
| `puedeVer(rol, modulo)` | ¿Puede ver el módulo? |
| `puedeEditar(rol, modulo)` | ¿Puede editar? |
| `puedeCrear(rol, modulo)` | ¿Puede crear? |
| `puedeEliminar(rol, modulo)` | ¿Puede eliminar? |

**Módulos:** clientes, empleados, dashboard, pagos, cotizaciones, kanban, proyectos, servicios, configuracion, home.

**Acciones:** ver, editar, crear, eliminar.

> **IMPORTANTE:** Estos guards son solo UX. La validación real debe estar en el backend.

---

## 9. Stores

### `stores/session-store.ts`

Estado de autenticación (Zustand con persistencia).

- `user: User | null` — datos del usuario logueado
- `isAuthenticated: boolean`
- `login(user, token)` — guarda token en localStorage
- `logout()` — limpia token y usuario

### `stores/sidebar-store.ts`

Estado del sidebar (Zustand con persistencia).

- `collapsed: boolean` — estado actual (expandido/colapsado)
- `toggle()` — alterna el estado
- `setCollapsed(value)` — fuerza un estado

---

## 10. Types

### `types/estado.ts`

```ts
type Estado = 'pendiente' | 'borrador' | 'enviada' | 'aprobada' | 'rechazada'

const ESTADO_LABELS: Record<Estado, string> = {
  pendiente: 'Pendiente',
  borrador: 'Borrador',
  enviada: 'Enviada',
  aprobada: 'Aprobada',
  rechazada: 'Rechazada',
}
```

### `types/rol.ts`

```ts
type Rol = 'admin' | 'empleado'
```

---

## 11. Layout

### `app/layout/AppLayout.tsx`

Layout principal. Sidebar fijo a la izquierda + Header arriba + contenido con `<Outlet />`.

- Usa `useMediaQuery` para detectar tablet (≤1024px) y colapsar sidebar automáticamente.
- Transiciones CSS `transition-[margin-left]` y `transition-[width]` con `cubic-bezier(0.4, 0, 0.2, 1)`.

### `app/layout/Sidebar.tsx`

Sidebar colapsable con 9 ítems. Características:

- **Filtrado por permisos:** Solo muestra ítems que el rol del usuario puede ver.
- **Responsive:** En tablet (≤1024px) se fuerza colapsado; al navegar se auto-colapsa.
- **Accesibilidad:** `role="navigation"`, `aria-label`, `aria-expanded` en toggle.
- **Avatar:** Muestra inicial del nombre en colapsado; nombre + email expandido.

**Ítems del sidebar:**

| Ícono | Label | Path | Roles |
|-------|-------|------|-------|
| LayoutDashboard | Inicio | `/` | admin, empleado |
| FileText | Cotizaciones | `/cotizaciones` | admin, empleado |
| LayoutGrid | Kanban | `/kanban` | admin, empleado |
| Users | Clientes | `/clientes` | admin, empleado |
| UserCog | Empleados | `/empleados` | admin |
| Wrench | Servicios | `/servicios` | admin, empleado |
| BarChart3 | Dashboard | `/dashboard` | admin |
| CreditCard | Pagos | `/pagos` | admin |
| Settings | Configuración | `/configuracion` | admin, empleado |

### `app/layout/SidebarItem.tsx`

Ítem individual del sidebar. Recibe `icon`, `label`, `path`, `active`, `collapsed`. Incluye `aria-label` para accesibilidad.

### `app/layout/Header.tsx`

Header superior. Contiene título de la página, campana de notificaciones y botón de acción "Nuevo".

### `app/routes.tsx`

Rutas con protección por rol. Usa `ProtectedRoute` que redirige a `/login` si no está autenticado, o a `/` si no tiene el rol requerido.

---

## Archivos nuevos en Fase 1 (Sidebar responsive)

| Archivo | Descripción |
|---------|-------------|
| `hooks/use-media-query.ts` | Hook para detectar breakpoints CSS |

---

## Resumen de archivos creados en Fase 2

| Archivo | Categoría | Dependencia Radix |
|---------|-----------|-------------------|
| `components/ui/dialog.tsx` | UI Primitives | `@radix-ui/react-dialog` |
| `components/ui/dropdown-menu.tsx` | UI Primitives | `@radix-ui/react-dropdown-menu` |
| `components/ui/select.tsx` | UI Primitives | `@radix-ui/react-select` |
| `components/ui/tabs.tsx` | UI Primitives | `@radix-ui/react-tabs` |
| `components/ui/tooltip.tsx` | UI Primitives | `@radix-ui/react-tooltip` |
| `components/ui/avatar.tsx` | UI Primitives | `@radix-ui/react-avatar` |
| `components/ui/label.tsx` | UI Primitives | `@radix-ui/react-label` |
| `components/ui/separator.tsx` | UI Primitives | `@radix-ui/react-separator` |
| `components/ui/badge.tsx` | UI Primitives | — |
| `components/ui/scroll-area.tsx` | UI Primitives | `@radix-ui/react-scroll-area` |
| `components/ui/sheet.tsx` | UI Primitives | `@radix-ui/react-dialog` |
| `components/ui/switch.tsx` | UI Primitives | `@radix-ui/react-switch` |
| `components/ui/popover.tsx` | UI Primitives | `@radix-ui/react-popover` |
| `components/ui/textarea.tsx` | UI Primitives | — |
| `components/ui/breadcrumb.tsx` | UI Primitives | — |
| `components/data-table/DataTable.tsx` | Shared | `@tanstack/react-table` |
| `components/filters/FilterDropdown.tsx` | Shared | — |
| `components/filters/FilterChips.tsx` | Shared | — |
| `components/filters/FilterRangeInput.tsx` | Shared | — |
| `components/notifications/NotificationBell.tsx` | Shared | — |
| `components/notifications/NotificationPopup.tsx` | Shared | — |
| `components/notifications/NotificationModal.tsx` | Shared | — |
| `components/notifications/types.ts` | Shared | — |
| `components/empty-state/EmptyState.tsx` | Shared | — |
| `components/search-input/SearchInput.tsx` | Shared | — |
| `components/page-header/PageHeader.tsx` | Shared | — |

---

## Scripts disponibles

```bash
pnpm dev        # Servidor de desarrollo (puerto 3000)
pnpm build      # Build de producción (tsc + vite build)
pnpm lint       # Linting con ESLint
pnpm lint:fix   # Linting con auto-fix
pnpm format     # Formateo con Prettier
pnpm preview    # Preview del build
```
