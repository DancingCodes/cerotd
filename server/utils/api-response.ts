import type { H3Event, EventHandler, EventHandlerRequest } from 'h3'
import type { ApiResponse } from '#shared/api'

export function apiResponse<T>(data: T, code = 'OK', msg = 'OK'): ApiResponse<T> {
  return { data, code, msg }
}

export function defineApiHandler<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>) {
  return defineEventHandler(async (event: H3Event) => {
    try {
      return apiResponse(await handler(event as never))
    } catch (error: any) {
      const statusCode = Number(error?.statusCode || error?.status || 500)
      const details = error?.data || {}

      if (statusCode === 401) {
        return apiResponse(null, 'UNAUTHORIZED', error?.statusMessage || 'Unauthorized')
      }

      if (error?.unhandled || !error?.statusCode) {
        return apiResponse(null, 'INTERNAL_ERROR', 'Internal server error')
      }

      return apiResponse(
        details.payload ?? null,
        details.apiCode || 'REQUEST_FAILED',
        error?.statusMessage || 'Request failed'
      )
    }
  })
}

export function throwApiError(code: string, msg: string, data: unknown = null): never {
  throw createError({
    statusCode: 500,
    statusMessage: msg,
    data: { apiCode: code, payload: data }
  })
}
