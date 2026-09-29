export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') || ''
  const category = getProductCategory(slug)
  if (!category) {
    throw createError({ statusCode: 404, statusMessage: 'Category not found' })
  }
  return {
    id: category.sortOrder,
    slug: category.slug,
    name: category.name,
    sortOrder: category.sortOrder,
    isPublished: true,
    createdAt: '',
    updatedAt: ''
  }
})
