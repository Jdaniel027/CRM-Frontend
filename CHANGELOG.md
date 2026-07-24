# Changelog

Todos los cambios notables en este proyecto serán documentados en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/),
y este proyecto adherce al [Semantic Versioning](https://semver.org/lang/es/).

## [Unreleased]

### Agregado
- Documentación técnica completa (DOCS/)
- Guía de setup de desarrollo
- Guía de estándares de código
- Contratos API por módulo
- Flujo de trabajo del equipo

### Cambiado
- Kanban renombrado a Proyectos
- Sidebar items con `mx-3` en ambos estados (colapsado/expandido)
- Header toggle centrado en modo colapsado

### Corregido
- Deprecación `baseUrl` en tsconfig.json eliminada
- Iconos del sidebar centrados correctamente en modo colapsado
- Eliminado `providers.tsx` (código muerto que causaba pantalla amarilla)

---

## [0.2.0] - 2026-07-23

### Agregado
- **Fase 2: Componentes compartidos completos**
  - 17 primitivas UI (shadcn/ui): button, input, textarea, dialog, sheet, dropdown-menu, select, tabs, tooltip, avatar, label, separator, badge, scroll-area, switch, popover, breadcrumb
  - DataTable con TanStack Table (sorting, paginación, selección)
  - Filtros reutilizables: FilterDropdown, FilterChips, FilterRangeInput
  - Sistema de notificaciones: NotificationBell, NotificationPopup, NotificationModal
  - Componentes compartidos: EmptyState, SearchInput, PageHeader
  - StatusBadge y CategoryBadge con design tokens
- Hooks genéricos: use-debounce, use-media-query
- Librerías: api-client, permissions, utils (cn, formatCurrency, formatDate, formatRelativeTime)
- Stores: session-store (Zustand persist), sidebar-store
- Documentación en código (JSDoc) para todos los archivos generados

### Cambiado
- Sidebar responsive: auto-colapsa en tablet (≤1024px)
- Header sincronizado con sidebar (transición de margin-left)
- Tailwind config: `sidebar.hover` separado de `sidebar.active`

---

## [0.1.0] - 2026-07-20

### Agregado
- **Fase 0: Setup del proyecto**
  - Scaffold: Vite + React 18 + TypeScript + Tailwind CSS
  - App shell: AppLayout, Sidebar (9 items), Header
  - Rutas: 11 rutas con ProtectedRoute y role guards
  - Auth: Zustand store con persistencia localStorage
  - Permisos: Matriz RBAC (9 módulos × 4 acciones × 2 roles)
  - 10 feature pages placeholder (Home, Cotizaciones, Proyectos, Clientes, Empleados, Servicios, Dashboard, Pagos, Configuración, Login)
  - Design tokens en tailwind.config.ts (status, category, sidebar, primary)
  - Documentación: DOCS/01-09 (contexto, roles, entidades, pantallas, diseño, arquitectura, setup, fases, componentes)

### Tecnologías
- React 18.3.1, Vite 6.0.3, TypeScript 5.6.3, Tailwind 3.4.16
- React Router DOM 6.28.0, Zustand 5.0.2, TanStack Query 5.62.0
- 15 paquetes Radix UI, Recharts 2.15.0, TanStack Table 8.20.6
- Zod 3.24.1, React Hook Form 7.54.0, date-fns 4.1.0
