# 08 — Fases Pendientes

## Estado del proyecto

| Fase | Descripción | Estado |
|------|-------------|--------|
| **Fase 0** | Setup del proyecto (config, dependencias, base) | ✅ COMPLETADA |
| **Fase 1** | Base de la app (routes, layout, stores, tipos) | ✅ COMPLETADA |
| **Fase 2** | Componentes compartidos (UI, DataTable, Filtros, StatusBadge) | ✅ COMPLETADA |
| **Fase 3A** | Auth (LoginPage, api, types) | ⏳ PENDIENTE |
| **Fase 3B** | Empleados (CRUD más simple, plantilla) | ⏳ PENDIENTE |
| **Fase 3C** | Clientes (CRUD + perfil con tabs) | ⏳ PENDIENTE |
| **Fase 3D** | Servicios (CRUD catálogo) | ⏳ PENDIENTE |
| **Fase 3E** | Cotizaciones + Kanban + Proyectos (bloque interconectado) | ⏳ PENDIENTE |
| **Fase 3F** | Dashboard (solo Admin, gráficas) | ⏳ PENDIENTE |
| **Fase 3G** | Pagos (solo Admin) | ⏳ PENDIENTE |
| **Fase 3H** | Configuración | ⏳ PENDIENTE |
| **Fase 3I** | Home (contenido condicional por rol) | ⏳ PENDIENTE |
| **Fase 4** | Linting, formato, pre-commit hooks | ⏳ PENDIENTE |

---

## Orden de construcción sugerido

El orden está diseñado para minimizar retrabajo, ya que varios módulos comparten componentes base:

### 1. Base compartida (Fase 2)
Componentes UI genéricos que usan todos los CRUD:
- `components/ui/*` — Button, Input, Dialog, DropdownMenu, Select, Tabs, Badge, etc.
- `components/data-table/` — DataTable genérica con TanStack Table
- `components/filters/` — FilterDropdown, FilterChips, FilterRangeInput
- `components/status-badge/` — StatusBadge, CategoryBadge
- `components/notifications/` — NotificationBell, NotificationPopup, NotificationModal

### 2. Empleados (Fase 3B)
El CRUD más simple, sirve de **plantilla** para los demás:
- Tabla con filtros por rol y estado
- Modal de creación/editar (reutilizado para Empleados y Agentes externos)
- Perfil con tabs Dashboard/Historial

### 3. Clientes + Servicios (Fase 3C + 3D)
Reutilizan casi todo de Empleados:
- Clientes: CRUD + perfil con 4 tabs (Historial/Dashboard/Documentos/Proyectos)
- Servicios: CRUD más simple

### 4. Cotizaciones + Kanban + Proyectos (Fase 3E)
El bloque más interconnectado, mejor hacerlo junto:
- Cotizaciones: Wizard de 4 pasos + tabla + drawer de detalle
- Kanban: Tablero 5 columnas + swimlanes por proyecto
- Proyectos: CRUD + modal de creación

### 5. Dashboard + Pagos + Configuración + Home (Fases 3F-3I)
Dependen de que los datos de los módulos anteriores ya existan:
- Dashboard: Gráficas con Recharts + exportar reporte
- Pagos: Cards resumen + tabla
- Configuración: Sub-nav con secciones
- Home: Contenido condicional por rol

---

## Pendientes abiertos (no bloqueantes)

- Estructura exacta de precios por servicio
- Métrica final para "tendencia de relación con el cliente"
- Contenido final de Configuración Admin
- Si Proveedores tiene módulo propio
- Formato del reporte exportable
- Framework de backend y contrato de API
- Mecanismo de autenticación

---

## Convenciones de trabajo

- **Rama por feature:** `feature/<módulo>-<descripción>`
- **Commits:** Conventional Commits (`feat:`, `fix:`, `refactor:`)
- **Un PR por módulo** cuando sea posible
- **Siempre correr** `pnpm lint` y `pnpm build` antes de commitear
