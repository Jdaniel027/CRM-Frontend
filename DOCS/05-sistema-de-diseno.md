# 05 — Sistema de Diseño

## Paleta de colores

### Colores de estado (badges, gráficas — idénticos en todo el sistema)

| Estado | Fondo | Borde | Texto |
|--------|-------|-------|-------|
| Pendiente | `#E9E9E7` | `#C9C9C6` | `#6B6B68` (gris) |
| Borrador | `#E4E1FA` | `#C2BCF0` | `#6B5FD6` (azul-violeta) |
| Enviada | `#FBF0D9` | `#EDCF8F` | `#B8860B` (ámbar) |
| Aprobada | `#D9F2E3` | `#A3DDBB` | `#1BAF7A` (verde) |
| Rechazada | `#FADADA` | `#F0A8A8` | `#C0392B` (rojo) |

### Colores de categoría de documento

| Categoría | Fondo | Borde | Texto |
|-----------|-------|-------|-------|
| Cotización | `#E8E7FB` | `#B8B5F0` | `#5B54D6` |
| Identificación | `#DFF5F3` | `#A8E3DD` | `#1A8F82` |
| Permiso | `#F5E9DF` | `#E3C3A3` | `#A66A34` |

### Colores generales

| Elemento | Color | Uso |
|----------|-------|-----|
| Primary | `#5D88CD` | Botones, links, activo |
| Primary Hover | `#4A75B8` | Hover de primary |
| Primary Light | `#E8F0FA` | Fondos suaves |
| Sidebar | `#1E2A47` | Fondo del sidebar |
| Sidebar Hover | `#2A3A5C` | Hover de ítems del sidebar |
| Sidebar Active | `#34476B` | Ítem activo del sidebar |
| Background | `#F8F9FC` | Fondo general de la app |
| Foreground | `#1A1A2E` | Texto principal |
| Border | `#E5E7EB` | Bordes generales |

---

## Design tokens en Tailwind

Todos los colores están definidos en `tailwind.config.ts` bajo `theme.extend.colors`:

```ts
// Ejemplo de uso en componentes
className="bg-status-aprobada-bg text-status-aprobada-text border-status-aprodada-border"
className="bg-category-cotizacion-bg text-category-cotizacion-text"
className="bg-primary text-white hover:bg-primary-hover"
className="bg-sidebar text-white"
```

---

## Regla de oro

> **Ningún color de estado o categoría se escribe "a mano"** en un componente.
> Siempre se consume desde los tokens via el componente `<StatusBadge />` o `<CategoryBadge />` centralizado.

Esto evita inconsistencias de colores entre pantallas (ej. una gráfica usando un verde distinto al del badge).

---

## Patrones de UI

### Tabla estándar
- Buscador + botón "Filtros" (dropdown con categorías → submenú)
- Checkboxes de aplicación inmediata para Rol/Estado
- Campos Desde/Hasta + botón Aplicar para rangos numéricos/fecha
- Filtros aplicados se muestran como **chips removibles** (X) debajo del buscador
- Botón azul "+ Nuevo X"
- Columna Acciones (editar/eliminar, permisos según rol)
- **Ordenamiento** por clic en encabezado de columna

### Perfil de detalle
- Layout 2 columnas:
  - Bloque principal con tabs a la izquierda
  - Columna fija "Detalles" a la derecha con ícono+etiqueta+valor

### Modal de creación
- Campos con placeholder de ejemplo
- Selección de opciones tipo **chip/pill** para campos categóricos (Rol, Estado)

### Panel lateral de detalle (drawer)
- Overlay negro 25% opacidad
- Cierre al clic afuera
- Botones de acción condicionados al estado

---

## Tipografía

- **Fuente:** Inter (system-ui fallback)
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
