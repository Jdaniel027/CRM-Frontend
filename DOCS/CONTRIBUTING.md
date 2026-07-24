# Guía de Contribución — CRM Gasolineras

## Índice

- [Estructura del proyecto](./architecture/FOLDER_STRUCTURE.md)
- [Estándares de código](./guides/CODING_STANDARDS.md)
- [Dependencias](./DEPENDENCIES.md)
- [Flujo de Git](./workflows/GIT_WORKFLOW.md)
- [Pull Requests](./workflows/PULL_REQUESTS.md)
- [Troubleshooting](./troubleshooting/index.md)

## Estructura del proyecto

Cada módulo de negocio vive en `src/features/<modulo>/` con su propia estructura:
- `components/` — Componentes específicos del módulo
- `hooks/` — Hooks custom del módulo
- `api.ts` — Funciones de llamada a la API
- `types.ts` — Tipos/interfaz del dominio
- `index.ts` — Barrel export

Los componentes que se usan en más de un módulo van en `src/components/`.

## Convenciones de código

- Componentes: `PascalCase.tsx`
- Hooks: `camelCase.ts` con prefijo `use`
- Tipos: `PascalCase`
- Archivos de features: `kebab-case` para carpetas
- Usar `@/` como alias de `src/`

Ver [CODING_STANDARDS.md](./guides/CODING_STANDARDS.md) para detalles completos.

## Flujo de trabajo con Git

1. Actualizar `main`: `git checkout main && git pull`
2. Crear rama: `feature/<modulo>-<descripción>` o `fix/<descripción>`
3. Trabajar con commits descriptivos (Conventional Commits)
4. Push a la rama
5. Crear PR hacia `main`
6. Merge después de aprobación y eliminar rama

Ver [GIT_WORKFLOW.md](./workflows/GIT_WORKFLOW.md) para el flujo completo.

## Pull Requests

- **Una tarea por PR** — no mezclar features
- **Requiere 1+ reviewer** antes de merge
- **Checklist obligatorio:** TypeScript compila, no hay console.log innecesarios, no hay .env commiteado

Ver [PULL_REQUESTS.md](./workflows/PULL_REQUESTS.md) para las reglas completas.

## Comunicación del equipo

- Notificar al trabajar en archivos críticos (routes.tsx, Sidebar.tsx, etc.)
- No modificar archivos de otros sin avisar
- Resolver conflictos de merge de forma cuidadosa
- Preguntar antes de cambios grandes que afecten la arquitectura
