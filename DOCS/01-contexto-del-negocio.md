# 01 — Contexto del Negocio

## Qué es el negocio

Consultoría dedicada a gestionar el papeleo regulatorio de gasolineras (~250 clientes). Actualmente todo se maneja de forma manual y dispersa:

- Datos en Excel
- Cotizaciones en una sola hoja
- Comunicación con clientes por WhatsApp
- Expedientes repartidos entre personas/plataformas distintas
- Todo centralizado en una sola computadora (dificulta onboarding de nuevos empleados)

## Objetivo del sistema

Un CRM que centralice:

1. **Información de clientes** — datos de contacto, historial, estado de la relación
2. **Generación rápida de cotizaciones** — wizard de 4 pasos con campos dinámicos
3. **Control de personal** — fijo y temporal (agentes externos)
4. **Seguimiento de trámites/proyectos** — kanban con estados, agrupación por proyecto
5. **Control de pagos** — saldadas, anticipos, deudas
6. **Reportes para el contador** — dashboard financiero exportable

## Datos clave

| Dato                  | Valor                                                   |
| --------------------- | ------------------------------------------------------- |
| Clientes approx.      | ~250                                                    |
| Servicios en catálogo | ~10                                                     |
| Estados de cotización | 5 (Pendiente → Borrador → Enviada → Aprobada/Rechazada) |
| Roles del sistema     | 3 (Admin, Empleado, Agente externo)                     |
| Pantallas principales | 9 (más notificaciones como componente)                  |

## Pendientes abiertos (no bloqueantes para Fase 0)

- Estructura exacta de precios por servicio (fijo/rango/variables)
- Métrica final para "tendencia de relación con el cliente"
- Contenido final de la sección Admin dentro de Configuraciones
- Si Proveedores tiene su propio módulo o vive dentro de Pagos
- Formato exacto del reporte exportable para el contador
- Framework de backend y contrato de API
- Mecanismo de autenticación (JWT, sesión, proveedor)
