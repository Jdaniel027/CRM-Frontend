# 04 — Pantallas del Sistema

## Sidebar — 9 ítems

| #   | Ícono           | Pantalla      | Ruta             | Permisos        |
| --- | --------------- | ------------- | ---------------- | --------------- |
| 1   | LayoutDashboard | Inicio        | `/`              | Admin, Empleado |
| 2   | FileText        | Cotizaciones  | `/cotizaciones`  | Admin, Empleado |
| 3   | LayoutGrid      | Kanban        | `/kanban`        | Admin, Empleado |
| 4   | Users           | Clientes      | `/clientes`      | Admin, Empleado |
| 5   | UserCog         | Empleados     | `/empleados`     | Solo Admin      |
| 6   | Wrench          | Servicios     | `/servicios`     | Admin, Empleado |
| 7   | BarChart3       | Dashboard     | `/dashboard`     | Solo Admin      |
| 8   | CreditCard      | Pagos         | `/pagos`         | Solo Admin      |
| 9   | Settings        | Configuración | `/configuracion` | Admin, Empleado |

> Notificaciones NO tiene pantalla propia — vive como popup (campana en Header) + modal ampliado.

---

## 1. Home (`/`)

Contenido condicional por rol:

- **Admin:** Resumen general del negocio (KPIs, métricas, proyectos activos, notificaciones recientes).
- **Empleado:** "Mis tareas" agrupadas (Vencidas / Hoy / Próximas), notificaciones recientes, proyectos activos, métricas personales.

---

## 2. Cotizaciones (`/cotizaciones`)

- **Admin ve todas** las cotizaciones / **Empleado solo propias**.
- Tabla con búsqueda, filtros, ordenamiento por columna.
- Botón "+ Nueva Cotización" abre wizard de 4 pasos:
  1. **Cliente y servicio** — selección de cliente existente y servicio
  2. **Requerimientos dinámicos** — campos según el servicio seleccionado
  3. **Documentos** — carga de documentos requeridos
  4. **Vista previa + envío** — resumen, precio, confirmación
- Click en fila abre **panel lateral (drawer)** con detalle, overlay 25% oscuro.

---

## 3. Kanban (`/kanban`)

- Tablero con **5 columnas** (Pendiente, Borrador, Enviada, Aprobada, Rechazada).
- **Toggle de agrupación por Proyecto** (swimlanes con color).
- **Tab de Proyectos** con tabla propia.
- Tarjetas muestran: cliente, servicio, empleado, prioridad, chip de color de proyecto.
- Crear tarea desde el tablero.

---

## 4. Clientes (`/clientes`)

- **Admin puede editar**, Empleado solo lectura.
- CRUD con tabla, búsqueda, filtros.
- **Perfil del cliente** (`/clientes/:id`) con layout 2 columnas:
  - Bloque principal con tabs: Historial / Dashboard / Documentos / Proyectos
  - Columna fija "Detalles" a la derecha con ícono+etiqueta+valor
- **Documentos**: vista previa embebida en modal (no descarga directa).

---

## 5. Empleados (`/empleados`) — Solo Admin

- **Tabs:** Empleados / Agentes externos
- CRUD con tabla, búsqueda, filtros.
- **Perfil** (`/empleados/:id`) con tabs: Dashboard / Historial
- Agentes externos muestran columna adicional "Fecha fin".

---

## 6. Servicios (`/servicios`)

- Catálogo de ~10 servicios.
- CRUD (solo Admin puede crear/editar/eliminar).
- Cada servicio define qué campos dinámicos pide el formulario de cotización.

---

## 7. Dashboard (`/dashboard`) — Solo Admin

- **2 modos** (tabs): Negocio | Finanzas

### Negocio

- Cotizaciones por estado (gráfica de dona con paleta oficial)
- Rendimiento de empleados
- Servicios más solicitados
- Estado general del negocio
- Clientes que requieren atención

### Finanzas

- Ingresos en el tiempo (gráfica de línea)
- Ganancias vs gastos
- Ingresos por servicio
- Resumen de pagos
- Botón "Exportar Reporte" (para contador)

---

## 8. Pagos (`/pagos`) — Solo Admin

- **Cards resumen:** Saldadas / Anticipos / Deudas
- Tabla de pagos con filtros y búsqueda.
- Deudas muestran fecha esperada de pago.

---

## 9. Configuración (`/configuracion`)

- **Sub-nav con secciones:**
  - **Mi perfil** — datos personales del usuario
  - **Seguridad** — cambiar contraseña
  - **Notificaciones** — toggles por tipo de evento
  - **Admin General** (solo Admin) — datos de empresa, catálogos — pendiente de detalle final

---

## Notificaciones (Componente compartido, NO pantalla)

- **Popup** (campana en Header): últimas no leídas.
- **Modal** (click en campana): historial completo con filtros y toggle "solo no leídas".
