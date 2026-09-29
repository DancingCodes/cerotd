export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const includeUnpublished = String(query.all || '') === '1'
  if (includeUnpublished) {
    assertAdmin(event)
  }

  // Product categories are fixed in code. Keep this endpoint for compatibility.
  await ensureProductCategories(useDB(event))

  const paging = parsePagination(query)
  const items = PRODUCT_CATEGORIES.map((item) => ({
    id: item.sortOrder,
    slug: item.slug,
    name: item.name,
    sortOrder: item.sortOrder,
    isPublished: true,
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
