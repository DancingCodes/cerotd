export default defineApiHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)
  const id = Number(getRouterParam(event, 'id'))
  if (!Number.isFinite(id) || id <= 0) {
    throw createError({ statusCode: 500, statusMessage: 'id is required' })
  }

  const current = await db.prepare('SELECT id FROM inquiries WHERE id = ?').bind(id).first()
  if (!current) {
    throw createError({ statusCode: 500, statusMessage: 'Inquiry not found' })
  }

  await db.prepare('DELETE FROM inquiries WHERE id = ?').bind(id).run()
  return { ok: true }
})
