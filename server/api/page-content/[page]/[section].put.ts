export default defineApiHandler(async (event) => {
  assertAdmin(event)
  const page = getRouterParam(event, 'page') || ''
  const section = getRouterParam(event, 'section') || ''
  const body = await readBody<Record<string, unknown>>(event)
  assertPageContentKey(page, section)

  const normalizers = {
    hero: normalizeHomeHeroContent,
    stats: normalizeHomeStatsContent,
    lab: normalizeHomeLabContent,
    facility: normalizeHomeFacilityContent,
    'export-services': normalizeHomeExportServicesContent,
    'product-lines': normalizeHomeProductLinesContent,
    advantages: normalizeHomeAdvantagesContent,
    partners: normalizeHomePartnersContent,
    cta: normalizeHomeCtaContent
  } satisfies Record<string, (body: Record<string, unknown>) => unknown>

  const normalize = normalizers[section as keyof typeof normalizers]
  const content = normalize(body || {})
  return savePageContent(event, page, section, content)
})
