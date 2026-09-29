export default defineEventHandler((event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  assertAdmin(event)
  return { ok: true }
})
