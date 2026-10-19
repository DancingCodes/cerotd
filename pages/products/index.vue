<template>
  <div>
    <section class="bg-[radial-gradient(circle_at_80%_10%,rgba(139,154,171,.14),transparent_26%),linear-gradient(180deg,var(--color-ink)_0%,var(--color-ink-soft)_100%)] py-[72px] text-white md:py-[88px]">
      <div v-motion-slide-visible-once-bottom class="container">
        <h1 class="mb-[18px] text-4xl leading-[1.08] md:text-[56px]">{{ $t('products.hero.title') }}</h1>
        <p class="max-w-[34ch] text-lg leading-[1.7] text-[#c8ced6] md:text-xl">{{ $t('products.hero.subtitle') }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="bg-white py-24 md:py-[120px]">
      <div class="container">
        <div class="mb-9 max-w-[720px]">
          <h2 class="mb-3.5 text-3xl text-gray-900 md:text-4xl">{{ $t('products.listTitle') }}</h2>
          <p class="text-[17px] leading-[1.7] text-gray-600">{{ $t('products.listSubtitle') }}</p>
        </div>

        <div class="mb-7 flex flex-wrap gap-2.5" role="tablist" :aria-label="$t('products.listTitle')">
          <button
            type="button"
            class="min-h-10 cursor-pointer rounded-full border border-[#d7dde5] bg-white px-4 text-sm font-medium text-gray-600 transition hover:border-[#b8c2cf] hover:text-gray-900"
            :class="{ 'border-[#3f7f88]/45 bg-[#3f7f88]/10 text-[#0f4c56]': !selectedCategory }"
            role="tab"
            :aria-selected="!selectedCategory"
            @click="setCategory('')"
          >
            {{ $t('products.filterAll') }}
          </button>
          <button
            v-for="category in categoryList"
            :key="category.slug"
            type="button"
            class="min-h-10 cursor-pointer rounded-full border border-[#d7dde5] bg-white px-4 text-sm font-medium text-gray-600 transition hover:border-[#b8c2cf] hover:text-gray-900"
            :class="{ 'border-[#3f7f88]/45 bg-[#3f7f88]/10 text-[#0f4c56]': selectedCategory === category.slug }"
            role="tab"
            :aria-selected="selectedCategory === category.slug"
            @click="setCategory(category.slug)"
          >
            {{ t(category.name) }}
          </button>
        </div>

        <p v-if="pending" class="text-[15px] text-gray-500">{{ $t('products.loading') }}</p>
        <p v-else-if="!productList.length" class="text-[15px] text-gray-500">{{ $t('products.empty') }}</p>
        <template v-else>
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2 min-[1100px]:grid-cols-3">
            <NuxtLink
              v-for="item in productList"
              :key="item.slug"
              :to="`/products/${item.slug}`"
              class="overflow-hidden rounded-xl border border-[#e8edf2] bg-white no-underline transition-colors hover:border-[#cfd8e3]"
            >
              <div class="aspect-[4/3] overflow-hidden bg-[#f3f5f7]">
                <img
                  class="block size-full bg-[#f3f5f7] object-contain"
                  :class="{ 'object-cover saturate-[.8] contrast-[1.05]': !(item.coverUrl || item.images[0]) }"
                  :src="item.coverUrl || item.images[0]"
                  :alt="t(item.name)"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div class="p-6">
                <h3 class="mb-2.5 text-xl text-gray-900">{{ t(item.name) }}</h3>
                <p class="mb-4 text-sm leading-[1.7] text-gray-600">{{ t(item.summary) }}</p>
                <span class="text-sm font-semibold text-[var(--color-accent)]">{{ $t('common.learnMore') }}</span>
              </div>
            </NuxtLink>
          </div>
          <div v-if="hasMore" class="mt-8 flex justify-center">
            <button
              type="button"
              class="min-h-11 cursor-pointer rounded-full border border-[#d7dde5] bg-white px-[22px] text-sm font-semibold text-[#0f4c56] transition hover:border-[#3f7f88]/45 hover:bg-[#3f7f88]/[.08] disabled:cursor-wait disabled:opacity-65"
              :disabled="loadingMore"
              @click="loadMore"
            >
              {{ loadingMore ? $t('common.loadingMore') : $t('common.showMore') }}
            </button>
          </div>
        </template>
      </div>
    </section>

  </div>
</template>


<script setup lang="ts">
import { PRODUCT_CATEGORIES } from '#shared/product-categories'

type Localized = { en: string; zh: string }

type ProductItem = {
  slug: string
  name: Localized
  summary: Localized
  coverUrl: string | null
  images: string[]
}

const t = useLocalized()
const { t: i18nT } = useI18n()
const route = useRoute()
const router = useRouter()

usePageSeo({
  title: i18nT('seo.products.title'),
  description: i18nT('seo.products.description'),
  path: '/products'
})

const selectedCategory = computed(() => String(route.query.category || '').trim())

function setCategory(slug: string) {
  router.replace({
    path: '/products',
    query: slug ? { category: slug } : {}
  })
}

const categoryList = PRODUCT_CATEGORIES

const pageSize = 6
type ProductListResponse = {
  items: ProductItem[]
  total?: number
  page?: number
  pageSize?: number
}

const productList = ref<ProductItem[]>([])
const total = ref(0)
const page = ref(1)
const loadingMore = ref(false)
const hasMore = computed(() => productList.value.length < total.value)

const listUrl = computed(() => {
  const params = new URLSearchParams({
    page: '1',
    pageSize: String(pageSize)
  })
  if (selectedCategory.value) params.set('category', selectedCategory.value)
  return `/api/products?${params.toString()}`
})

const { data, pending } = await useApiFetch<ProductListResponse>(listUrl, {
  key: () => `products-list-${selectedCategory.value || 'all'}`,
  watch: [selectedCategory]
})

watch(
  data,
  (value) => {
    productList.value = value?.items || []
    total.value = Number(value?.total || productList.value.length)
    page.value = 1
  },
  { immediate: true }
)

async function loadMore() {
  if (loadingMore.value || !hasMore.value) return
  loadingMore.value = true
  try {
    const nextPage = page.value + 1
    const params = new URLSearchParams({
      page: String(nextPage),
      pageSize: String(pageSize)
    })
    if (selectedCategory.value) params.set('category', selectedCategory.value)
    const res = await apiFetch<ProductListResponse>(`/api/products?${params.toString()}`)
    const existing = new Set(productList.value.map((item) => item.slug))
    productList.value = [
      ...productList.value,
      ...(res.items || []).filter((item) => !existing.has(item.slug))
    ]
    total.value = Number(res.total || total.value)
    page.value = nextPage
  } finally {
    loadingMore.value = false
  }
}
</script>
