# Índice Rápido de Documentación — CRM Gasolineras

## Inicio Rápido (5 minutos)

1. Leer este índice
2. Revisar [DEVELOPMENT_SETUP.md](../setup/DEVELOPMENT_SETUP.md)
3. Revisar [CODING_STANDARDS.md](../guides/CODING_STANDARDS.md)

---

## Por Categoría

### Gestión del Proyecto
| Documento | Descripción | Tiempo |
|-----------|-------------|--------|
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Estado actual del proyecto | 5 min |
| [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md) | Roadmap y fases de desarrollo | 10 min |
| [NEXT_STEPS.md](NEXT_STEPS.md) | Próximos pasos accionables | 8 min |

### Arquitectura
| Documento | Descripción | Tiempo |
|-----------|-------------|--------|
| [FOLDER_STRUCTURE.md](../architecture/FOLDER_STRUCTURE.md) | Estructura de carpetas | 5 min |
| [COMPONENTS_ARCHITECTURE.md](../architecture/COMPONENTS_ARCHITECTURE.md) | Organización de componentes | 8 min |

### Desarrollo
| Documento | Descripción | Tiempo |
|-----------|-------------|--------|
| [CODING_STANDARDS.md](../guides/CODING_STANDARDS.md) | Estándares de código | 10 min |
| [DEVELOPMENT_SETUP.md](../setup/DEVELOPMENT_SETUP.md) | Setup del entorno | 8 min |
| [API.md](../api/API.md) | Contratos API por módulo | 20 min |
| [DEPENDENCIES.md](../DEPENDENCIES.md) | Registro de dependencias | 5 min |

### Calidad
| Documento | Descripción | Tiempo |
|-----------|-------------|--------|
| [TESTING.md](../guides/TESTING.md) | Guía de testing | 15 min |

### Equipo
| Documento | Descripción | Tiempo |
|-----------|-------------|--------|
| [TEAM_WORKFLOW.md](../team/TEAM_WORKFLOW.md) | Flujo de trabajo del equipo | 15 min |
| [GIT_WORKFLOW.md](../workflows/GIT_WORKFLOW.md) | Flujo de Git | 5 min |
| [PULL_REQUESTS.md](../workflows/PULL_REQUESTS.md) | Reglas de PRs | 3 min |

### Seguridad
| Documento | Descripción | Tiempo |
|-----------|-------------|--------|
| [SECURITY.md](../security/SECURITY.md) | Políticas de seguridad | 10 min |

---

## Por Rol

### Desarrollador Frontend (lectura obligatoria: ~2.5 horas)
1. [DEVELOPMENT_SETUP.md](../setup/DEVELOPMENT_SETUP.md) — 8 min
2. [FOLDER_STRUCTURE.md](../architecture/FOLDER_STRUCTURE.md) — 5 min
3. [CODING_STANDARDS.md](../guides/CODING_STANDARDS.md) — 10 min
4. [COMPONENTS_ARCHITECTURE.md](../architecture/COMPONENTS_ARCHITECTURE.md) — 8 min
5. [API.md](../api/API.md) — 20 min
6. [GIT_WORKFLOW.md](../workflows/GIT_WORKFLOW.md) — 5 min
7. [PULL_REQUESTS.md](../workflows/PULL_REQUESTS.md) — 3 min
8. [TESTING.md](../guides/TESTING.md) — 15 min
9. [SECURITY.md](../security/SECURITY.md) — 10 min
10. Revisar componentes compartidos en `src/components/` — 30 min

### Líder de Proyecto (lectura obligatoria: ~1.5 horas)
1. [PROJECT_STATUS.md](PROJECT_STATUS.md) — 5 min
2. [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md) — 10 min
3. [TEAM_WORKFLOW.md](../team/TEAM_WORKFLOW.md) — 15 min
4. [DEPENDENCIES.md](../DEPENDENCIES.md) — 5 min
5. [SECURITY.md](../security/SECURITY.md) — 10 min
6. [CONTRIBUTING.md](../CONTRIBUTING.md) — 5 min

---

## Por Tarea

### "Quiero empezar a codear hoy"
1. [DEVELOPMENT_SETUP.md](../setup/DEVELOPMENT_SETUP.md)
2. [CODING_STANDARDS.md](../guides/CODING_STANDARDS.md)
3. [FOLDER_STRUCTURE.md](../architecture/FOLDER_STRUCTURE.md)

### "Necesito crear un componente"
1. [COMPONENTS_ARCHITECTURE.md](../architecture/COMPONENTS_ARCHITECTURE.md)
2. [CODING_STANDARDS.md](../guides/CODING_STANDARDS.md) → sección "Componentes"

### "Necesito integrar con el backend"
1. [API.md](../api/API.md)
2. Revisar `src/lib/api-client.ts` y `src/features/<modulo>/api.ts`

### "Voy a hacer un PR"
1. [GIT_WORKFLOW.md](../workflows/GIT_WORKFLOW.md)
2. [PULL_REQUESTS.md](../workflows/PULL_REQUESTS.md)

### "Quiero entender el estado del proyecto"
1. [PROJECT_STATUS.md](PROJECT_STATUS.md)
2. [PROJECT_ROADMAP.md](PROJECT_ROADMAP.md)
3. [NEXT_STEPS.md](NEXT_STEPS.md)

---

## Plan de Lectura Recomendado (5 días)

| Día | Documentos | Tiempo |
|-----|------------|--------|
| **Día 1** | SETUP + FOLDER_STRUCTURE + CODING_STANDARDS | ~25 min |
| **Día 2** | COMPONENTS_ARCHITECTURE + API | ~30 min |
| **Día 3** | GIT_WORKFLOW + PULL_REQUESTS + TESTING | ~25 min |
| **Día 4** | SECURITY + DEPENDENCIES + TEAM_WORKFLOW | ~30 min |
| **Día 5** | PROJECT_STATUS + ROADMAP + NEXT_STEPS | ~25 min |

---

## FAQs

### ¿Dónde vivo un componente que solo usa un módulo?
En `src/features/<modulo>/components/`. Solo sube a `src/components/` si lo usan 2+ módulos.

### ¿Cómo agrego una nueva ruta?
Agregar el `Route` en `src/app/routes.tsx` y el ítem en `src/app/layout/Sidebar.tsx`.

### ¿Cómo creo un nuevo módulo feature?
Ver [FOLDER_STRUCTURE.md](../architecture/FOLDER_STRUCTURE.md) → "Crear nuevo módulo".

### ¿Qué hago si no sé qué componente usar?
Revisar `src/components/` — los componentes compartidos ya están documentados con JSDoc.

### ¿Cómo valido permisos?
Usar `puedeVer()`, `puedeEditar()`, `puedeCrear()`, `puedeEliminar()` de `src/lib/permissions.ts`.
