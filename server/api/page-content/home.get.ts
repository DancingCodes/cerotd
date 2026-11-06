export default defineApiHandler(async (event) => {
  const [sections, categoryResult] = await Promise.all([
    findPageContents(event, 'home'),
    useDB(event)
      .prepare('SELECT slug, name_en, name_zh FROM products_categories ORDER BY sort_order, id')
      .all<{ slug: string; name_en: string; name_zh: string }>()
  ])

  return {
    sections: Object.fromEntries(
      Object.entries(sections).map(([section, value]) => [section, value.content])
    ),
    productCategories: (categoryResult.results || []).map((category) => ({
      slug: category.slug,
      name: { en: category.name_en, zh: category.name_zh }
    }))
  }
})
