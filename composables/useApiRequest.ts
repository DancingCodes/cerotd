import type { ApiErrorResponse } from '#shared/api'
import { ADMIN_API_TOKEN_STORAGE_KEY } from './useAdminAuth'

export class ApiRequestError extends Error {
  code: string
  msg: string
  statusCode: number

  constructor(statusCode: number, response: ApiErrorResponse) {
    super(response.msg)
    this.name = 'ApiRequestError'
    this.statusCode = statusCode
    this.code = response.code
    this.msg = response.msg
  }
}

export async function apiFetch<T>(request: string, options: Record<string, unknown> = {}) {
  try {
    const token = import.meta.client && window.localStorage.getItem(ADMIN_API_TOKEN_STORAGE_KEY)
    const requestOptions = token
      ? { ...options, headers: { ...(options.headers as Record<string, string>), Authorization: `Bearer ${token}` } }
      : options

    return await $fetch<T>(request, requestOptions)
  } catch (error: any) {
    if (error instanceof ApiRequestError) throw error
    const response = error?.data?.code && error?.data?.msg
      ? error.data as ApiErrorResponse
      : { data: null, code: 'INTERNAL_ERROR', msg: 'Internal server error' }
    throw new ApiRequestError(Number(error?.statusCode || error?.status || 500), response)
  }
}

export function useApiFetch<T>(request: any, options: Record<string, any> = {}) {
  return useFetch<T>(request, options)
}
