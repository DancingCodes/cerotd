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
  trustLabels: LocalizedPageText[]
}

export type HomeStatsContent = {
  items: Array<{
    value: LocalizedPageText
    label: LocalizedPageText
  }>
}

export type HomeLabContent = {
  title: LocalizedPageText
  subtitle: LocalizedPageText
  points: LocalizedPageText[]
  link: { text: LocalizedPageText; href: string }
  cards: Array<{ name: LocalizedPageText; description: LocalizedPageText }>
}

export type HomeFacilityContent = {
  title: LocalizedPageText
  subtitle: LocalizedPageText
  categories: Array<{ id: string; name: LocalizedPageText }>
  link: { text: LocalizedPageText; href: string }
  images: Array<{
    categoryId: string
    src: string
    caption: LocalizedPageText
  }>
}

export type HomeExportServicesContent = {
  title: LocalizedPageText
  subtitle: LocalizedPageText
  items: Array<{ name: LocalizedPageText; description: LocalizedPageText }>
  link: { text: LocalizedPageText; href: string }
}

export type HomeProductLinesContent = {
  title: LocalizedPageText
  subtitle: LocalizedPageText
  link: { text: LocalizedPageText; href: string }
}

export type HomeAdvantagesContent = {
  title: LocalizedPageText
  subtitle: LocalizedPageText
  link: { text: LocalizedPageText; href: string }
  items: Array<{
    name: LocalizedPageText
    description: LocalizedPageText
    image: string
  }>
}

export type HomePartnersContent = {
  title: LocalizedPageText
  subtitle: LocalizedPageText
  items: Array<{
    logo: string
    href: string
  }>
}

export type HomeCtaContent = {
  title: LocalizedPageText
  subtitle: LocalizedPageText
  button: LocalizedPageText
  href: string
}

type PageContentRow = {
  page_key: string
  section_key: string
  content_json: string
  updated_at: string
}

export const PAGE_CONTENT_KEYS = {
  home: ['hero', 'stats', 'lab', 'facility', 'export-services', 'product-lines', 'advantages', 'partners', 'cta']
} as const

export function assertPageContentKey(page: string, section: string) {
  if (page !== 'home' || !PAGE_CONTENT_KEYS.home.includes(section as typeof PAGE_CONTENT_KEYS.home[number])) {
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
    // Keep the public page available until the new migration is applied.
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
    trustLabels: Array.isArray(body.trustLabels)
      ? body.trustLabels.slice(0, 12).map((item) => {
          const label = item && typeof item === 'object' ? item as Record<string, unknown> : {}
          return { en: clean(label.en, 240), zh: clean(label.zh, 240) }
        }).filter((item) => item.en || item.zh)
      : []
  }
}

export function normalizeHomeStatsContent(body: Record<string, unknown>): HomeStatsContent {
  return {
    items: Array.isArray(body.items)
      ? body.items.slice(0, 4).map((item) => {
          const stat = item && typeof item === 'object' ? item as Record<string, unknown> : {}
          const value = stat.value && typeof stat.value === 'object' ? stat.value as Record<string, unknown> : {}
          const label = stat.label && typeof stat.label === 'object' ? stat.label as Record<string, unknown> : {}
          return {
            value: { en: clean(value.en, 120), zh: clean(value.zh, 120) },
            label: { en: clean(label.en, 240), zh: clean(label.zh, 240) }
          }
        }).filter((item) => item.value.en || item.value.zh || item.label.en || item.label.zh)
      : []
  }
}

export function normalizeHomeLabContent(body: Record<string, unknown>): HomeLabContent {
  const link = body.link && typeof body.link === 'object' ? body.link as Record<string, unknown> : {}
  return {
    title: localized(body, 'title'),
    subtitle: localized(body, 'subtitle'),
    points: Array.isArray(body.points)
      ? body.points.slice(0, 3).map((point) => {
          const item = point && typeof point === 'object' ? point as Record<string, unknown> : {}
          return { en: clean(item.en, 1000), zh: clean(item.zh, 1000) }
        })
      : [],
    link: {
      text: {
        en: clean(link.en, 240),
        zh: clean(link.zh, 240)
      },
      href: internalPath(link.href)
    },
    cards: Array.isArray(body.cards)
      ? body.cards.slice(0, 4).map((card) => {
          const item = card && typeof card === 'object' ? card as Record<string, unknown> : {}
          const name = item.name && typeof item.name === 'object' ? item.name as Record<string, unknown> : {}
          const description = item.description && typeof item.description === 'object' ? item.description as Record<string, unknown> : {}
          return {
            name: { en: clean(name.en, 240), zh: clean(name.zh, 240) },
            description: { en: clean(description.en, 1000), zh: clean(description.zh, 1000) }
          }
        })
      : []
  }
}

export function normalizeHomeFacilityContent(body: Record<string, unknown>): HomeFacilityContent {
  const link = body.link && typeof body.link === 'object' ? body.link as Record<string, unknown> : {}
  const categories = Array.isArray(body.categories)
    ? body.categories.slice(0, 12).map((category, index) => {
        const item = category && typeof category === 'object' ? category as Record<string, unknown> : {}
        const name = item.name && typeof item.name === 'object' ? item.name as Record<string, unknown> : {}
        return {
          id: clean(item.id, 80) || 'category-' + (index + 1),
          name: { en: clean(name.en, 240), zh: clean(name.zh, 240) }
        }
      }).filter((category) => category.name.en || category.name.zh)
    : []
  const categoryIds = new Set(categories.map((category) => category.id))
  return {
    title: localized(body, 'title'),
    subtitle: localized(body, 'subtitle'),
    categories,
    link: {
      text: {
        en: clean(link.en, 240),
        zh: clean(link.zh, 240)
      },
      href: internalPath(link.href)
    },
    images: Array.isArray(body.images)
      ? body.images.slice(0, 24).map((image) => {
          const item = image && typeof image === 'object' ? image as Record<string, unknown> : {}
          const categoryId = clean(item.categoryId, 80)
          const caption = item.caption && typeof item.caption === 'object' ? item.caption as Record<string, unknown> : {}
          return {
            categoryId,
            src: clean(item.src, 1000),
            caption: { en: clean(caption.en, 500), zh: clean(caption.zh, 500) }
          }
        }).filter((image) => categoryIds.has(image.categoryId) && (image.src || image.caption.en || image.caption.zh))
      : []
  }
}

export function normalizeHomeExportServicesContent(body: Record<string, unknown>): HomeExportServicesContent {
  const link = body.link && typeof body.link === 'object' ? body.link as Record<string, unknown> : {}
  return {
    title: localized(body, 'title'),
    subtitle: localized(body, 'subtitle'),
    items: Array.isArray(body.items)
      ? body.items.slice(0, 8).map((item) => {
          const value = item && typeof item === 'object' ? item as Record<string, unknown> : {}
          const name = value.name && typeof value.name === 'object' ? value.name as Record<string, unknown> : {}
          const description = value.description && typeof value.description === 'object' ? value.description as Record<string, unknown> : {}
          return {
            name: { en: clean(name.en, 240), zh: clean(name.zh, 240) },
            description: { en: clean(description.en, 1000), zh: clean(description.zh, 1000) }
          }
        }).filter((item) => item.name.en || item.name.zh || item.description.en || item.description.zh)
      : [],
    link: {
      text: { en: clean(link.en, 240), zh: clean(link.zh, 240) },
      href: internalPath(link.href)
    }
  }
}

export function normalizeHomeProductLinesContent(body: Record<string, unknown>): HomeProductLinesContent {
  const link = body.link && typeof body.link === 'object' ? body.link as Record<string, unknown> : {}
  return {
    title: localized(body, 'title'),
    subtitle: localized(body, 'subtitle'),
    link: {
      text: { en: clean(link.en, 240), zh: clean(link.zh, 240) },
      href: internalPath(link.href)
    }
  }
}

export function normalizeHomeAdvantagesContent(body: Record<string, unknown>): HomeAdvantagesContent {
  const link = body.link && typeof body.link === 'object' ? body.link as Record<string, unknown> : {}
  return {
    title: localized(body, 'title'),
    subtitle: localized(body, 'subtitle'),
    link: {
      text: { en: clean(link.en, 240), zh: clean(link.zh, 240) },
      href: internalPath(link.href)
    },
    items: Array.isArray(body.items)
      ? body.items.slice(0, 12).map((item) => {
          const value = item && typeof item === 'object' ? item as Record<string, unknown> : {}
          const name = value.name && typeof value.name === 'object' ? value.name as Record<string, unknown> : {}
          const description = value.description && typeof value.description === 'object' ? value.description as Record<string, unknown> : {}
          return {
            name: { en: clean(name.en, 240), zh: clean(name.zh, 240) },
            description: { en: clean(description.en, 1000), zh: clean(description.zh, 1000) },
            image: clean(value.image, 1000)
          }
        })
      : []
  }
}

function externalUrl(value: unknown) {
  const url = clean(value, 1000)
  if (!url) return ''
  try {
    const parsed = new URL(url)
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') return parsed.toString()
  } catch {
  }
  throw createError({ statusCode: 500, statusMessage: 'Partner links must be valid http(s) URLs' })
}

export function normalizeHomePartnersContent(body: Record<string, unknown>): HomePartnersContent {
  return {
    title: localized(body, 'title'),
    subtitle: localized(body, 'subtitle'),
    items: Array.isArray(body.items)
      ? body.items.slice(0, 12).map((item) => {
          const value = item && typeof item === 'object' ? item as Record<string, unknown> : {}
          return {
            logo: clean(value.logo, 1000),
            href: externalUrl(value.href)
          }
        }).filter((item) => item.logo)
      : []
  }
}

export function normalizeHomeCtaContent(body: Record<string, unknown>): HomeCtaContent {
  return {
    title: localized(body, 'title'),
    subtitle: localized(body, 'subtitle'),
    button: localized(body, 'button'),
    href: internalPath(body.href)
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
