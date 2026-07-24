# Setup para Desarrolladores — CRM Gasolineras

## Requisitos

| Requisito | Versión mínima |
|-----------|---------------|
| Node.js | 18.x LTS |
| npm | 9.x |
| Git | 2.x |
| Editor | VS Code (recomendado) |

### Extensiones VS Code (recomendadas)
- **ESLint** — `dbaeumer.vscode-eslint`
- **Prettier** — `esbenp.prettier-vscode`
- **Tailwind CSS IntelliSense** — `bradlc.vscode-tailwindcss`
- **TypeScript Vue Plugin** — `vue.vscode-typescript-next`

---

## Instalación

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd CRM-Frontend

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno (si existen)
cp .env.example .env

# 4. Iniciar servidor de desarrollo
npm run dev
```

El servidor de desarrollo inicia en `http://localhost:3000` con HMR (Hot Module Replacement).

---

## Scripts Disponibles

| Script | Comando | Descripción |
|--------|---------|-------------|
| Desarrollo | `npm run dev` | Servidor con HMR en puerto 3000 |
| Build | `npm run build` | Type-check + build de producción |
| Preview | `npm run preview` | Preview del build de producción |
| Lint | `npm run lint` | ESLint (0 warnings permitidos) |
| Lint Fix | `npm run lint:fix` | ESLint con autofix |
| Format | `npm run format` | Prettier en todo src/ |

---

## Flujo de Trabajo Diario

```bash
# 1. Actualizar main
git checkout main && git pull

# 2. Crear rama feature
git checkout -b feature/<modulo>-<descripcion>

# 3. Iniciar desarrollo
npm run dev

# 4. Trabajar con HMR
# Los cambios se reflejan automáticamente en el navegador

# 5. Antes de commitear
npm run lint:fix    # Arreglar linting
npm run build       # Verificar que compila

# 6. Commitear y push
git add .
git commit -m "feat: descripción"
git push -u origin feature/<modulo>-<descripcion>

# 7. Crear PR en GitHub
```

---

## Variables de Entorno

El archivo `.env` se usa para configuración local. Nunca commitearlo.

```bash
# .env.example
VITE_API_URL=http://localhost:3001/api
```

| Variable | Descripción | Default |
|----------|-------------|---------|
| `VITE_API_URL` | URL base del backend | `http://localhost:3001/api` |

---

## Autenticación (Demo)

El login actual funciona con datos mock. Para probar:

| Email | Contraseña | Rol |
|-------|-----------|-----|
| admin@crm.com | 123456 | admin |
| empleado@crm.com | 123456 | empleado |

**Importante:** Cuando el backend esté listo, reemplazar el mock en `LoginPage.tsx` por llamada real a la API.

---

## Solución de Problemas

### "No se inicia el servidor de desarrollo"
```bash
# Verificar Node.js
node --version  # Debe ser 18.x+

# Reinstalar dependencias
rm -rf node_modules
npm install

# Intentar de nuevo
npm run dev
```

### "TypeScript muestra errores raros"
```bash
# Limpiar cache de TypeScript
npx tsc --noEmit --clean

# Verificar errores
npx tsc --noEmit
```

### "Los estilos no se aplican"
```bash
# Verificar que Tailwind está procesando los archivos
# revisar tailwind.config.ts → content: ['./index.html', './src/**/*.{ts,tsx}']
```

### "No encuentra el alias @/"
Verificar que `tsconfig.json` y `vite.config.ts` tienen la misma configuración de paths:
```json
// tsconfig.json
"paths": { "@/*": ["./src/*"] }
```
```ts
// vite.config.ts
resolve: { alias: { '@': path.resolve(__dirname, './src') } }
```
