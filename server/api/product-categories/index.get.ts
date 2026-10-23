export default defineApiHandler(async (event) => {
  const db = useDB(event)
  const query = getQuery(event)
  const paging = parsePagination(query)
  const orderSql = 'ORDER BY sort_order ASC, id ASC'

  if (!paging.enabled) {
    const result = await db.prepare(`SELECT * FROM products_categories ${orderSql}`).all<ProductCategoryRow>()
    return { items: (result.results || []).map(mapProductCategory) }
  }

  assertAdmin(event)
  const countRow = await db.prepare('SELECT COUNT(*) AS count FROM products_categories').first<{ count: number }>()
  const total = Number(countRow?.count || 0)
  const result = await db
    .prepare(`SELECT * FROM products_categories ${orderSql} LIMIT ? OFFSET ?`)
    .bind(paging.pageSize, paging.offset)
    .all<ProductCategoryRow>()

  return {
    items: (result.results || []).map(mapProductCategory),
    total,
    page: paging.page,
    pageSize: paging.pageSize
  }
})
