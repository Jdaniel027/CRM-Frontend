# Obstáculos Técnicos — CRM Gasolineras

## Formato

Cada obstáculo documentado sigue este formato:
1. **Problema:** Descripción del obstáculo
2. **Contexto:** Cuándo y dónde ocurre
3. **Impacto:** Qué tan grave es
4. **Solución aplicada:** Cómo se resolvió o se está trabajando
5. **Estado:** Resuelto / En progreso / Pendiente

---

## 1. Errores TypeScript por importación de providers.tsx

**Problema:** El archivo `providers.tsx` importaba `@tanstack/react-query-devtools` que no estaba instalado, causando pantalla amarilla al cargar la app.

**Contexto:** Al iniciar `npm run dev`, la pantalla se mostraba amarilla (error overlay de React).

**Impacto:** La app no cargaba. Error visible inmediatamente.

**Solución aplicada:** Eliminar `providers.tsx` (era código muerto — `App.tsx` ya tiene su propio QueryClientProvider). El archivo no era importado por ningún otro componente.

**Estado:** Resuelto ✅

---

## 2. Deprecación de baseUrl en tsconfig.json

**Problema:** TypeScript mostraba warning: "La opción 'baseUrl' está en desuso y dejará de funcionar en TypeScript 7.0".

**Contexto:** Al ejecutar `npx tsc --noEmit`.

**Impacto:** Advertencia molesta pero funcional.

**Solución aplicada:** Eliminar `"baseUrl": "."` de `tsconfig.json`. Con `moduleResolution: "bundler"`, `paths` funciona sin `baseUrl` (las rutas se resuelven相对于 la ubicación del tsconfig).

**Estado:** Resuelto ✅

---

## 3. Iconos del sidebar descentrados en modo colapsado

**Problema:** Al colapsar el sidebar, los íconos no quedaban centrados horizontalmente.

**Contexto:** Sidebar colapsado (72px de ancho).

**Impacto:** Visual — los íconos se veían alineados a la izquierda en vez de centrados.

**Solución aplicada:** Agregar `justify-center` al `<Link>` cuando `collapsed` es true, y ajustar `px-0` para evitar padding extra. Luego se agregó `mx-3` en ambos estados para limitar el ancho del link y que el fondo activo no tocara los bordes.

**Estado:** Resuelto ✅

---

## 4. Fondo activo del sidebar tocaba los bordes

**Problema:** Al seleccionar un item del sidebar colapsado, el fondo activo se extendía todo el ancho del sidebar.

**Contexto:** Sidebar colapsado con item seleccionado.

**Impacto:** Visual — el fondo activo no tenía respiración visual en los bordes.

**Solución aplicada:** Restaurar `mx-3` en el estado collapsed. El link queda con 48px de ancho (72px - 24px de margen), centrado con `justify-center`.

**Estado:** Resuelto ✅

---

## 5. Botón toggle del header desalineado en modo colapsado

**Problema:** El botón para colapsar/expandir el sidebar quedaba en la derecha cuando el sidebar estaba colapsado.

**Contexto:** Header con `justify-between` y solo el botón visible (título oculto).

**Impacto:** Visual — el botón no estaba centrado con los ítems del sidebar.

**Solución aplicada:** Cambiar el header para usar `justify-center` cuando collapsed y `justify-between` cuando expanded.

**Estado:** Resuelto ✅

---

## 6. Sin backend definido

**Problema:** No existe un backend definido ni contratado. Las llamadas a API no tienen un endpoint real al que conectarse.

**Contexto:** Al implementar features que consumen datos (CRUD, dashboard, etc.).

**Impacto:** Alto — sin backend, no se pueden probar funcionalidades con datos reales.

**Solución pendiente:** 
- Opción A: Usar Mock Service Worker (MSW) para simular respuestas de API
- Opción B: Usar JSON Server como mock rápido
- Opción C: Definir contratos API en `DOCS/api/API.md` y esperar al backend

**Estado:** Pendiente ⏳

---

## 7. Sin framework de testing configurado

**Problema:** No hay Vitest ni React Testing Library configurados en el proyecto.

**Contexto:** Al intentar ejecutar tests.

**Impacto:** Medio — no se pueden escribir tests automatizados.

**Solución pendiente:** 
- Instalar Vitest + @testing-library/react + @testing-library/jest-dom
- Configurar `vite.config.ts` con sección `test`
- Crear `src/test/setup.ts`
- Agregar scripts a `package.json`

**Estado:** Pendiente ⏳

---

## 8. ESLint 9.x con config legacy

**Problema:** ESLint 9.x está instalado pero usa el formato `.eslintrc.cjs` (legacy de ESLint 8.x). El flag `--ext` en el script `lint` está deprecado.

**Contexto:** Al ejecutar `npm run lint`.

**Impacto:** Bajo — funciona pero muestra warnings de deprecación.

**Solución pendiente:** Migrar a `eslint.config.js` (flat config) o hacer pin de ESLint a `^8.x`.

**Estado:** Pendiente ⏳
