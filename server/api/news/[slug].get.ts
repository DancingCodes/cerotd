export default defineApiHandler(async (event) => {
  const db = useDB(event)
  const slug = getRouterParam(event, 'slug')
  if (!slug) {
    throw createError({ statusCode: 500, statusMessage: 'slug is required' })
  }

  const query = getQuery(event)
  const includeUnpublished = String(query.all || '') === '1'
  if (includeUnpublished) {
    assertAdmin(event)
  }

  const row = includeUnpublished
    ? await db.prepare('SELECT * FROM news WHERE slug = ?').bind(slug).first<NewsRow>()
    : await db
        .prepare('SELECT * FROM news WHERE slug = ? AND is_published = 1')
        .bind(slug)
        .first<NewsRow>()

  if (!row) {
    throw createError({ statusCode: 500, statusMessage: 'News not found' })
  }

  const category = await findNewsCategory(db, row.category)
  if (!category) {
    throw createError({ statusCode: 500, statusMessage: 'News category not found' })
  }

  return {
    ...mapNews(row),
    category: {
      slug: category.slug,
      name: { en: category.name_en, zh: category.name_zh }
    }
  }
})
