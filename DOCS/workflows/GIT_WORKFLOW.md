# GitHub Flow — Guía de Trabajo

## Convención de Commits

| Tipo | Uso | Ejemplo |
|------|-----|---------|
| `feat` | Nueva funcionalidad | `feat: agregar tabla de empleados` |
| `fix` | Corrección de bug | `fix: centrar iconos sidebar colapsado` |
| `refactor` | Reestructurar sin cambiar comportamiento | `refactor: extraer hooks de empleados` |
| `docs` | Documentación | `docs: actualizar API.md con endpoints de empleados` |
| `style` | Formato de código | `style: aplicar prettier` |
| `test` | Tests | `test: agregar tests para permissions` |
| `chore` | Mantenimiento | `chore: actualizar dependencias` |

---

## Objetivo del Flujo

Mantener `main` siempre estable y desplegable. Todo el desarrollo se hace en ramas feature que se mergean via PR.

---

## Estructura de Ramas

```
main                    ← siempre estable, protegida
├── feature/<modulo>    ← nueva funcionalidad
├── fix/<descripcion>   ← corrección de bug
└── chore/<descripcion> ← tareas de mantenimiento
```

### Ejemplos
```
feature/empleados-crud
feature/cotizaciones-wizard
fix/sidebar-iconos-centrados
fix/login-error-handling
chore/actualizar-dependencias
chore/migrar-eslint-flat-config
```

---

## Rama `main`

- **Siempre** debe compilar sin errores
- **Nunca** se hace push directo
- **Siempre** se protege con branch protection rules
- Los PRs son la **única** forma de integrar cambios

---

## Flujo de Trabajo Diario

### 1. Actualizar main
```bash
git checkout main
git pull origin main
```

### 2. Crear rama feature
```bash
git checkout -b feature/<modulo>-<descripcion>
```

### 3. Trabajar y commitear
```bash
# Hacer cambios...
git add .
git commit -m "feat: descripción del cambio"

# Commits pequeños y descriptivos
git commit -m "feat: crear types de empleados"
git commit -m "feat: implementar API de empleados"
git commit -m "feat: crear EmpleadoTable con DataTable"
```

### 4. Push
```bash
git push -u origin feature/<modulo>-<descripcion>
```

### 5. Crear PR
- Título descriptivo
- Descripción con qué hace y por qué
- Checklist completo
- 1+ reviewer

### 6. Merge
- Después de aprobación
- Eliminar rama feature
