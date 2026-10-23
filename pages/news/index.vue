<template>
  <div>
    <section class="bg-[radial-gradient(circle_at_80%_10%,rgba(139,154,171,.14),transparent_26%),linear-gradient(180deg,#070b12_0%,#121821_100%)] py-18 text-white md:py-22">
      <UContainer class="max-w-295 px-6">
        <h1 class="mb-4.5 text-[56px] leading-[1.08] tracking-normal">{{ $t('news.hero.title') }}</h1>
        <p class="max-w-[36ch] text-[20px] leading-[1.7] text-[#c8ced6]">{{ $t('news.hero.subtitle') }}</p>
      </UContainer>
    </section>

    <section class="bg-[#f3f4f6] py-24 md:py-30">
      <UContainer class="max-w-295 px-6">
        <div class="mb-9 max-w-180">
          <h2 class="mb-3.5 text-[36px] tracking-normal text-[#111827]">{{ $t('news.listTitle') }}</h2>
          <p class="text-[17px] leading-[1.7] text-[#4b5563]">{{ $t('news.listSubtitle') }}</p>
        </div>

        <div class="mb-7 flex flex-wrap gap-2.5" role="tablist" :aria-label="$t('news.listTitle')">
          <button
            type="button"
            class="min-h-10 cursor-pointer rounded-full border border-[#d7dde5] bg-white px-4 text-[14px] font-medium text-[#4b5563] transition hover:border-[#b8c2cf] hover:text-[#111827]"
            :class="{ 'border-[#3f7f88]/45 bg-[#3f7f88]/10 text-[#0f4c56]': !selectedCategory }"
            role="tab"
            :aria-selected="!selectedCategory"
            @click="setCategory('')"
          >
            {{ $t('news.filterAll') }}
          </button>
          <button
            v-for="category in categories"
            :key="category.slug"
            type="button"
            class="min-h-10 cursor-pointer rounded-full border border-[#d7dde5] bg-white px-4 text-[14px] font-medium text-[#4b5563] transition hover:border-[#b8c2cf] hover:text-[#111827]"
            :class="{ 'border-[#3f7f88]/45 bg-[#3f7f88]/10 text-[#0f4c56]': selectedCategory === category.slug }"
            role="tab"
            :aria-selected="selectedCategory === category.slug"
            @click="setCategory(category.slug)"
          >
            {{ t(category.name) }}
          </button>
        </div>

        <p v-if="pending" class="text-[15px] text-[#6b7280]">{{ $t('news.loading') }}</p>
        <p v-else-if="!newsList.length" class="text-[15px] text-[#6b7280]">{{ $t('news.empty') }}</p>
        <template v-else>
          <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
            <NuxtLink
              v-for="item in newsList"
              :key="item.slug"
              :to="`/news/${item.slug}`"
              class="overflow-hidden rounded-xl border border-[#e8edf2] bg-white no-underline transition-colors hover:border-[#cfd8e3]"
            >
              <div class="aspect-video overflow-hidden bg-[#f3f5f7]">
                <img
                  class="block size-full object-cover saturate-[.86] contrast-[1.04]"
                  :src="item.coverUrl || undefined"
                  :alt="t(item.title)"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div class="p-6">
                <div class="mb-3 flex items-center justify-between gap-3">
                  <span class="text-[12px] font-bold tracking-[.04em] text-[#0f4c56] uppercase">{{ categoryLabel(item.category) }}</span>
                  <time class="text-[13px] text-[#6b7280]" :datetime="item.publishedAt">{{ formatDate(item.publishedAt) }}</time>
                </div>
                <h3 class="mb-2.5 text-[22px] tracking-normal text-[#111827]">{{ t(item.title) }}</h3>
                <p class="mb-4 text-[14px] leading-[1.7] text-[#4b5563]">{{ t(item.summary) }}</p>
                <span class="text-[14px] font-semibold text-[#3f7f88]">{{ $t('common.learnMore') }}</span>
              </div>
            </NuxtLink>
          </div>
          <div v-if="hasMore" class="mt-8 flex justify-center">
            <button
              type="button"
              class="min-h-11 cursor-pointer rounded-full border border-[#d7dde5] bg-white px-5.5 text-[14px] font-semibold text-[#0f4c56] transition hover:border-[#3f7f88]/45 hover:bg-[#3f7f88]/8 disabled:cursor-wait disabled:opacity-65"
              :disabled="loadingMore"
              @click="loadMore"
            >
              {{ loadingMore ? $t('common.loadingMore') : $t('common.showMore') }}
            </button>
          </div>
        </template>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
type Localized = { en: string; zh: string }

type CategoryItem = {
  slug: string
  name: Localized
}

type NewsItem = {
  slug: string
  category: string
  title: Localized
  summary: Localized
  coverUrl: string | null
  publishedAt: string
}

const t = useLocalized()
const { t: i18nT, locale } = useI18n()
const route = useRoute()
const router = useRouter()

usePageSeo({
  title: i18nT('seo.news.title'),
  description: i18nT('seo.news.description'),
  path: '/news'
})

const { data: categoriesData } = await useApiFetch<{ items: CategoryItem[] }>('/api/news-categories', {
  key: 'news-categories'
})
const categories = computed(() => categoriesData.value?.items || [])
const selectedCategory = computed(() => String(route.query.category || '').trim())

function categoryLabel(slug: string) {
  const found = categories.value.find((item) => item.slug === slug)
  return found ? t(found.name) : slug
}

function setCategory(slug: string) {
  router.replace({
    path: '/news',
    query: slug ? { category: slug } : {}
  })
}

function formatDate(value: string) {
  const date = new Date(value.includes('T') ? value : value.replace(' ', 'T') + 'Z')
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  return new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}

const pageSize = 6
type NewsListResponse = {
  items: NewsItem[]
  total?: number
  page?: number
  pageSize?: number
}

const newsList = ref<NewsItem[]>([])
const total = ref(0)
const page = ref(1)
const loadingMore = ref(false)
const hasMore = computed(() => newsList.value.length < total.value)

const listUrl = computed(() => {
  const params = new URLSearchParams({
    page: '1',
    pageSize: String(pageSize)
  })
  if (selectedCategory.value) params.set('category', selectedCategory.value)
  return `/api/news?${params.toString()}`
})

const { data, pending } = await useApiFetch<NewsListResponse>(listUrl, {
  key: () => `news-list-${selectedCategory.value || 'all'}`,
  watch: [selectedCategory]
})

watch(
  data,
  (value) => {
    newsList.value = value?.items || []
    total.value = Number(value?.total || newsList.value.length)
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
    const res = await apiFetch<NewsListResponse>(`/api/news?${params.toString()}`)
    const existing = new Set(newsList.value.map((item) => item.slug))
    newsList.value = [
      ...newsList.value,
      ...(res.items || []).filter((item) => !existing.has(item.slug))
    ]
    total.value = Number(res.total || total.value)
    page.value = nextPage
  } finally {
    loadingMore.value = false
  }
}
</script>
