import type { ApiResponse } from '#shared/api'

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
    return unwrapApiResponse(await $fetch<ApiResponse<T>>(request, options))
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
