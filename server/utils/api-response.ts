import type { H3Event, EventHandler, EventHandlerRequest } from 'h3'
import type { ApiErrorResponse } from '#shared/api'

export function defineApiHandler<T extends EventHandlerRequest, D>(handler: EventHandler<T, D>) {
  return defineEventHandler(async (event: H3Event) => {
    try {
      return await handler(event as never)
    } catch (error: any) {
      const statusCode = Number(error?.statusCode || error?.status || 500)
      const details = error?.data || {}
      setResponseStatus(event, statusCode)

      if (statusCode === 401) {
        return { data: null, code: 'UNAUTHORIZED', msg: error?.statusMessage || 'Unauthorized' } satisfies ApiErrorResponse
      }

      if (error?.unhandled || !error?.statusCode) {
        return { data: null, code: 'INTERNAL_ERROR', msg: 'Internal server error' } satisfies ApiErrorResponse
      }

      return {
        data: details.payload ?? null,
        code: details.apiCode || 'REQUEST_FAILED',
        msg: error?.statusMessage || 'Request failed'
      } satisfies ApiErrorResponse
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
