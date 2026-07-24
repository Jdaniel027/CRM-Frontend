# API Documentation — CRM Gasolineras

## Propósito

Este documento define los contratos API esperados entre el frontend y el backend. Cada endpoint debe ser implementado en el backend y consumido por el frontend vía `src/lib/api-client.ts`.

---

## Configuración Base

```typescript
// src/lib/api-client.ts
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Headers automáticos:
// Authorization: Bearer <token>
// Content-Type: application/json
```

---

## Endpoints por Módulo

### 1. Autenticación

#### POST /auth/login
```typescript
// Request
{
  email: string
  password: string
}

// Response 200
{
  token: string
  user: {
    id: string
    nombre: string
    email: string
    rol: 'admin' | 'empleado'
  }
}

// Error 401
{
  error: string  // "Credenciales inválidas"
}
```

#### POST /auth/logout
```typescript
// Headers: Authorization: Bearer <token>
// Response 200
{ message: string }
```

---

### 2. Empleados

#### GET /empleados
```typescript
// Query params: ?page=1&limit=10&search=&estado=activo
// Response 200
{
  data: Empleado[]
  total: number
  page: number
  limit: number
}

// Empleado type
{
  id: string
  nombre: string
  email: string
  telefono: string
  puesto: string
  departamento: string
  estado: 'activo' | 'inactivo' | 'vacaciones'
  fechaIngreso: string  // ISO date
  salario: number
}
```

#### GET /empleados/:id
```typescript
// Response 200
Empleado & {
  historial: EmpleadoHistorial[]
  documentos: EmpleadoDocumento[]
}
```

#### POST /empleados
```typescript
// Request
{
  nombre: string
  email: string
  telefono: string
  puesto: string
  departamento: string
  salario: number
}

// Response 201
Empleado
```

#### PATCH /empleados/:id
```typescript
// Request (parcial)
Partial<Empleado>

// Response 200
Empleado
```

#### DELETE /empleados/:id
```typescript
// Response 204
```

---

### 3. Clientes

#### GET /clientes
```typescript
// Query params: ?page=1&limit=10&search=&estado=activo&tipo=empresa
// Response 200
{
  data: Cliente[]
  total: number
  page: number
  limit: number
}

// Cliente type
{
  id: string
  razonSocial: string
  rif: string
  tipo: 'empresa' | 'persona'
  email: string
  telefono: string
  direccion: string
  estado: 'activo' | 'inactivo' | 'potencial'
  fechaRegistro: string
  responsable: string  // nombre del empleado asignado
}
```

#### GET /clientes/:id
```typescript
// Response 200
Cliente & {
  cotizaciones: CotizacionResumen[]
  proyectos: ProyectoResumen[]
  historial: ClienteHistorial[]
  documentos: ClienteDocumento[]
}
```

#### POST /clientes
```typescript
// Request
Omit<Cliente, 'id' | 'fechaRegistro'>

// Response 201
Cliente
```

#### PATCH /clientes/:id
```typescript
// Response 200
Cliente
```

#### DELETE /clientes/:id
```typescript
// Response 204
```

---

### 4. Cotizaciones

#### GET /cotizaciones
```typescript
// Query params: ?page=1&limit=10&estado=borrador&clienteId=&desde=&hasta=
// Response 200
{
  data: Cotizacion[]
  total: number
}

// Cotizacion type
{
  id: string
  numero: string  // "COT-2026-001"
  clienteId: string
  clienteNombre: string
  titulo: string
  descripcion: string
  estado: 'borrador' | 'enviada' | 'aprobada' | 'rechazada'
  total: number
  fechaCreacion: string
  fechaEnvio?: string
  fechaRespuesta?: string
  items: CotizacionItem[]
}

// CotizacionItem type
{
  id: string
  servicioId: string
  servicioNombre: string
  descripcion: string
  cantidad: number
  precioUnitario: number
  total: number
}
```

#### POST /cotizaciones
```typescript
// Request
Omit<Cotizacion, 'id' | 'numero' | 'fechaCreacion'>

// Response 201
Cotizacion
```

#### PATCH /cotizaciones/:id
```typescript
// Response 200
Cotizacion
```

#### POST /cotizaciones/:id/enviar
```typescript
// Response 200
Cotizacion  // estado: 'enviada'
```

#### POST /cotizaciones/:id/aprobar
```typescript
// Response 200
Cotizacion  // estado: 'aprobada'
```

#### POST /cotizaciones/:id/rechazar
```typescript
// Request
{ motivo: string }

// Response 200
Cotizacion  // estado: 'rechazada'
```

---

### 5. Proyectos

#### GET /proyectos
```typescript
// Query params: ?page=1&limit=10&estado=en_progreso&clienteId=
// Response 200
{
  data: Proyecto[]
  total: number
}

// Proyecto type
{
  id: string
  nombre: string
  clienteId: string
  clienteNombre: string
  cotizacionId?: string
  estado: 'planificacion' | 'en_progreso' | 'pausado' | 'completado' | 'cancelado'
  prioridad: 'baja' | 'media' | 'alta'
  fechaInicio: string
  fechaFinEstimada: string
  progreso: number  // 0-100
  responsable: string
}
```

#### POST /proyectos
```typescript
// Request
Omit<Proyecto, 'id' | 'progreso'>

// Response 201
Proyecto
```

#### PATCH /proyectos/:id
```typescript
// Response 200
Proyecto
```

---

### 6. Servicios

#### GET /servicios
```typescript
// Query params: ?page=1&limit=10&categoria=&estado=activo
// Response 200
{
  data: Servicio[]
  total: number
}

// Servicio type
{
  id: string
  nombre: string
  descripcion: string
  categoria: 'consultoria' | 'instalacion' | 'mantenimiento' | 'capacitacion'
  precioBase: number
  unidad: string  // "por hora", "por proyecto", "fijo"
  estado: 'activo' | 'inactivo'
}
```

#### POST /servicios
```typescript
// Response 201
Servicio
```

#### PATCH /servicios/:id
```typescript
// Response 200
Servicio
```

#### DELETE /servicios/:id
```typescript
// Response 204
```

---

### 7. Dashboard

#### GET /dashboard/kpis
```typescript
// Query params: ?periodo=mes&fecha=2026-07-01
// Response 200
{
  totalClientes: number
  clientesActivos: number
  cotizacionesPendientes: number
  cotizacionesAprobadas: number
  proyectosActivos: number
  ingresoMensual: number
  ingresoAcumulado: number
}
```

#### GET /dashboard/graficas
```typescript
// Query params: ?tipo=ingresos&periodo=trimestre
// Response 200
{
  labels: string[]
  values: number[]
}
```

---

### 8. Pagos

#### GET /pagos
```typescript
// Query params: ?page=1&limit=10&estado=pendiente&clienteId=&desde=&hasta=
// Response 200
{
  data: Pago[]
  total: number
}

// Pago type
{
  id: string
  clienteId: string
  clienteNombre: string
  cotizacionId?: string
  proyectoId?: string
  monto: number
  estado: 'pendiente' | 'procesado' | 'rechazado'
  metodo: 'transferencia' | 'efectivo' | 'tarjeta'
  fechaPago: string
  fechaRegistro: string
  referencia?: string
  notas?: string
}
```

#### POST /pagos
```typescript
// Request
Omit<Pago, 'id' | 'fechaRegistro'>

// Response 201
Pago
```

---

### 9. Notificaciones

#### GET /notificaciones
```typescript
// Response 200
Notificacion[]

// Notificacion type
{
  id: string
  titulo: string
  mensaje: string
  tipo: 'info' | 'exito' | 'advertencia' | 'error'
  leida: boolean
  fecha: string
  enlace?: string  // URL de destino
}
```

#### PATCH /notificaciones/:id/leer
```typescript
// Response 200
{ leida: true }
```

#### POST /notificaciones/leer-todas
```typescript
// Response 200
{ message: string }
```

---

## Códigos de Error

| HTTP Status | Significado | Manejo en Frontend |
|-------------|------------|-------------------|
| 200 | OK | Procesar respuesta |
| 201 | Created | Procesar respuesta |
| 204 | No Content | Éxito sin body |
| 400 | Bad Request | Mostrar error de validación |
| 401 | Unauthorized | Redirigir a login, limpiar token |
| 403 | Forbidden | Mostrar "sin permisos" |
| 404 | Not Found | Mostrar "no encontrado" |
| 422 | Unprocessable Entity | Mostrar errores de validación |
| 500 | Server Error | Mostrar "error del servidor" |

### Formato de Error
```typescript
{
  error: string         // Mensaje para el usuario
  details?: {           // Detalles de validación (opcional)
    field: string
    message: string
  }[]
}
```

---

## Notas para el Backend

1. **Paginación:** Todos los endpoints de listado usan `page` y `limit`
2. **Filtrado:** Los query params opcionales filtran resultados
3. **Búsqueda:** El parámetro `search` busca en campos de texto
4. **Fechas:** Formato ISO 8601 (`2026-07-23T00:00:00Z`)
5. **IDs:** Strings UUID v4
6. **Autenticación:** Bearer token en header `Authorization`
7. **Content-Type:** `application/json` para requests con body
