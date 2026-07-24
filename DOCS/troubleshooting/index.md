# Troubleshooting — CRM Gasolineras

## Solución de Problemas Comunes

---

### La pantalla se queda amarilla al cargar

**Causa probable:** Error de importación o runtime error.

**Solución:**
1. Abrir consola del navegador (F12)
2. Leer el mensaje de error
3. Verificar que no hay imports rotos: `npx tsc --noEmit`
4. Verificar que el build funciona: `npm run build`

---

### Los estilos de Tailwind no se aplican

**Causa probable:** Tailwind no está procesando los archivos.

**Solución:**
1. Verificar `tailwind.config.ts` → `content: ['./index.html', './src/**/*.{ts,tsx}']`
2. Verificar `postcss.config.js` tiene `tailwindcss` y `autoprefixer`
3. Verificar que `src/index.css` tiene las directivas de Tailwind

---

### El alias @/ no funciona

**Causa probable:** Configuración de paths inconsistente.

**Solución:**
1. Verificar `tsconfig.json`:
   ```json
   "paths": { "@/*": ["./src/*"] }
   ```
2. Verificar `vite.config.ts`:
   ```typescript
   resolve: { alias: { '@': path.resolve(__dirname, './src') } }
   ```

---

### El sidebar no colapsa/expande

**Causa probable:** Zustand store no persiste correctamente.

**Solución:**
1. Verificar que `stores/sidebar-store.ts` usa `persist` middleware
2. Limpiar localStorage del navegador
3. Verificar que `useSidebarStore` se usa correctamente

---

### TypeScript muestra errores después de pull

**Causa probable:** Dependencias desactualizadas.

**Solución:**
```bash
rm -rf node_modules
npm install
npx tsc --noEmit
```

---

### El build de producción falla

**Causa probable:** Error de TypeScript o importación rota.

**Solución:**
```bash
# Ver errores de TypeScript
npx tsc --noEmit

# Ver errores de build
npm run build 2>&1

# Si es un archivo específico, revisar imports
```

---

### Los permisos no filtran el sidebar

**Causa probable:** El módulo no está definido en `permissions.ts`.

**Solución:**
1. Verificar que el módulo existe en el tipo `Modulo`
2. Verificar que tiene permisos definidos en el objeto `permisos`
3. Verificar que el sidebar usa `puedeVer(user.rol, item.modulo)`

---

### Los componentes de notificaciones no aparecen

**Causa probable:** No hay datos de notificaciones mock.

**Solución:**
1. Verificar que `components/notifications/` tiene los archivos necesarios
2. Verificar que el `NotificationBell` se importa en `Header.tsx`
3. Cuando el backend esté listo, conectar con endpoint real

---

### Error: "Cannot find module" al importar

**Causa probable:** Archivo no existe o path de importación incorrecto.

**Solución:**
1. Verificar que el archivo existe en la ruta indicada
2. Verificar que el alias `@/` está configurado correctamente
3. Verificar la extensión del archivo (.tsx, .ts)

---

## Recursos

- [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
