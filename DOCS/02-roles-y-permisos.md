# 02 — Roles y Permisos

## Roles definidos

| Rol                | Descripción                                     | Acceso                                                                                                                                                        |
| ------------------ | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Admin**          | Dueña del negocio (u otro admin)                | Acceso total a todas las pantallas y acciones                                                                                                                 |
| **Empleado**       | Personal fijo                                   | Home (resumen propio), Cotizaciones (solo propias), Kanban (ve todo, mueve solo lo propio), Clientes (solo lectura), Notificaciones, Configuración (limitada) |
| **Agente externo** | Usuario temporal contratado por tiempo limitado | Mismos permisos que Empleado, pero con `fecha_fin` de contrato — el sistema debe bloquear su acceso automáticamente al llegar esa fecha                       |

## Matriz de permisos

| Módulo        | Ver             | Editar          | Crear           | Eliminar        |
| ------------- | --------------- | --------------- | --------------- | --------------- |
| Home          | Admin, Empleado | Admin, Empleado | Admin, Empleado | Admin, Empleado |
| Cotizaciones  | Admin, Empleado | Admin, Empleado | Admin, Empleado | Admin           |
| Kanban        | Admin, Empleado | Admin, Empleado | Admin, Empleado | Admin           |
| Clientes      | Admin, Empleado | Admin           | Admin           | Admin           |
| Empleados     | Admin           | Admin           | Admin           | Admin           |
| Servicios     | Admin, Empleado | Admin           | Admin           | Admin           |
| Dashboard     | Admin           | Admin           | Admin           | Admin           |
| Pagos         | Admin           | Admin           | Admin           | Admin           |
| Configuración | Admin, Empleado | Admin, Empleado | Admin, Empleado | Admin           |
| Proyectos     | Admin, Empleado | Admin           | Admin           | Admin           |

## Reglas adicionales

1. **Empleado puede ver información de todos los clientes** (solo lectura), pero solo tiene tareas/proyectos asignados de los clientes que le corresponden.
2. **Solo Admin puede crear Proyectos** y tareas asignándolas a cualquiera; Empleado puede crear tareas pero solo asignárselas a sí mismo.
3. **Solo Admin puede editar una cotización después de aprobada**; Empleado solo puede editar mientras está en estado "Borrador".
4. **Agente externo**: acceso bloqueado automáticamente al llegar `fecha_fin`.

## Implementación en código

Los permisos están centralizados en `src/lib/permissions.ts`:

```ts
import { puedeVer, puedeEditar, puedeCrear, puedeEliminar } from '@/lib/permissions'

// Uso en componentes
{puedeVer(user.rol, 'clientes') && <ClienteTable />}
{puedeEditar(user.rol, 'cotizaciones') && <Button>Editar</Button>}
```

**Nota:** Los guards de frontend son solo para UX. La validación real de permisos siempre debe repetirse en el backend.
