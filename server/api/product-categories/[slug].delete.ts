export default defineApiHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) throw createError({ statusCode: 500, statusMessage: 'slug is required' })

  const current = await db.prepare('SELECT id FROM products_categories WHERE slug = ?').bind(slug).first<{ id: number }>()
  if (!current) throw createError({ statusCode: 500, statusMessage: 'Product category not found' })

  const linked = await db.prepare('SELECT id FROM products WHERE category_id = ? LIMIT 1').bind(current.id).first()
  if (linked) throw createError({ statusCode: 500, statusMessage: 'Product category has products. Delete or move them first.' })

  await db.prepare('DELETE FROM products_categories WHERE id = ?').bind(current.id).run()
  return { ok: true }
})
