# Estructura del Proyecto — CRM Gasolineras

## Organización General

```
CRM-Frontend/
├── DOCS/                          # Documentación técnica
├── public/                        # Assets estáticos
├── src/
│   ├── app/                       # Configuración raíz
│   ├── features/                  # Un folder por módulo de negocio
│   ├── components/                # Compartidos entre features
│   ├── lib/                       # Utilidades transversales
│   ├── hooks/                     # Hooks genéricos
│   ├── stores/                    # Zustand stores globales
│   ├── types/                     # Tipos compartidos
│   └── index.css                  # Tailwind + tokens CSS
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Convenciones de Código

| Tipo | Formato | Ejemplo |
|------|---------|---------|
| Componentes | `PascalCase.tsx` | `EmpleadoTable.tsx` |
| Hooks | `camelCase.ts` con `use` | `useEmpleados.ts` |
| Tipos/interfaces | `PascalCase` | `type Empleado = {...}` |
| API por feature | `api.ts` | `features/empleados/api.ts` |
| Carpetas multi-palabra | `kebab-case` | `status-badge/` |

---

## Responsabilidad de Carpetas

### `src/app/`
- **routes.tsx** — Definición de rutas + guards por rol
- **layout/AppLayout.tsx** — Shell: Sidebar + Header + `<Outlet/>`
- **layout/Sidebar.tsx** — Navegación lateral (9 ítems, colapsable)
- **layout/SidebarItem.tsx** — Ítem individual del sidebar
- **layout/Header.tsx** — Barra superior (título + campana + botón)

### `src/features/`
Un folder por módulo de negocio. Cada uno sigue la misma estructura:

```
features/<modulo>/
├── <Modulo>ListPage.tsx      # Página principal
├── <Modulo>PerfilPage.tsx    # Página de detalle (si aplica)
├── components/               # Componentes del módulo
├── hooks/                    # Hooks del módulo
├── api.ts                    # Funciones API
├── types.ts                  # Interfaces del dominio
└── index.ts                  # Barrel export
```

**Regla de oro:** Si un componente se usa en un solo módulo, vive dentro de `features/<módulo>/`. Solo sube a `components/` cuando lo use más de un módulo.

### `src/components/`
Componentes compartidos entre múltiples features:

```
components/
├── ui/                     # 17 primitivas shadcn/ui
├── data-table/             # Tabla genérica (TanStack Table)
├── filters/                # Filtros reutilizables
├── notifications/          # Sistema de notificaciones
├── status-badge/           # StatusBadge + CategoryBadge
├── search-input/           # Búsqueda con lupa + X
├── page-header/            # Encabezado de página
└── empty-state/            # Estado vacío genérico
```

### `src/lib/`
Utilidades transversales:
- **api-client.ts** — Instancia base de fetch con auth
- **permissions.ts** — Lógica de permisos por rol
- **utils.ts** — `cn()`, `formatCurrency()`, `formatDate()`

### `src/hooks/`
Hooks genéricos reutilizables:
- **use-debounce.ts** — Debounce de valores
- **use-media-query.ts** — Detección de breakpoints

### `src/stores/`
Zustand stores globales:
- **session-store.ts** — Estado de autenticación (persist)
- **sidebar-store.ts** — Estado del sidebar (collapsed)

### `src/types/`
Tipos compartidos entre módulos:
- **estado.ts** — Tipo `Estado` + labels + colores
- **rol.ts** — Tipo `Rol` + labels

---

## Reglas para Crear un Nuevo Módulo

1. Crear carpeta en `src/features/<nombre-modulo>/`
2. Crear `<Modulo>ListPage.tsx` (placeholder mínimo)
3. Agregar ruta en `src/app/routes.tsx`
4. Agregar ítem en `src/app/layout/Sidebar.tsx`
5. Agregar permisos en `src/lib/permissions.ts`
6. Agregar título en `src/app/layout/Header.tsx`

```bash
# Comando rápido para crear la estructura base
mkdir -p src/features/<modulo>/components
mkdir -p src/features/<modulo>/hooks
touch src/features/<modulo>/types.ts
touch src/features/<modulo>/api.ts
touch src/features/<modulo>/index.ts
```
