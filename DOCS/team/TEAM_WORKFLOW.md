# Team Workflow — CRM Gasolineras

## Estructura del Equipo

| Rol | Responsabilidades |
|-----|-------------------|
| **Frontend Lead** | Arquitectura, componentes compartidos, code review, decisiones técnicas |
| **Backend Lead** | API design, base de datos, autenticación, endpoints |
| **Dev Frontend** | Implementación de features, formularios, tablas, UI |
| **Full-Stack Dev** | Integración frontend-backend, testing, deployment |

---

## Flujo de Trabajo Diario

### Comunicación Asíncrona
- Usar el canal de comunicación del equipo (Slack, Discord, etc.)
- Notificar al empezar a trabajar en un módulo
- Reportar bloqueadores inmediatamente

### Standup Diario (formato asíncrono)
Cada mañana, cada miembro publica:
1. **Ayer:** ¿En qué trabajé?
2. **Hoy:** ¿En qué voy a trabajar?
3. **Bloqueadores:** ¿Hay algo que me detenga?

---

## Sincronización Frontend-Backend

### Reuniones Semanales

| Día | Reunión | Duración | Objetivo |
|-----|---------|----------|----------|
| Lunes | Sprint Planning | 30 min | Definir tareas de la semana |
| Miércoles | Mid-week Sync | 15 min | Revisar progreso, resolver bloqueos |
| Viernes | Sprint Review | 30 min | Mostrar avances, retroalimentación |

### Integración Frontend-Backend

1. **Definir contrato API** antes de implementar
2. Documentar en `DOCS/api/API.md`
3. Frontend y Backend trabajan en paralelo
4. Integrar cuando ambos estén listos
5. Probar con datos reales

---

## Git Workflow

### Convención de Ramas
```
main                    ← siempre estable, protegida
├── feature/<modulo>    ← nueva funcionalidad
├── fix/<descripcion>   ← corrección de bug
└── chore/<descripcion> ← tareas de mantenimiento
```

### Convención de Commits
```
feat:     nueva funcionalidad
fix:      corrección de bug
refactor: reestructuración sin cambio de comportamiento
docs:     documentación
style:    formato de código
test:     tests
chore:    mantenimiento
```

### Flujo Diario
1. `git checkout main && git pull`
2. `git checkout -b feature/<modulo>`
3. Trabajar con commits pequeños y descriptivos
4. `git push -u origin feature/<modulo>`
5. Crear PR hacia `main`
6. Esperar 1+ aprobación
7. Merge y eliminar rama

---

## Pull Requests

### Reglas Obligatorias
- **Una tarea por PR** — no mezclar features
- **No hacer push directo a main**
- **1+ reviewer** antes de merge
- **Checklist completo** antes de merge

### Checklist
- [ ] `npm run build` pasa sin errores
- [ ] No hay `console.log` innecesarios
- [ ] No hay errores de TypeScript
- [ ] No hay `.env` commiteado
- [ ] El PR hace una sola cosa
- [ ] Sigue las convenciones del proyecto
- [ ] Está documentado si es necesario

---

## Definition of Done

Una tarea está "terminada" cuando:

1. ✅ El código funciona como se esperaba
2. ✅ TypeScript compila sin errores
3. ✅ Build de producción exitoso
4. ✅ Sigue las convenciones del proyecto
5. ✅ Está integrada via PR y aprobada
6. ✅ No rompe funcionalidad existente
7. ✅ Los archivos necesarios están documentados (JSDoc)

---

## Reporte de Bugs

### Formato de Bug Report
1. **Descripción:** ¿Qué pasó?
2. **Pasos para reproducir:** ¿Cómo llego al bug?
3. **Comportamiento esperado:** ¿Qué debería pasar?
4. **Comportamiento actual:** ¿Qué pasa realmente?
5. **Captura de pantalla:** Si es posible
6. **Severidad:** Crítica / Alta / Media / Baja

### Priorización

| Severidad | Tiempo de respuesta |
|-----------|-------------------|
| Crítica | < 24 horas |
| Alta | 3 días |
| Media | 1 semana |
| Baja | Próximo sprint |

---

## Recursos del Equipo

- **Repositorio:** [URL del repo]
- **Documentación:** `DOCS/` en el repositorio
- **Componentes:** `src/components/` (ver JSDoc en cada archivo)
- **Guías:** `DOCS/guides/` (coding standards, testing)
