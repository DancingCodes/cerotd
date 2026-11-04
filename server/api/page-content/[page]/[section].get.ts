export default defineApiHandler(async (event) => {
  const page = getRouterParam(event, 'page') || ''
  const section = getRouterParam(event, 'section') || ''
  return findPageContent(event, page, section)
})
