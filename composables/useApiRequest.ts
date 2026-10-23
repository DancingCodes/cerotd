import type { ApiResponse } from '#shared/api'
import { ADMIN_API_TOKEN_STORAGE_KEY } from './useAdminAuth'

export async function apiFetch<T>(request: string, options: Record<string, unknown> = {}) {
  const token = import.meta.client && window.localStorage.getItem(ADMIN_API_TOKEN_STORAGE_KEY)
  const requestOptions = token
    ? { ...options, headers: { ...(options.headers as Record<string, string>), Authorization: `Bearer ${token}` } }
    : options
  const response = await $fetch<ApiResponse<T>>(request, requestOptions)

  if (response.code !== 200) {
    if (import.meta.client) {
      if (response.code === 401 && useRoute().path.startsWith('/admin')) {
        useAdminAuth().clearToken()
        navigateTo('/admin')
      }
      useToast().add({ title: response.msg, color: 'error' })
    }
    throw response
  }
  return response.data
}

export function useApiFetch<T>(request: any, options: Record<string, any> = {}) {
  return useFetch<T>(request, {
    ...options,
    transform: (response: ApiResponse<T>) => {
      if (response.code !== 200) {
        if (import.meta.client) {
          useToast().add({ title: response.msg, color: 'error' })
        }
        throw response
      }
      return response.data
    }
  } as any)
}
