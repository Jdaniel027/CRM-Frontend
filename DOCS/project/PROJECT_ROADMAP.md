# Project Roadmap — CRM Gasolineras

## Estado Actual

| Estado | Detalle |
|--------|---------|
| **Completado** | Fase 0 (Setup), Fase 2 (Componentes compartidos) |
| **En progreso** | — |
| **Pendiente** | Fase 3 (Features), Fase 4 (Calidad) |

---

## Fases del Proyecto

### FASE 0: Setup del Proyecto ✅
**Estado:** Completada

- Scaffold Vite + React + TypeScript + Tailwind
- App shell (Sidebar, Header, Outlet)
- Rutas con ProtectedRoute y role guards
- Auth store (Zustand persist)
- RBAC permissions
- 10 feature pages placeholder
- Design tokens
- Documentación inicial (DOCS/01-09)

---

### FASE 2: Componentes Compartidos ✅
**Estado:** Completada

- 17 primitivas UI (shadcn/ui)
- DataTable con TanStack Table
- Filtros reutilizables
- Sistema de notificaciones
- EmptyState, SearchInput, PageHeader
- StatusBadge y CategoryBadge
- Hooks genéricos (use-debounce, use-media-query)
- Librerías (api-client, permissions, utils)
- Zustand stores (session, sidebar)
- Documentación JSDoc completa

---

### FASE 3: Features de Negocio
**Estado:** Pendiente — Prioridad alta

#### 3A: Auth (~1 día)
- Reemplazar login mock por API real
- Integrar con endpoint de autenticación
- Manejo de refresh tokens

#### 3B: Empleados (~3 días) — PRIMER CRUD TEMPLATE
- Types: `Empleado` interface
- API: `empleadosApi` (getAll, getById, create, update, delete)
- Components: EmpleadoTable, EmpleadoForm, EmpleadoPerfil
- Hook: `useEmpleados()`, `useCrearEmpleado()`, etc.
- Este módulo sirve de **template** para los demás

#### 3C: Clientes (~4 días)
- CRUD + perfil con tabs (Dashboard/Historial/Documentos)
- Tipos: `Cliente`, `ClienteHistorial`, `ClienteDocumento`
- Búsqueda y filtrado avanzado

#### 3D: Servicios (~2 días)
- CRUD de servicios
- Tipos: `Servicio`, `CategoriaServicio`
- Categorías y precios

#### 3E: Cotizaciones (~4 días)
- CRUD + wizard de creación (multi-paso)
- Estados de flujo: borrador → enviada → aprobada/rechazada
- Tipos: `Cotizacion`, `CotizacionItem`, `Estado`

#### 3F: Proyectos (~3 días)
- Tablero kanban con drag-and-drop
- Estados de proyecto
- Tipos: `Proyecto`, `ProyectoEstado`

#### 3G: Dashboard (~3 días)
- Gráficas de Recharts (barras, dona, línea)
- KPIs y métricas principales
- Filtros de fecha

#### 3H: Pagos (~2 días)
- Gestión de pagos
- Estados de pago
- Tipos: `Pago`, `PagoEstado`

#### 3I: Configuración (~2 días)
- Configuración general del sistema
- Perfil de usuario

---

### FASE 4: Calidad y Optimización
**Estado:** Pendiente — Prioridad media

- Migrar ESLint a flat config (`eslint.config.js`)
- Agregar Vitest + React Testing Library
- Implementar code splitting (React.lazy)
- Pre-commit hooks (Husky + lint-staged)
- Optimizar bundle (manualChunks en Vite)
- `.env.example` con variables documentadas

---

## Estimación Total

| Fase | Tiempo estimado | Estado |
|------|----------------|--------|
| Fase 0 | 2 días | ✅ |
| Fase 2 | 3 días | ✅ |
| Fase 3A (Auth) | 1 día | Pendiente |
| Fase 3B (Empleados) | 3 días | Pendiente |
| Fase 3C (Clientes) | 4 días | Pendiente |
| Fase 3D (Servicios) | 2 días | Pendiente |
| Fase 3E (Cotizaciones) | 4 días | Pendiente |
| Fase 3F (Proyectos) | 3 días | Pendiente |
| Fase 3G (Dashboard) | 3 días | Pendiente |
| Fase 3H (Pagos) | 2 días | Pendiente |
| Fase 3I (Configuración) | 2 días | Pendiente |
| Fase 4 (Calidad) | 2 días | Pendiente |
| **Total** | **~31 días** | **10/31 completados** |

---

## Orden de Implementación Recomendado

```
Auth → Empleados (template) → Clientes → Servicios
    → Cotizaciones → Proyectos → Dashboard → Pagos → Configuración
    → Calidad (optimización)
```

**Razón:** Empleados es el primer CRUD completo y sirve de template. Auth es prerrequisito para conectar con el backend. Clientes y Servicios son módulos simples antes de Cotizaciones (wizard complejo).

---

## Recursos y Referencias

- [DOCS/08-fases-pendientes.md](../business/08-fases-pendientes.md) — Detalle original de fases
- [CODING_STANDARDS.md](../guides/CODING_STANDARDS.md) — Convenciones de código
- [API.md](../api/API.md) — Contratos API por módulo
