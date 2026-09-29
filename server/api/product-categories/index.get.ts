export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const includeUnpublished = String(query.all || '') === '1'
  if (includeUnpublished) {
    assertAdmin(event)
  }

  // Fixed categories live in code. Avoid DB writes on auth/login probes.
  const paging = parsePagination(query)
  const items = PRODUCT_CATEGORIES.map((item) => ({
    id: item.sortOrder,
    slug: item.slug,
    name: item.name,
    sortOrder: item.sortOrder,
    createdAt: '',
    updatedAt: ''
  }))

  if (!paging.enabled) {
    return { items }
  }

  const total = items.length
  const slice = items.slice(paging.offset, paging.offset + paging.pageSize)
  return {
    items: slice,
    total,
    page: paging.page,
    pageSize: paging.pageSize
  }
})
