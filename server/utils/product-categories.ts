export async function resolveProductCategoryId(db: D1Database, slug: string) {
  const row = await db
    .prepare('SELECT id FROM products_categories WHERE slug = ?')
    .bind(slug)
    .first<{ id: number }>()

  if (!row) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to resolve product category' })
  }

  return row.id
}
