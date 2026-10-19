<template>
  <div v-if="article">
    <section class="bg-[radial-gradient(circle_at_80%_10%,rgba(139,154,171,.14),transparent_26%),linear-gradient(180deg,var(--ui-color-neutral-950)_0%,var(--ui-color-neutral-900)_100%)] py-16 text-white md:py-[72px]">
      <UContainer>
        <NuxtLink to="/news" class="mb-[18px] inline-block text-sm font-semibold text-[#c8ced6] no-underline">{{ $t('news.backToList') }}</NuxtLink>
        <div class="mb-3.5 flex gap-3.5 text-[13px] font-semibold tracking-[.04em] text-[#b7c0cb] uppercase">
          <span>{{ categoryLabel(article.category) }}</span>
          <time :datetime="article.publishedAt">{{ formatDate(article.publishedAt) }}</time>
        </div>
        <h1 class="mb-4 max-w-[18ch] text-4xl leading-[1.1] md:text-5xl">{{ t(article.title) }}</h1>
        <p class="max-w-[48ch] text-lg leading-[1.7] text-[#c8ced6]">{{ t(article.summary) }}</p>
      </UContainer>
    </section>

    <section class="bg-white py-[72px] pb-24">
      <UContainer class="max-w-[820px]">
        <img
          v-if="article.coverUrl"
          class="mb-7 block max-h-[460px] w-full rounded-xl object-cover"
          :src="article.coverUrl"
          :alt="t(article.title)"
          fetchpriority="high"
          decoding="async"
          loading="eager"
        />
        <article ref="articleBody" class="text-[17px] leading-[1.8] text-gray-800 [&_a]:text-[var(--ui-primary)] [&_h2]:my-7 [&_h2]:mb-3 [&_h2]:text-gray-900 [&_h3]:my-7 [&_h3]:mb-3 [&_h3]:text-gray-900 [&_img]:my-6 [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:rounded-[10px] [&_li]:mb-2 [&_ol]:mb-[18px] [&_ol]:list-decimal [&_ol]:pl-[22px] [&_p]:mb-[18px] [&_ul]:mb-[18px] [&_ul]:list-disc [&_ul]:pl-[22px]" v-html="t(article.content)"></article>
        <div class="mt-9">
          <NuxtLink to="/contact" class="inline-flex min-h-[46px] items-center justify-center rounded-full bg-[var(--ui-color-neutral-950)] px-5 text-sm font-semibold text-white no-underline">{{ $t('news.detailCta') }}</NuxtLink>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
type Localized = { en: string; zh: string }

type NewsItem = {
  slug: string
  category: string
  title: Localized
  summary: Localized
  content: Localized
  coverUrl: string | null
  publishedAt: string
  updatedAt: string
}

const route = useRoute()
const t = useLocalized()
const { locale, t: i18nT } = useI18n()
type CategoryItem = { slug: string; name: { en: string; zh: string } }
const { data: categoriesData } = await useApiFetch<{ items: CategoryItem[] }>('/api/news-categories', {
  key: 'news-categories'
})
function categoryLabel(slug: string) {
  const found = (categoriesData.value?.items || []).find((item) => item.slug === slug)
  return found ? t(found.name) : slug
}
const slug = computed(() => String(route.params.slug || ''))

const { data: article, error } = await useApiFetch<NewsItem>(() => `/api/news/${slug.value}`, {
  key: () => `news-${slug.value}`
})

if (error.value || !article.value) {
  throw createError({ statusCode: 500, statusMessage: 'News not found' })
}

usePageSeo({
  title: computed(() => `${t(article.value!.title)} | Cerotd`),
  description: computed(() => t(article.value!.summary)),
  path: `/news/${slug.value}`,
  image: computed(() => article.value?.coverUrl || null)
})

const siteUrl = useSiteUrl()
const articleBody = ref<HTMLElement | null>(null)
const imageFallback = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=='

function bindContentImages() {
  const rootEl = articleBody.value
  if (!rootEl) return
  rootEl.querySelectorAll('img').forEach((img) => {
    if (img.dataset.fallbackBound === '1') return
    img.dataset.fallbackBound = '1'
    img.addEventListener('error', () => {
      if (img.getAttribute('src') === imageFallback) return
      img.setAttribute('src', imageFallback)
    })
  })
}

onMounted(bindContentImages)
onUpdated(bindContentImages)

const articleJsonLd = computed(() => {
  if (!article.value) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: t(article.value.title),
    description: t(article.value.summary),
    image: article.value.coverUrl
      ? [`${siteUrl}${article.value.coverUrl.startsWith('/') ? article.value.coverUrl : '/' + article.value.coverUrl}`]
      : undefined,
    datePublished: article.value.publishedAt,
    dateModified: article.value.updatedAt || article.value.publishedAt,
    mainEntityOfPage: `${siteUrl}/news/${article.value.slug}`,
    author: {
      '@type': 'Organization',
      name: 'Cerotd'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cerotd',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.webp`
      }
    }
  }
})

const newsBreadcrumbJsonLd = computed(() => {
  if (!article.value) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: i18nT('common.home'),
        item: siteUrl
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: i18nT('common.news'),
        item: `${siteUrl}/news`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: t(article.value.title),
        item: `${siteUrl}/news/${article.value.slug}`
      }
    ]
  }
})

useHead({
  script: computed(() => {
    const scripts = []
    if (articleJsonLd.value) {
      scripts.push({
        type: 'application/ld+json' as 'application/json',
        innerHTML: JSON.stringify(articleJsonLd.value)
      })
    }
    if (newsBreadcrumbJsonLd.value) {
      scripts.push({
        type: 'application/ld+json' as 'application/json',
        innerHTML: JSON.stringify(newsBreadcrumbJsonLd.value)
      })
    }
    return scripts
  })
})

function formatDate(value: string) {
  const date = new Date(value.includes('T') ? value : value.replace(' ', 'T') + 'Z')
  if (Number.isNaN(date.getTime())) return value.slice(0, 10)
  return new Intl.DateTimeFormat(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date)
}
</script>
