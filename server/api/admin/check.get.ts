export default defineApiHandler((event) => {
  setHeader(event, 'Cache-Control', 'no-store')
  assertAdmin(event)
  return { ok: true }
})
