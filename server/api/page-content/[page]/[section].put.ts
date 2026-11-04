export default defineApiHandler(async (event) => {
  assertAdmin(event)
  const page = getRouterParam(event, 'page') || ''
  const section = getRouterParam(event, 'section') || ''
  const body = await readBody<Record<string, unknown>>(event)
  const content = normalizeHomeHeroContent(body || {})
  return savePageContent(event, page, section, content)
})
