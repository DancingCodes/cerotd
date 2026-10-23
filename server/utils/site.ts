import type { H3Event } from 'h3'

export function getSiteUrl(event: H3Event) {
  const host = getRequestHeader(event, 'host')
  if (!host) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Unable to determine site URL'
    })
  }

  const proto = getRequestHeader(event, 'x-forwarded-proto') || 'https'
  return `${proto}://${host}`
}

export function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}
