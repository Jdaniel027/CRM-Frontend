/**
 * apiClient — Cliente HTTP para comunicación con el backend.
 *
 * Singleton que encapsula fetch con:
 * - Token de autenticación automático (Bearer token desde localStorage)
 * - Headers Content-Type: application/json
 * - Query params desde objeto
 * - Manejo de errores con mensajes legibles
 * - Soporte para 204 No Content (DELETE)
 *
 * La URL base se configura con `VITE_API_URL` en `.env`.
 * Default: `http://localhost:3001/api`
 *
 * @example
 * ```ts
 * import { apiClient } from '@/lib/api-client'
 *
 * // GET con query params
 * const clientes = await apiClient.get<Cliente[]>('/clientes', { activo: true })
 *
 * // POST con body
 * const nuevo = await apiClient.post<Cliente>('/clientes', { nombre: 'Pemex' })
 *
 * // PUT para actualizar
 * await apiClient.put<Cliente>('/clientes/123', { nombre: 'Pemex SA' })
 *
 * // DELETE
 * await apiClient.delete('/clientes/123')
 * ```
 *
 * @see src/features - para las funciones de API por módulo
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

/** Opciones de request extendiendo RequestInit con soporte de query params */
interface RequestOptions extends RequestInit {
  /** Query params que se agregan a la URL */
  params?: Record<string, string | number | boolean>
}

/**
 * Cliente HTTP singleton con autenticación automática.
 * Todas las llamadas a la API pasan por esta instancia.
 */
class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  /**
   * Obtiene el token de autenticación desde localStorage.
   * @returns Token JWT o null si no hay sesión
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('token')
  }

  /**
   * Construye la URL completa con query params.
   * @param endpoint - Ruta relativa (ej. `/clientes`)
   * @param params - Objeto con query params
   * @returns URL completa
   */
  private buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value))
      })
    }
    return url.toString()
  }

  /**
   * Método interno que ejecuta la petición fetch.
   * Agrega headers, token, maneja errores y parsea JSON.
   */
  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options
    const url = this.buildUrl(endpoint, params)
    const token = this.getAuthToken()

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...fetchOptions.headers,
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Error desconocido' }))
      throw new Error(error.message || `Error ${response.status}`)
    }

    if (response.status === 204) {
      return undefined as T
    }

    return response.json()
  }

  /** GET — Obtener datos */
  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', params })
  }

  /** POST — Crear recurso */
  async post<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /** PUT — Actualizar recurso completo */
  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /** PATCH — Actualizar parcialmente un recurso */
  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  /** DELETE — Eliminar recurso */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE' })
  }
}

/** Instancia singleton del cliente API */
export const apiClient = new ApiClient(API_BASE_URL)
