# 03 — Entidades del Dominio

## Cliente

| Campo           | Tipo   | Descripción                      |
| --------------- | ------ | -------------------------------- |
| id              | string | Identificador único              |
| nombreNegocio   | string | Nombre del negocio               |
| nombreContacto  | string | Nombre del contacto              |
| telefono        | string | Teléfono                         |
| email           | string | Email                            |
| ultimaActividad | Date   | Última actividad/servicio        |
| estadoRelacion  | enum   | Mejorando / Estable / Empeorando |

**Relaciones:** Historial de cotizaciones, Documentos, Proyectos, mini-dashboard (ganancias generadas, frecuencia).

> La métrica exacta de "tendencia de relación" está pendiente de definir con la dueña; por ahora se basa en frecuencia de solicitud de servicios.

---

## Empleado / Agente externo

| Campo       | Tipo   | Descripción                                      |
| ----------- | ------ | ------------------------------------------------ |
| id          | string | Identificador único                              |
| nombre      | string | Nombre completo                                  |
| telefono    | string | Teléfono                                         |
| email       | string | Email                                            |
| rol         | enum   | Admin / Empleado                                 |
| sueldo      | number | Sueldo                                           |
| estado      | enum   | Activo / Inactivo                                |
| fechaInicio | Date   | Solo agentes externos (autocompletada, editable) |
| fechaFin    | Date   | Solo agentes externos (obligatoria)              |

**Relaciones:** Historial de tareas/cotizaciones realizadas, mini-dashboard de rendimiento.

**Métricas provisionales** (pendientes de validar con la dueña):

- Cotizaciones realizadas
- Tiempo promedio de resolución
- Tasa de aprobación sin cambios
- Ingresos generados

---

## Servicio

| Campo                 | Tipo   | Descripción                                                            |
| --------------------- | ------ | ---------------------------------------------------------------------- |
| id                    | string | Identificador único                                                    |
| nombre                | string | Nombre del servicio                                                    |
| precioBase            | mixed  | Estructura exacta pendiente de definir (fijo/rango/tabla de variables) |
| estado                | enum   | Activo / Inactivo                                                      |
| cotizacionesGeneradas | number | Conteo de cotizaciones                                                 |

**Nota:** Cada servicio define qué campos dinámicos pide el formulario de cotización al seleccionarlo.

---

## Cotización / Tarea

Es la entidad central que conecta Cliente, Servicio, Empleado asignado, y vive tanto en el módulo de Cotizaciones como en el Kanban (mismo dato, dos vistas).

| Campo            | Tipo   | Descripción                                           |
| ---------------- | ------ | ----------------------------------------------------- |
| id               | string | Identificador único                                   |
| servicio         | ref    | Servicio asociado                                     |
| cliente          | ref    | Cliente asociado                                      |
| precio           | number | Precio de la cotización                               |
| empleadoAsignado | ref    | Empleado asignado                                     |
| creadoPor        | ref    | Quien la creó                                         |
| fechaCreacion    | Date   | Fecha de creación                                     |
| aprobadaPor      | ref?   | Quien aprobó                                          |
| fechaAprobacion  | Date?  | Fecha de aprobación                                   |
| entregaEstimada  | Date   | Fecha estimada de completado del trámite              |
| notas            | string | Notas                                                 |
| prioridad        | enum   | Baja / Media / Alta                                   |
| estado           | enum   | Pendiente / Borrador / Enviada / Aprobada / Rechazada |
| proyectoId       | ref?   | Proyecto al que pertenece (opcional)                  |

### Flujo de estados

```
Pendiente → Borrador → Enviada → [Admin decide]
                ↑                      │
                │          ┌───────────┼───────────┐
                │     Regresar    Rechazar     Confirmar
                │  (con notas,   (con notas,   (→ Aprobada)
                │   → Borrador)   estado final)
                └──────────┘
```

| Estado    | Quién edita                     | Notas del admin                |
| --------- | ------------------------------- | ------------------------------ |
| Pendiente | Nadie (sin contenido aún)       | No                             |
| Borrador  | Empleado asignado y Admin       | Sí, viene de Regresar/Rechazar |
| Enviada   | Solo Admin (toma acción)        | No                             |
| Aprobada  | Solo Admin (edición permanente) | No                             |
| Rechazada | Nadie (archivada, estado final) | Sí, explica motivo             |

---

## Proyecto

Agrupador de varias Tareas/Cotizaciones bajo un mismo Cliente.

| Campo              | Tipo   | Descripción                                              |
| ------------------ | ------ | -------------------------------------------------------- |
| id                 | string | Identificador único                                      |
| nombre             | string | Nombre del proyecto                                      |
| cliente            | ref    | Cliente (uno solo por proyecto)                          |
| color              | string | Color distintivo (set fijo de 8-10 colores predefinidos) |
| empleadosAsignados | ref[]  | Varios, uno por tarea                                    |
| estado             | enum   | Pendiente / En proceso / Completado / Cancelado          |
| progreso           | number | % de progreso                                            |
| fechaCreacion      | Date   | Fecha de creación                                        |

**Reglas:**

- El Proyecto NO es una tarjeta en el Kanban — es metadato que viaja con cada tarjeta hija (chip de color).
- Solo Admin crea Proyectos.
- Estado calculado según avance de tareas hijas, excepto Cancelado que es acción manual.

---

## Documento

Vive dentro del perfil de Cliente.

| Campo       | Tipo   | Descripción                                |
| ----------- | ------ | ------------------------------------------ |
| id          | string | Identificador único                        |
| nombre      | string | Nombre del documento                       |
| categoria   | enum   | Cotización / Identificación / Permiso      |
| subidoPor   | ref    | Quien lo subió                             |
| fechaSubida | Date   | Fecha de subida                            |
| archivo     | file   | Archivo con vista previa embebida en modal |
