import type { ApiResponse } from '#shared/api'
import { ADMIN_API_TOKEN_STORAGE_KEY } from './useAdminAuth'

function withAdminToken(request: string, options: Record<string, unknown>) {
  if (!import.meta.client) return options

  const url = new URL(request, window.location.origin)
  if (url.origin !== window.location.origin || !url.pathname.startsWith('/api/')) return options

  const token = window.localStorage.getItem(ADMIN_API_TOKEN_STORAGE_KEY)
  if (!token) return options

  const headers = new Headers(options.headers as HeadersInit | undefined)
  headers.set('Authorization', `Bearer ${token}`)
  return { ...options, headers }
}

export class ApiResponseError extends Error {
  code: string
  msg: string

  constructor(response: ApiResponse<unknown>) {
    super(response.msg)
    this.name = 'ApiResponseError'
    this.code = response.code
    this.msg = response.msg
  }
}

export function unwrapApiResponse<T>(response: ApiResponse<T>) {
  if (response.code !== 'OK') {
    throw new ApiResponseError(response)
  }
  return response.data
}

export async function apiFetch<T>(request: string, options: Record<string, unknown> = {}) {
  try {
    return unwrapApiResponse(await $fetch<ApiResponse<T>>(request, withAdminToken(request, options)))
  } catch (error: any) {
    if (error instanceof ApiResponseError) throw error
    if (error?.data?.code && error?.data?.msg) {
      throw new ApiResponseError(error.data as ApiResponse<T>)
    }
    throw new ApiResponseError({ data: null, code: 'INTERNAL_ERROR', msg: 'Internal server error' })
  }
}

export function useApiFetch<T>(request: any, options: Record<string, any> = {}) {
  const transform = options.transform
  return useFetch<T>(request, {
    ...options,
    transform: (response: ApiResponse<T>) => {
      const data = unwrapApiResponse(response)
      return transform ? transform(data) : data
    }
  } as any)
}
