export default defineApiHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 500, statusMessage: 'slug is required' })
  }

  const current = await db.prepare('SELECT id FROM products WHERE slug = ?').bind(slug).first()
  if (!current) {
    throw createError({ statusCode: 500, statusMessage: 'Product not found' })
  }

  await db.prepare('DELETE FROM products WHERE slug = ?').bind(slug).run()
  return { ok: true }
})
