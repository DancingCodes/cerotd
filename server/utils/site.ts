import type { H3Event } from 'h3'

export function getSiteUrl(event: H3Event) {
  const configured = String(useRuntimeConfig(event).public.siteUrl || '').replace(/\/$/, '')
  if (configured) return configured

  const host = getRequestHeader(event, 'host')
  if (!host) return 'https://cerotd.changyuezhang68-667.workers.dev'

  const proto = getRequestHeader(event, 'x-forwarded-proto') || 'https'
  return `${proto}://${host}`
}

/** Stable production origin for media. Never fall back to local request host. */
export function getMediaOrigin(event: H3Event) {
  const config = useRuntimeConfig(event)
  const fromPublic = String(config.public.siteUrl || '').replace(/\/$/, '')
  if (fromPublic && !/^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.|10\.|172\.(1[6-9]|2\d|3[0-1])\.)/i.test(fromPublic)) {
    return fromPublic
  }

  const fromEnv = String(process.env.NUXT_PUBLIC_SITE_URL || '').replace(/\/$/, '')
  if (fromEnv) return fromEnv

  return 'https://moonc.love'
}

export function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;')
}
