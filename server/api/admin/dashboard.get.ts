export default defineApiHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)

  const [productCategories, products, news, inquiries] = await Promise.all([
    db.prepare('SELECT COUNT(*) AS count FROM products_categories').first<{ count: number }>(),
    db.prepare('SELECT COUNT(*) AS count FROM products').first<{ count: number }>(),
    db.prepare('SELECT COUNT(*) AS count FROM news').first<{ count: number }>(),
    db.prepare('SELECT COUNT(*) AS count FROM inquiries').first<{ count: number }>()
  ])

  return {
    productCategories: Number(productCategories?.count || 0),
    products: Number(products?.count || 0),
    news: Number(news?.count || 0),
    inquiries: Number(inquiries?.count || 0)
  }
})
