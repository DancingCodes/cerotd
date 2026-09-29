import { PRODUCT_CATEGORIES, getProductCategory, isProductCategorySlug } from '../../shared/product-categories'

export { PRODUCT_CATEGORIES, getProductCategory, isProductCategorySlug }

export async function ensureProductCategories(db: D1Database) {
  for (const category of PRODUCT_CATEGORIES) {
    await db
      .prepare(
        `INSERT INTO products_categories (slug, name_en, name_zh, sort_order, is_published)
         VALUES (?, ?, ?, ?, 1)
         ON CONFLICT(slug) DO UPDATE SET
           name_en = excluded.name_en,
           name_zh = excluded.name_zh,
           sort_order = excluded.sort_order,
           is_published = 1,
           updated_at = datetime('now')`
      )
      .bind(category.slug, category.name.en, category.name.zh, category.sortOrder)
      .run()
  }
}

export async function resolveProductCategoryId(db: D1Database, slug: string) {
  const category = getProductCategory(slug)
  if (!category) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid product category' })
  }

  await ensureProductCategories(db)

  const row = await db
    .prepare('SELECT id FROM products_categories WHERE slug = ?')
    .bind(category.slug)
    .first<{ id: number }>()

  if (!row) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to resolve product category' })
  }

  return row.id
}
