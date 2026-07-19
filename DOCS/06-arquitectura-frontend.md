# 06 — Arquitectura Frontend

## Stack tecnológico

| Capa | Tecnología | Por qué |
|------|------------|---------|
| Framework | **React 18 + Vite** | HMR rápido, sin SSR innecesario |
| Lenguaje | **TypeScript** | Tipado evita errores entre ~10 módulos |
| Estilos | **Tailwind CSS** | Tokens de color consistentes, Figma → código directo |
| UI base | **shadcn/ui** (Radix + Tailwind) | Modal/drawer/dropdown accesibles de fábrica |
| Íconos | **lucide-react** | Mismo set que Figma vía Iconify |
| Enrutamiento | **React Router v6** | SPA con rutas protegidas por rol |
| Estado servidor | **TanStack Query** | Cachea, revalida, maneja loading/error |
| Estado cliente | **Zustand** | UI local (sidebar, filtros) sin ceremonia Redux |
| Formularios | **React Hook Form + Zod** | Zod valida y define tipos; RHF evita rerenders |
| Gráficas | **Recharts** | Barras, dona, línea para Dashboard y perfiles |
| Tablas | **TanStack Table** | Sorting, paginación, filtrado reutilizable |
| Fechas | **date-fns** | Formateo ligero |

---

## Estructura de carpetas (por feature/módulo)

```
src/
├── app/                        # Configuración raíz
│   ├── routes.tsx              # Rutas + guards por rol
│   ├── providers.tsx           # QueryClientProvider, etc.
│   └── layout/
│       ├── AppLayout.tsx       # Sidebar + Header + <Outlet/>
│       ├── Sidebar.tsx         # 9 ítems, colapsable
│       ├── SidebarItem.tsx     # Ítem individual
│       └── Header.tsx          # Título + campana + botón "+"
│
├── features/                   # Un folder por módulo de negocio
│   ├── auth/
│   ├── home/
│   ├── cotizaciones/
│   ├── kanban/
│   ├── proyectos/
│   ├── clientes/
│   ├── empleados/
│   ├── servicios/
│   ├── dashboard/
│   ├── pagos/
│   └── configuracion/
│
├── components/                 # Compartidos entre features
│   ├── ui/                     # shadcn base (15 componentes)
│   │   ├── button.tsx          # Button con variantes (cva)
│   │   ├── input.tsx           # Input de texto
│   │   ├── textarea.tsx        # Área de texto
│   │   ├── dialog.tsx          # Modal (Radix Dialog)
│   │   ├── sheet.tsx           # Panel lateral/drawer (Radix Dialog)
│   │   ├── dropdown-menu.tsx   # Menú desplegable
│   │   ├── select.tsx          # Select nativo
│   │   ├── tabs.tsx            # Pestañas
│   │   ├── tooltip.tsx         # Tooltip informativo
│   │   ├── avatar.tsx          # Avatar con fallback
│   │   ├── label.tsx           # Label para formularios
│   │   ├── separator.tsx       # Línea separadora
│   │   ├── badge.tsx           # Badge genérico con variantes
│   │   ├── scroll-area.tsx     # Scroll personalizado
│   │   ├── switch.tsx          # Toggle switch
│   │   ├── popover.tsx         # Contenido flotante
│   │   └── breadcrumb.tsx      # Navegación migas de pan
│   ├── data-table/             # Tabla genérica (TanStack Table)
│   │   ├── DataTable.tsx       # Wrapper completo con paginación/sorting
│   │   └── index.ts
│   ├── filters/                # Filtros reutilizables
│   │   ├── FilterDropdown.tsx  # Dropdown con checkboxes
│   │   ├── FilterChips.tsx     # Chips removibles de filtros activos
│   │   ├── FilterRangeInput.tsx# Rango numérico/fecha
│   │   └── index.ts
│   ├── status-badge/           # StatusBadge + CategoryBadge
│   │   ├── StatusBadge.tsx     # Badge de estado (pendiente/aprobada/etc)
│   │   └── CategoryBadge.tsx   # Badge de categoría de documento
│   ├── notifications/          # Sistema de notificaciones
│   │   ├── NotificationBell.tsx# Campana con badge
│   │   ├── NotificationPopup.tsx# Popup de lista
│   │   ├── NotificationModal.tsx# Modal de todas
│   │   ├── types.ts           # Interfaz Notification
│   │   └── index.ts
│   ├── search-input/           # Búsqueda con lupa + X
│   │   ├── SearchInput.tsx
│   │   └── index.ts
│   ├── page-header/            # Encabezado de página
│   │   ├── PageHeader.tsx
│   │   └── index.ts
│   ├── empty-state/            # Estado vacío genérico
│   │   ├── EmptyState.tsx
│   │   └── index.ts
│   └── avatar/                 # (pendiente) AvatarStack
│
├── lib/                        # Utilidades transversales
│   ├── api-client.ts           # Instancia base de fetch
│   ├── permissions.ts          # Lógica de permisos por rol
│   └── utils.ts                # cn(), formatCurrency, formatDate
│
├── hooks/                      # Hooks genéricos
│   └── use-debounce.ts
│
├── stores/                     # Zustand stores globales
│   ├── sidebar-store.ts
│   └── session-store.ts
│
├── types/                      # Tipos compartidos
│   ├── estado.ts               # Estado union type
│   └── rol.ts                  # Rol union type
│
└── styles/
    └── globals.css             # Tailwind + tokens CSS
```

**Regla de oro:** Si un componente se usa en un solo módulo, vive dentro de `features/<módulo>/`. Solo sube a `components/` cuando lo use más de un módulo.

---

## Convenciones de nombres

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Componentes | `PascalCase.tsx` | `EmpleadoTable.tsx` |
| Hooks | `camelCase.ts` con `use` | `useEmpleados.ts` |
| Tipos/interfaces | `PascalCase` | `type Empleado = {...}` |
| API por feature | `api.ts` | `features/empleados/api.ts` |
| Carpetas multi-palabra | `kebab-case` | `status-badge/` |

---

## Reglas de trabajo con la API

1. Toda llamada pasa por `lib/api-client.ts` (instancia única con token/headers).
2. Cada feature define `api.ts` con funciones puras: `getX()`, `crearX()`, `actualizarX()`, `eliminarX()`.
3. TanStack Query envuelve esas funciones en hooks: `useEmpleados()`, `useCrearEmpleadoMutation()`.
4. **Nunca** se llama a `fetch` directo desde un componente.

---

## Convenciones de Git

- **Ramas:** `feature/<módulo>-<descripción>` (ej. `feature/empleados-crud`), `fix/<descripción>`
- **Commits:** Conventional Commits — `feat:`, `fix:`, `refactor:`, `docs:`, `style:`
- **Un PR por feature/módulo** cuando sea posible
