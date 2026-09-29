import { PRODUCT_CATEGORIES, getProductCategory, isProductCategorySlug } from '../../shared/product-categories'

export { PRODUCT_CATEGORIES, getProductCategory, isProductCategorySlug }

export async function resolveProductCategoryId(db: D1Database, slug: string) {
  const category = getProductCategory(slug)
  if (!category) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid product category' })
  }

  const row = await db
    .prepare('SELECT id FROM products_categories WHERE slug = ?')
    .bind(category.slug)
    .first<{ id: number }>()

  if (!row) {
    throw createError({ statusCode: 500, statusMessage: 'Failed to resolve product category' })
  }

  return row.id
}
