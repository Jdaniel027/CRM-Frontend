# Dependencias del Proyecto

Registro obligatorio de todas las dependencias instaladas. Cada librería debe estar documentada aquí.

---

## Dependencias Core / Framework

| Librería | Versión | Propósito | Ubicación |
|----------|---------|-----------|-----------|
| `react` | ^18.3.1 | Framework UI | Todo el proyecto |
| `react-dom` | ^18.3.1 | Renderizado DOM | `main.tsx` |

## Routing

| Librería | Versión | Propósito | Ubicación |
|----------|---------|-----------|-----------|
| `react-router-dom` | ^6.28.0 | Enrutamiento SPA con rutas protegidas | `app/routes.tsx`, `app/layout/` |

## UI / Componentes

| Librería | Versión | Propósito | Ubicación |
|----------|---------|-----------|-----------|
| `@radix-ui/react-avatar` | ^1.1.2 | Avatar con fallback | `components/ui/avatar.tsx` |
| `@radix-ui/react-dialog` | ^1.1.4 | Modales | `components/ui/dialog.tsx` |
| `@radix-ui/react-dropdown-menu` | ^2.1.4 | Menús desplegables | `components/ui/dropdown-menu.tsx` |
| `@radix-ui/react-label` | ^2.1.1 | Labels de formulario | `components/ui/label.tsx` |
| `@radix-ui/react-popover` | ^1.1.4 | Contenido flotante | `components/ui/popover.tsx` |
| `@radix-ui/react-scroll-area` | ^1.2.2 | Scroll personalizado | `components/ui/scroll-area.tsx` |
| `@radix-ui/react-select` | ^2.1.4 | Select nativo | `components/ui/select.tsx` |
| `@radix-ui/react-separator` | ^1.1.1 | Línea separadora | `components/ui/separator.tsx` |
| `@radix-ui/react-slot` | ^1.1.1 | Composición de componentes | `components/ui/button.tsx` |
| `@radix-ui/react-switch` | ^1.1.2 | Toggle switch | `components/ui/switch.tsx` |
| `@radix-ui/react-tabs` | ^1.1.2 | Pestañas | `components/ui/tabs.tsx` |
| `@radix-ui/react-tooltip` | ^1.1.6 | Tooltips | `components/ui/tooltip.tsx` |
| `class-variance-authority` | ^0.7.1 | Variantes de componentes (cva) | `components/ui/button.tsx` |
| `clsx` | ^2.1.1 | Classnames condicionales | `lib/utils.ts` |
| `tailwind-merge` | ^2.6.0 | Merge de clases Tailwind | `lib/utils.ts` |
| `lucide-react` | ^0.468.0 | Iconos | `app/layout/Sidebar.tsx`, `app/layout/Header.tsx` |

## Estado

| Librería | Versión | Propósito | Ubicación |
|----------|---------|-----------|-----------|
| `@tanstack/react-query` | ^5.62.0 | Estado del servidor, cache, revalidación | `App.tsx` (QueryClientProvider) |
| `zustand` | ^5.0.2 | Estado cliente global | `stores/session-store.ts`, `stores/sidebar-store.ts` |

## Formularios

| Librería | Versión | Propósito | Ubicación |
|----------|---------|-----------|-----------|
| `react-hook-form` | ^7.54.0 | Formularios performantes sin rerenders | Feature forms |
| `@hookform/resolvers` | ^3.9.1 | Integración RHF + Zod | Feature forms |
| `zod` | ^3.24.1 | Validación de schemas + tipos | Feature types |

## Tablas y Datos

| Librería | Versión | Propósito | Ubicación |
|----------|---------|-----------|-----------|
| `@tanstack/react-table` | ^8.20.6 | Tablas con sorting, paginación, selección | `components/data-table/` |

## Gráficas

| Librería | Versión | Propósito | Ubicación |
|----------|---------|-----------|-----------|
| `recharts` | ^2.15.0 | Gráficas de barras, dona, línea | `features/dashboard/` |

## Fechas

| Librería | Versión | Propósito | Ubicación |
|----------|---------|-----------|-----------|
| `date-fns` | ^4.1.0 | Formateo y manipulación de fechas | `lib/utils.ts` (formatDate) |

## Dependencias de desarrollo

| Librería | Versión | Propósito |
|----------|---------|-----------|
| `typescript` | ^5.6.3 | Type checking |
| `vite` | ^6.0.3 | Build tool y dev server |
| `@vitejs/plugin-react` | ^4.3.4 | Plugin React para Vite |
| `tailwindcss` | ^3.4.16 | Utility-first CSS |
| `autoprefixer` | ^10.4.20 | Prefijos CSS automáticos |
| `postcss` | ^8.4.49 | Procesamiento CSS |
| `eslint` | ^9.16.0 | Linting |
| `@typescript-eslint/eslint-plugin` | ^8.18.0 | Reglas TS para ESLint |
| `@typescript-eslint/parser` | ^8.18.0 | Parser TS para ESLint |
| `eslint-plugin-react-hooks` | ^5.1.0 | Reglas de hooks React |
| `eslint-plugin-react-refresh` | ^0.4.16 | HMR refresh safety |
| `prettier` | ^3.4.2 | Formateo de código |
| `prettier-plugin-tailwindcss` | ^0.6.9 | Orden automática de clases Tailwind |
| `@types/react` | ^18.3.12 | Tipos de React |
| `@types/react-dom` | ^18.3.1 | Tipos de ReactDOM |
| `@types/node` | ^22.10.2 | Tipos de Node.js |

---

## ¿Cómo agregar una nueva dependencia?

1. **Evaluar:** ¿Es necesaria? ¿Ya hay algo similar? ¿Cuál es el tamaño?
2. **Instalar:** `npm install <paquete>`
3. **Documentar:** Agregar una fila a la tabla correspondiente en este archivo
4. **Justificar:** En el PR, explicar por qué se necesita

## Dependencias descartadas

| Librería | Razón de descarte | Alternativa |
|----------|-------------------|-------------|
| Next.js | No se necesita SSR (panel admin, no SEO) | Vite + React |
| Redux | Demasiada ceremonia para estado UI | Zustand |
| Axios | `fetch` nativo con api-client es suficiente | `lib/api-client.ts` |
