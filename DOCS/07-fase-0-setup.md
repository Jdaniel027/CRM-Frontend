# 07 — Fase 0: Setup del Proyecto (COMPLETADA)

## Resumen

La Fase 0 consiste en la inicialización completa del proyecto frontend con todas las herramientas de build, estilos y configuración base.

## Estado: ✅ COMPLETADA

### Checklist de verificación

| # | Item | Estado |
|---|------|--------|
| 1 | `.gitignore` — node_modules, dist, .env, etc. | ✅ |
| 2 | `package.json` — todas las dependencias instaladas | ✅ |
| 3 | `vite.config.ts` — plugin React + alias `@/` | ✅ |
| 4 | `tsconfig.json` — path aliases, strict, react-jsx | ✅ |
| 5 | `tailwind.config.ts` — paleta CRM completa | ✅ |
| 6 | `postcss.config.js` — tailwindcss + autoprefixer | ✅ |
| 7 | `index.html` — apunta a src/main.tsx | ✅ |
| 8 | `src/index.css` — directivas de Tailwind | ✅ |
| 9 | `src/vite-env.d.ts` — tipos de Vite client | ✅ |
| 10 | `src/main.tsx` — entry point | ✅ |
| 11 | `src/App.tsx` — providers (Router + Query) | ✅ |
| 12 | `node_modules/` — paquetes instalados | ✅ |
| 13 | TypeScript compila sin errores | ✅ |
| 14 | ESLint configurado | ✅ |
| 15 | Prettier configurado | ✅ |

### Dependencias instaladas

**Runtime:**
- react, react-dom (18.x)
- react-router-dom (6.x)
- @tanstack/react-query (5.x)
- @tanstack/react-table (8.x)
- zustand (5.x)
- react-hook-form + @hookform/resolvers
- zod
- recharts
- date-fns
- lucide-react
- clsx, tailwind-merge, class-variance-authority
- 12 paquetes @radix-ui/* (dialog, dropdown-menu, tabs, select, tooltip, avatar, label, scroll-area, popover, separator, slot, switch)

**Dev:**
- typescript (5.x)
- vite (6.x) + @vitejs/plugin-react
- tailwindcss (3.x) + postcss + autoprefixer
- eslint + plugins
- prettier + prettier-plugin-tailwindcss

### Archivos base creados

- `src/app/routes.tsx` — Rutas completas con guards por rol
- `src/app/layout/` — AppLayout, Sidebar (9 ítems), SidebarItem, Header
- `src/lib/permissions.ts` — Matriz completa de permisos por rol/módulo
- `src/lib/utils.ts` — cn(), formatCurrency, formatDate, formatRelativeTime
- `src/lib/api-client.ts` — Cliente API con auth por token
- `src/stores/` — session-store (auth), sidebar-store (UI)
- `src/hooks/use-debounce.ts`
- `src/types/estado.ts` + `src/types/rol.ts`
- `src/components/ui/` — Button, Input
- `src/components/status-badge/` — StatusBadge, CategoryBadge
- `features/*/` — Páginas placeholder para cada módulo

### Scripts disponibles

```bash
pnpm dev        # Servidor de desarrollo (puerto 3000)
pnpm build      # Build de producción
pnpm lint       # Linting con ESLint
pnpm lint:fix   # Linting con auto-fix
pnpm format     # Formateo con Prettier
pnpm preview    # Preview del build
```

### Nota sobre package manager

Se usó `npm install` para la instalación inicial debido a problemas de red con pnpm. El `package-lock.json` está presente. Se puede generar `pnpm-lock.yaml` ejecutando `pnpm import` cuando la red esté estable, o simplemente usar `pnpm install` en la próxima instalación limpio.
