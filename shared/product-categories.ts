export type ProductCategory = {
  slug: string
  name: {
    en: string
    zh: string
  }
  sortOrder: number
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    slug: 'gasoline-engine-oil',
    name: { en: 'Gasoline Engine Oil', zh: '汽油机油' },
    sortOrder: 1
  },
  {
    slug: 'diesel-engine-oil',
    name: { en: 'Diesel Engine Oil', zh: '柴油机油' },
    sortOrder: 2
  },
  {
    slug: 'gear-oil',
    name: { en: 'Gear Oil', zh: '齿轮油' },
    sortOrder: 3
  },
  {
    slug: 'motorcycle-oil',
    name: { en: 'Motorcycle Oil', zh: '摩托车油' },
    sortOrder: 4
  },
  {
    slug: 'anti-wear-hydraulic-oil',
    name: { en: 'Anti-wear Hydraulic Oil', zh: '抗磨液压油' },
    sortOrder: 5
  },
  {
    slug: 'new-energy-oil',
    name: { en: 'New Energy Oil', zh: '新能源专用油' },
    sortOrder: 6
  },
  {
    slug: 'antifreeze-coolant',
    name: { en: 'Antifreeze / Coolant', zh: '防冻液/冷却液' },
    sortOrder: 7
  },
  {
    slug: 'transmission-oil',
    name: { en: 'Transmission Oil', zh: '变速箱油' },
    sortOrder: 8
  },
  {
    slug: 'grease',
    name: { en: 'Grease', zh: '润滑脂' },
    sortOrder: 9
  }
]

export function getProductCategory(slug: string) {
  return PRODUCT_CATEGORIES.find((item) => item.slug === slug) || null
}

export function isProductCategorySlug(slug: string) {
  return PRODUCT_CATEGORIES.some((item) => item.slug === slug)
}
