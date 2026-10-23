type InquiryRow = {
  id: number
  name: string
  company: string
  created_at: string
  is_read: number
}

export default defineApiHandler(async (event) => {
  assertAdmin(event)
  const db = useDB(event)

  const [productCategories, products, news, inquiries, unread, recent] = await Promise.all([
    db.prepare('SELECT COUNT(*) AS count FROM products_categories').first<{ count: number }>(),
    db.prepare('SELECT COUNT(*) AS count FROM products').first<{ count: number }>(),
    db.prepare('SELECT COUNT(*) AS count FROM news').first<{ count: number }>(),
    db.prepare('SELECT COUNT(*) AS count FROM inquiries').first<{ count: number }>(),
    db.prepare('SELECT COUNT(*) AS count FROM inquiries WHERE is_read = 0').first<{ count: number }>(),
    db.prepare('SELECT id, name, company, created_at, is_read FROM inquiries ORDER BY created_at DESC, id DESC LIMIT 3').all<InquiryRow>()
  ])

  return {
    productCategories: Number(productCategories?.count || 0),
    products: Number(products?.count || 0),
    news: Number(news?.count || 0),
    inquiries: Number(inquiries?.count || 0),
    unreadInquiries: Number(unread?.count || 0),
    recentInquiries: (recent.results || []).map((item) => ({
      id: item.id,
      name: item.name,
      company: item.company,
      createdAt: item.created_at,
      isRead: item.is_read === 1
    }))
  }
})
