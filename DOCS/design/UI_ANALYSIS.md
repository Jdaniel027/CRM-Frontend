# Análisis del Diseño UI — CRM Gasolineras

## Resumen del Diseño

El CRM es un panel administrativo web con diseño limpio y profesional. Utiliza una paleta de colores azul-gris con acentos de color para estados. El layout sigue un patrón estándar de admin panels: sidebar fija a la izquierda, header arriba, contenido principal al centro.

---

## Paleta de Colores del Sistema

### Colores Principales
```typescript
// tailwind.config.ts
colors: {
  primary: '#5D88CD',        // Azul principal (botones, links, acciones)
  'primary-hover': '#4A75B8',
  background: '#F8F9FC',     // Fondo general
  foreground: '#1A1A2E',     // Texto principal
  border: '#E5E7EB',         // Bordes
  muted: '#F1F3F9',          // Fondo de elementos secundarios
  'muted-foreground': '#6B7280', // Texto secundario
}
```

### Colores de Sidebar
```typescript
sidebar: {
  DEFAULT: '#1E2A47',        // Fondo sidebar
  text: '#A5ADC6',           // Texto inactivo
  textActive: '#C5D7E1',     // Texto activo
  active: '#32405B',         // Fondo item activo
  hover: '#252A45',          // Fondo item hover
}
```

### Colores de Estado (Cotizaciones)
```typescript
status: {
  pendiente: { DEFAULT: '#F59E0B', text: '#78350F' },   // Amarillo
  borrador: { DEFAULT: '#6B7280', text: '#FFFFFF' },     // Gris
  enviada: { DEFAULT: '#3B82F6', text: '#FFFFFF' },      // Azul
  aprobada: { DEFAULT: '#10B981', text: '#FFFFFF' },     // Verde
  rechazada: { DEFAULT: '#EF4444', text: '#FFFFFF' },    // Rojo
}
```

### Colores de Categoría (Documentos)
```typescript
category: {
  contratos: { DEFAULT: '#3B82F6', text: '#FFFFFF' },    // Azul
  facturas: { DEFAULT: '#10B981', text: '#FFFFFF' },     // Verde
  otros: { DEFAULT: '#6B7280', text: '#FFFFFF' },         // Gris
}
```

### Colores de Proyecto (Kanban)
```typescript
project: {
  rojo: '#EF4444', naranja: '#F97316', amarillo: '#EAB308',
  verde: '#22C55E', azul: '#3B82F6', morado: '#8B5CF6',
  rosa: '#EC4899', gris: '#6B7280',
}
```

---

## Análisis por Pantalla

### 1. Login
- Formulario centrado en pantalla completa
- Campo email + password
- Botón "Ingresar" azul (primary)
- Logo/título del CRM arriba
- Fondo: background color

### 2. Home (Inicio)
- KPIs cards: Total Clientes, Cotizaciones Pendientes, Proyectos Activos, Ingreso Mensual
- Gráfica de tendencia (Recharts)
- Últimas actividades

### 3. Cotizaciones
- **Header:** PageHeader con título + botón "Nueva Cotización"
- **Filtros:** SearchInput + FilterDropdown (estado, cliente, fecha)
- **Tabla:** DataTable con columnas: Número, Cliente, Título, Estado (StatusBadge), Total, Fecha, Acciones
- **Acciones:** Ver, Editar, Enviar, Eliminar
- **Wizard:** Multi-paso (Datos → Items → Revisión → Envío)

### 4. Proyectos (Kanban)
- **Header:** PageHeader con título + filtros
- **Tablero:** Columnas por estado (Planificación → En Progreso → Completado)
- **Cards:** Nombre del proyecto, cliente, prioridad (PriorityBadge), fecha fin
- **Drag & Drop:** Mover cards entre columnas

### 5. Clientes
- **Header:** PageHeader + "Nuevo Cliente"
- **Filtros:** SearchInput + FilterDropdown (estado, tipo)
- **Tabla:** Razón Social, RIF, Tipo (Badge), Estado (StatusBadge), Responsable, Acciones
- **Perfil:** Tabs (Dashboard, Historial, Documentos)

### 6. Empleados [Admin]
- **Header:** PageHeader + "Nuevo Empleado"
- **Filtros:** SearchInput + FilterDropdown (estado, departamento)
- **Tabla:** Nombre, Email, Puesto, Departamento, Estado (StatusBadge), Acciones
- **Perfil:** Tabs (Datos, Historial, Documentos)

### 7. Servicios
- **Header:** PageHeader + "Nuevo Servicio"
- **Filtros:** SearchInput + FilterDropdown (categoría, estado)
- **Tabla:** Nombre, Categoría (Badge), Precio Base, Unidad, Estado, Acciones

### 8. Dashboard [Admin]
- **KPIs:** 4 cards con métricas principales
- **Gráficas:** Ingresos por mes (barras), Distribución por categoría (dona), Tendencia de cotizaciones (línea)
- **Filtros:** Selector de período

### 9. Pagos [Admin]
- **Header:** PageHeader + "Registrar Pago"
- **Filtros:** SearchInput + FilterDropdown (estado, método, fecha)
- **Tabla:** Cliente, Monto, Estado (StatusBadge), Método, Fecha, Referencia, Acciones

### 10. Configuración
- **Secciones:** Perfil de usuario, Preferencias, Notificaciones

---

## Componentes UI a Crear (Prioridad)

### Alta Prioridad (Sprint 1-2)
1. **EmpleadoForm** — Formulario RHF + Zod para crear/editar empleados
2. **EmpleadoTable** — DataTable wrapper para empleados
3. **ClienteForm** — Formulario para crear/editar clientes
4. **ClienteTable** — DataTable wrapper para clientes
5. **CotizacionWizard** — Wizard multi-paso para cotizaciones

### Media Prioridad (Sprint 3-4)
6. **ProyectoBoard** — Tablero kanban con drag-and-drop
7. **DashboardCharts** — Gráficas de Recharts
8. **PagoForm** — Formulario de registro de pagos
9. **ServicioForm** — Formulario de servicios
10. **EmpleadoPerfil** — Perfil con tabs

### Baja Prioridad (Post-MVP)
11. **CotizacionDetalle** — Vista detallada de cotización
12. **ReportesExport** — Exportar datos a PDF/Excel
13. **NotificacionesConfig** — Configurar alertas
14. **ConfiguracionGeneral** — Settings del sistema

---

## Flujo de Navegación

```
Login
  └── AppLayout (Sidebar + Header + Outlet)
       ├── / (Home)
       ├── /cotizaciones
       │   └── /cotizaciones/:id (Detalle)
       ├── /proyectos (Kanban)
       ├── /clientes
       │   └── /clientes/:id (Perfil)
       ├── /empleados [admin]
       │   └── /empleados/:id (Perfil)
       ├── /servicios
       ├── /dashboard [admin]
       ├── /pagos [admin]
       └── /configuracion
```

---

## Recomendaciones de Implementación

1. **Empezar por Empleados** — primer CRUD completo como template
2. **Usar componentes existentes** — DataTable, FilterDropdown, PageHeader, StatusBadge
3. **Formularios con RHF + Zod** — validación robusta y tipos automáticos
4. **Estados de carga** — usar Skeleton o "Cargando..." mientras se resuelven queries
5. **Empty states** — usar EmptyState cuando no hay datos
6. **Responsive** — sidebar colapsa en tablet, contenido se adapta
