# Guía de Pull Requests

## Reglas Obligatorias

1. **Una tarea por PR** — No mezclar features diferentes
2. **No hacer push directo a main** — Siempre usar ramas feature
3. **1+ reviewer** antes de merge
4. **Checklist completo** antes de merge

---

## Checklist Obligatorio

- [ ] `npm run build` pasa sin errores
- [ ] No hay `console.log` innecesarios (solo debugging temporal)
- [ ] No hay errores de TypeScript (`npx tsc --noEmit`)
- [ ] No hay archivos `.env` commiteados
- [ ] El PR hace una sola cosa (una feature o un fix)
- [ ] Sigue las convenciones del proyecto (nombres, estructura)
- [ ] Está documentado si es necesario (JSDoc, cambios en DOCS/)

---

## Definition of Done

Un PR está "listo para merge" cuando:

1. ✅ Sigue las convenciones del proyecto
2. ✅ Está integrado via PR (no push directo)
3. ✅ Tiene 1+ aprobación de reviewer
4. ✅ No rompe funcionalidad existente
5. ✅ No genera deuda técnica innecesaria

---

## Formato del PR

### Título
```
feat: agregar CRUD de empleados
fix: centrar iconos sidebar colapsado
docs: actualizar API.md
```

### Descripción
```markdown
## Qué hace este PR
- Describe brevemente los cambios

## Tipo de cambio
- [ ] Feature
- [ ] Fix
- [ ] Refactor
- [ ] Docs

## Cómo se probó
- [ ] npm run build pasa
- [ ] Revisión manual en navegador
- [ ] No rompe funcionalidad existente

## Areas afectadas
- [ ] Sidebar
- [ ] Header
- [ ] Rutas
- [ ] Componentes compartidos
- [ ] Feature específica
```
