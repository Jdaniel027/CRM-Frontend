# Próximos Pasos — CRM Gasolineras

## Resumen Ejecutivo

El proyecto tiene toda la base lista (setup + 30+ componentes compartidos). El siguiente paso es **empezar la Fase 3: Features de Negocio**, comenzando por Auth y Empleados (template CRUD).

---

## Acción Inmediata: Sprint 1

### Objetivo del Sprint
- Conectar Auth con API real (reemplazar mock)
- Crear primer CRUD completo (Empleados) como template

### Día 1: Auth + API Client
- Crear `features/auth/api.ts` con funciones de login/logout
- Crear `features/auth/types.ts` con interfaz de login response
- Modificar `LoginPage.tsx` para usar api-client real
- Test manual: login → token en localStorage → sidebar filtrado por rol

### Día 2: Empleados Types + API
- Crear `features/empleados/types.ts` con interfaz `Empleado`
- Crear `features/empleados/api.ts` con `empleadosApi` (getAll, getById, create, update, delete)
- Crear `features/empleados/hooks/useEmpleados.ts` con TanStack Query
- Crear `features/empleados/hooks/useEmpleadoMutations.ts` con mutaciones

### Día 3: Empleados Table + Filters
- Crear `features/empleados/components/EmpleadoTable.tsx` usando DataTable
- Crear `features/empleados/components/EmpleadoFilters.tsx` usando FilterDropdown
- Crear `features/empleados/components/EmpleadoSearch.tsx` usando SearchInput
- Integrar en `EmpleadosListPage.tsx`

### Día 4: Empleados Form + CRUD
- Crear `features/empleados/components/EmpleadoForm.tsx` con RHF + Zod
- Crear `features/empleados/components/EmpleadoDialog.tsx` usando Dialog
- Implementar crear, editar, eliminar con confirmación
- Integrar en `EmpleadosListPage.tsx`

### Día 5: Empleados Perfil + Review
- Crear `features/empleados/components/EmpleadoPerfil.tsx` con tabs
- Completar `EmpleadoPerfilPage.tsx`
- Code review del template completo
- Documentar patrón para replicar en otros módulos

---

## Template para Nuevos Módulos (basado en Empleados)

Cada módulo nuevo debe seguir esta estructura:

```
features/<modulo>/
├── <Modulo>ListPage.tsx          # Página principal con tabla
├── <Modulo>PerfilPage.tsx        # Página de detalle (si aplica)
├── components/
│   ├── <Modulo>Table.tsx         # DataTable wrapper
│   ├── <Modulo>Form.tsx          # Formulario RHF + Zod
│   ├── <Modulo>Dialog.tsx        # Dialog para crear/editar
│   ├── <Modulo>Filtros.tsx       # Filtros con FilterDropdown
│   ├── <Modulo>Search.tsx        # Búsqueda con SearchInput
│   └── <Modulo>EmptyState.tsx    # Estado vacío
├── hooks/
│   ├── use<Modulo>.ts            # TanStack Query (useQuery)
│   └── use<Modulo>Mutations.ts   # TanStack Query (useMutation)
├── api.ts                        # Funciones API puras
├── types.ts                      # Interfaces del dominio
└── index.ts                      # Barrel export
```

---

## Checklist de Validación (Fin de Sprint 1)

### Frontend
- [ ] Login conectado con API real
- [ ] Token se almacena y envía correctamente
- [ ] CRUD Empleados completo (crear, listar, editar, eliminar)
- [ ] DataTable con sorting y paginación
- [ ] Filtros funcionando
- [ ] Formularios validados con Zod
- [ ] TypeScript compila sin errores
- [ ] Build de producción exitoso

### Documentación
- [ ] `features/empleados/types.ts` documentado con JSDoc
- [ ] `features/empleados/api.ts` documentado con JSDoc
- [ ] Template documentado para replicar en otros módulos

---

## Bloqueadores Potenciales

| Bloqueador | Solución |
|-----------|----------|
| No hay backend aún | Usar Mock Service Worker (MSW) o JSON server para desarrollo |
| No hay diseño UI | Crear layouts básicos basados en los componentes existentes |
| Dudas de API | Definir contratos en `DOCS/api/API.md` antes de implementar |

---

## Meta de la Semana

- **Must Have:** Auth funcional + Empleados CRUD completo
- **Should Have:** Empleados Perfil con tabs
- **Nice to Have:** Documentación del template para otros módulos
