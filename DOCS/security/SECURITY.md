# Políticas de Seguridad

## Prácticas de Seguridad

### Variables de Entorno y Secrets

- **Nunca** commitear archivos `.env` al repositorio
- Usar `.env.example` como plantilla para variables necesarias
- Variables sensibles (API keys, tokens) solo en `.env` local
- En producción, las variables se configuren en el servidor de deploy

```bash
# .gitignore ya incluye:
.env
.env.local
.env.*.local
```

### Manejo de Tokens

- El token de autenticación se almacena en **Zustand persist** (localStorage)
- Se envía automáticamente en cada request vía `api-client.ts` (header `Authorization: Bearer <token>`)
- **Nunca** loguear tokens en consola
- El token se invalida al cerrar sesión (`clearSession()`)

### Validación de Inputs

- Usar **Zod** para validar todos los formularios antes de enviar
- `react-hook-form` + `@hookform/resolvers` para integrar Zod con formularios
- Nunca confiar en datos del backend sin validar en frontend
- Sanitizar inputs que se muestran en DOM (XSS)

### Comunicación con el Backend

- Todas las llamadas HTTP pasan por `lib/api-client.ts`
- **Nunca** usar `fetch()` directo desde componentes
- Usar HTTPS en producción
- El api-client maneja automáticamente: token, headers, manejo de errores 401/403

### Logging y Debugging

- **Nunca** usar `console.log` con datos sensibles (tokens, passwords, emails de clientes)
- En producción, el logging debe ser controlado
- Usar los DevTools de TanStack Query solo en desarrollo

### Permisos de la App

- Los permisos del frontend son **solo para UX** (ocultar botones, filtrar sidebar)
- La validación real DEBE estar en el backend
- Nunca asumir que el usuario tiene permisos solo porque el UI lo muestra

---

## Auditoría de Dependencias

### Mantener Dependencias Actualizadas

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar una dependencia
npm update <package>

# Actualizar mayor versión (puede tener breaking changes)
npm install <package>@latest
```

### Política de Actualizaciones

| Severidad | Tiempo de actualización |
|-----------|------------------------|
| Crítica (vulnerabilidad conocida) | < 24 horas |
| Alta | 1 semana |
| Media | Próximo sprint |
| Baja | Cuándo sea conveniente |

### Antes de Agregar una Dependencia

1. **Evaluar:** ¿Es necesaria? ¿Ya hay algo similar en el proyecto?
2. **Verificar:** Tamaño,维护状态, licencia, dependencias
3. **Documentar:** Agregar a `DOCS/DEPENDENCIES.md` con justificación
4. **Aprobar:** Que al menos un senior revise la adición

---

## Vulnerabilidades Comunes a Evitar

1. **Injection:** Validar y sanitizar todos los inputs del usuario
2. **Insecure Data Storage:** No almacenar secrets en localStorage sin necesidad
3. **Insecure Communication:** HTTPS en todas las llamadas a API
4. **Insufficient Authentication:** Verificar tokens en cada request
5. **Code Tampering:** No evaluar código dinámico del usuario
6. **XSS:** No renderizar HTML crudo del backend sin sanitizar

---

## Security Checklist (Pre-Release)

- [ ] No hay `.env` commiteado
- [ ] No hay `console.log` con datos sensibles
- [ ] No hay tokens hardcodeados en el código
- [ ] Todas las llamadas HTTP usan el `api-client.ts`
- [ ] Los formularios validan con Zod
- [ ] Los permisos se verifican en backend
- [ ] Las dependencias no tienen vulnerabilidades conocidas (`npm audit`)
- [ ] No se exponen errores internos al usuario

---

## Recursos

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [React Security Best Practices](https://cheatsheetseries.owasp.org/cheatsheets/React_Security_Cheat_Sheet.html)
- [Zod Security](https://zod.dev/)
