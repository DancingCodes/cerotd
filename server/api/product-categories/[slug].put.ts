type UpdateProductCategoryBody = {
  nameEn?: string
  nameZh?: string
  sortOrder?: number
}

export default defineApiHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 500, statusMessage: 'slug is required' })

  const current = await db.prepare('SELECT * FROM products_categories WHERE slug = ?').bind(slug).first<ProductCategoryRow>()
  if (!current) throw createError({ statusCode: 500, statusMessage: 'Product category not found' })

  const body = await readBody<UpdateProductCategoryBody>(event)
  const nameEn = body.nameEn?.trim() ?? current.name_en
  const nameZh = body.nameZh?.trim() ?? current.name_zh
  const sortOrder = body.sortOrder === undefined ? current.sort_order : Number(body.sortOrder)
  if (!nameEn || !nameZh) throw createError({ statusCode: 500, statusMessage: 'nameEn and nameZh are required' })

  const updated = await db
    .prepare(`UPDATE products_categories
      SET name_en = ?, name_zh = ?, sort_order = ?, updated_at = datetime('now')
      WHERE id = ?
      RETURNING *`)
    .bind(nameEn, nameZh, sortOrder, current.id)
    .first<ProductCategoryRow>()

  if (!updated) throw createError({ statusCode: 500, statusMessage: 'Failed to update product category' })
  return mapProductCategory(updated)
})
