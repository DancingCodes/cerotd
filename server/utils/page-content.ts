import type { H3Event } from 'h3'

export type LocalizedPageText = {
  en: string
  zh: string
}

export type HomeHeroContent = {
  backgroundImage: string
  badge: LocalizedPageText
  title: LocalizedPageText
  subtitle: LocalizedPageText
  ctaPrimary: {
    text: LocalizedPageText
    href: string
  }
  ctaSecondary: {
    text: LocalizedPageText
    href: string
  }
  trust1: LocalizedPageText
  trust2: LocalizedPageText
  trust3: LocalizedPageText
}

type PageContentRow = {
  page_key: string
  section_key: string
  content_json: string
  updated_at: string
}

export const PAGE_CONTENT_KEYS = {
  home: ['hero']
} as const

export function assertPageContentKey(page: string, section: string) {
  if (page !== 'home' || section !== 'hero') {
    throw createError({ statusCode: 404, statusMessage: 'Page section not found' })
  }
}

export function parsePageContent(row: PageContentRow | null) {
  if (!row) return null
  try {
    const value = JSON.parse(row.content_json)
    return value && typeof value === 'object' ? value : null
  } catch {
    return null
  }
}

export async function findPageContent(event: H3Event, page: string, section: string) {
  assertPageContentKey(page, section)
  const db = useDB(event)
  let row: PageContentRow | null = null
  try {
    row = await db
      .prepare('SELECT page_key, section_key, content_json, updated_at FROM page_content WHERE page_key = ? AND section_key = ?')
      .bind(page, section)
      .first<PageContentRow>()
  } catch (error: any) {
    // Keep the public page on its built-in fallback until the new migration is applied.
    if (!/no such table/i.test(String(error?.message || error))) throw error
  }
  return row ? { content: parsePageContent(row), updatedAt: row.updated_at } : { content: null, updatedAt: null }
}

function clean(value: unknown, maxLength: number) {
  return String(value ?? '').trim().slice(0, maxLength)
}

function localized(body: Record<string, unknown>, key: string, required = false): LocalizedPageText {
  const en = clean(body[`${key}En`], 4000)
  const zh = clean(body[`${key}Zh`], 4000)
  if (required && (!en || !zh)) {
    throw createError({ statusCode: 500, statusMessage: `${key}En and ${key}Zh are required` })
  }
  return { en, zh }
}

function internalPath(value: unknown, fallback = '') {
  const path = clean(value, 500)
  if (!path) return fallback
  if (!/^\/(?!\/)/.test(path)) {
    throw createError({ statusCode: 500, statusMessage: 'CTA links must be site-relative paths' })
  }
  return path
}

function imageUrl(value: unknown, fallback: string) {
  return clean(value, 1000) || fallback
}

export function normalizeHomeHeroContent(body: Record<string, unknown>): HomeHeroContent {
  return {
    backgroundImage: imageUrl(body.backgroundImage, ''),
    badge: localized(body, 'badge'),
    title: localized(body, 'title', true),
    subtitle: localized(body, 'subtitle', true),
    ctaPrimary: {
      text: localized(body, 'ctaPrimary', true),
      href: internalPath(body.ctaPrimaryHref)
    },
    ctaSecondary: {
      text: localized(body, 'ctaSecondary', true),
      href: internalPath(body.ctaSecondaryHref)
    },
    trust1: localized(body, 'trust1'),
    trust2: localized(body, 'trust2'),
    trust3: localized(body, 'trust3')
  }
}

export async function savePageContent(event: H3Event, page: string, section: string, content: unknown) {
  assertPageContentKey(page, section)
  const db = useDB(event)
  await db
    .prepare(
      `INSERT INTO page_content (page_key, section_key, content_json, updated_at)
       VALUES (?, ?, ?, datetime('now'))
       ON CONFLICT(page_key, section_key) DO UPDATE SET
         content_json = excluded.content_json,
         updated_at = datetime('now')`
    )
    .bind(page, section, JSON.stringify(content))
    .run()

  return findPageContent(event, page, section)
}
