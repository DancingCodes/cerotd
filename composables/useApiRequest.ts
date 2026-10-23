import { ADMIN_API_TOKEN_STORAGE_KEY } from './useAdminAuth'

export async function apiFetch<T>(request: string, options: Record<string, unknown> = {}) {
  try {
    const token = import.meta.client && window.localStorage.getItem(ADMIN_API_TOKEN_STORAGE_KEY)
    const requestOptions = token
      ? { ...options, headers: { ...(options.headers as Record<string, string>), Authorization: `Bearer ${token}` } }
      : options

    return await $fetch<T>(request, requestOptions)
  } catch (error: any) {
    throw error.data
  }
}

export function useApiFetch<T>(request: any, options: Record<string, any> = {}) {
  return useFetch<T>(request, options)
}
