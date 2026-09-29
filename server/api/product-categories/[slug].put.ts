export default defineEventHandler(() => {
  throw createError({
    statusCode: 403,
    statusMessage: 'Product categories are fixed and cannot be updated'
  })
})
