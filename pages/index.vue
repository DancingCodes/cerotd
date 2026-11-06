<template>
  <div>
  <section
    class="relative flex min-h-[78vh] items-center overflow-hidden bg-[#070b12] py-24 pt-30 text-white max-md:min-h-[86vh] max-md:py-22 max-md:pt-27.5">
    <div class="absolute inset-0" aria-hidden="true">
      <img v-if="heroContent.backgroundImage" class="size-full scale-[1.04] object-cover object-[center_40%] saturate-[.78] contrast-[1.05]"
        :src="heroContent.backgroundImage" alt="" fetchpriority="high" decoding="async" />
    </div>
    <UContainer class="relative z-10 max-w-205 px-6">
      <p v-if="heroContent.badge" class="mb-5 text-[12px] font-semibold tracking-[.16em] text-[#a8b0ba] uppercase">{{ heroContent.badge }}</p>
      <h1
        class="mb-4.5 max-w-[18ch] text-[64px] leading-[1.06] font-semibold tracking-normal max-md:max-w-none max-md:text-[42px]">
        {{ heroContent.title }}</h1>
      <p class="mb-7 max-w-[44ch] text-[18px] leading-[1.7] font-normal text-white/78 max-md:text-[16px]">{{ heroContent.subtitle }}</p>
      <div class="mb-7 flex flex-wrap gap-3">
        <NuxtLink v-if="heroContent.ctaPrimary.text && heroContent.ctaPrimary.href" :to="heroContent.ctaPrimary.href"
          class="flex min-h-12 items-center justify-center rounded-full bg-white px-5.5 text-[14px] font-semibold tracking-[.01em] text-[#070b12] no-underline transition hover:bg-[#e8eef3]">
          {{ heroContent.ctaPrimary.text }}</NuxtLink>
        <NuxtLink v-if="heroContent.ctaSecondary.text && heroContent.ctaSecondary.href" :to="heroContent.ctaSecondary.href"
          class="flex min-h-12 items-center justify-center rounded-full border border-white/[.28] bg-transparent px-5.5 text-[14px] font-semibold tracking-[.01em] text-white no-underline transition hover:border-white/[.55] hover:bg-white/4">
          {{ heroContent.ctaSecondary.text }}</NuxtLink>
      </div>
      <ul class="flex flex-wrap gap-2.5">
        <li v-for="(label, index) in heroContent.trustLabels" :key="index"
          class="rounded-full border border-white/16 bg-white/4 px-3 py-2 text-[12px] font-medium tracking-[.04em] text-white/82">
          {{ label }}</li>
      </ul>
    </UContainer>
  </section>

  <section class="border-b border-[#e6e8ec] bg-white">
    <UContainer
      class="max-w-295 px-6 grid grid-cols-2 min-[900px]:grid-cols-4 [&>div]:py-7 [&>div:nth-child(odd)]:border-r [&>div:nth-child(odd)]:border-[#e6e8ec] [&>div:nth-child(odd)]:pr-6 [&>div:nth-child(even)]:pl-6 [&>div:nth-child(-n+2)]:border-b [&>div:nth-child(-n+2)]:border-[#e6e8ec] min-[900px]:[&>div]:border-b-0 min-[900px]:[&>div]:border-r min-[900px]:[&>div]:border-[#e6e8ec] min-[900px]:[&>div]:py-8.5 min-[900px]:[&>div]:pr-6 min-[900px]:[&>div:not(:first-child)]:pl-6 min-[900px]:[&>div:last-child]:border-r-0">
      <div v-for="(item, index) in statsContent.items" :key="index">
        <p class="mb-1.5 text-[28px] font-semibold text-[#10141a]">{{ item.value }}</p>
        <p class="text-[13px] font-medium tracking-[.02em] text-[#66707c]">{{ item.label }}</p>
      </div>
    </UContainer>
  </section>

  <section v-if="labContent" class="bg-[#f3f4f6] py-24 md:py-28">
    <UContainer class="max-w-295 px-6">
      <div class="grid grid-cols-1 items-start gap-7 min-[960px]:grid-cols-[.95fr_1.05fr] min-[960px]:gap-12">
        <div>
          <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold tracking-normal text-[#10141a] max-md:text-[32px]">
            {{ labContent.title }}</h2>
          <p class="text-4.25 leading-[1.7] text-[#66707c]">{{ labContent.subtitle }}</p>
          <ul class="my-7 flex flex-col gap-3.5">
            <li v-for="(point, index) in labContent.points" :key="index" class="border-t border-[#e6e8ec] pt-3.5 text-base leading-[1.7] text-[#3d4654]">
              {{ point }}</li>
          </ul>
          <NuxtLink v-if="labContent.link.text && labContent.link.href" :to="labContent.link.href" class="text-sm font-semibold tracking-[.02em] text-[#3f7f88] no-underline">{{ labContent.link.text }}</NuxtLink>
        </div>
        <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          <article v-for="(item, index) in labContent.cards" :key="index"
            class="grid min-h-full grid-cols-[42px_1fr] gap-3.5 rounded-xl border border-[#e6e8ec] bg-white px-5 py-5.5">
            <p class="text-3.25 font-semibold tracking-[.08em] text-[#a8b0ba]">0{{ index + 1 }}</p>
            <div>
              <h3 class="mb-2 text-lg font-semibold text-[#10141a]">{{ item.name }}</h3>
              <p class="text-3.75 leading-[1.7] text-[#66707c]">{{ item.description }}</p>
            </div>
          </article>
        </div>
      </div>
    </UContainer>
  </section>


  <section v-if="facilityContent" class="bg-white py-24 md:py-28">
    <UContainer class="max-w-295 px-6">
      <div class="max-w-155">
        <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold tracking-normal text-[#10141a] max-md:text-[32px]">{{
          facilityContent.title }}</h2>
        <p class="text-4.25 leading-[1.7] text-[#66707c]">{{ facilityContent.subtitle }}</p>
      </div>
      <div class="my-6 mt-8 flex flex-wrap gap-2.5" role="tablist">
        <button v-for="category in facilityCategories" :key="category.id" type="button"
          class="min-h-10 cursor-pointer rounded-full border px-4 text-[14px] font-semibold transition hover:border-[#cfd8e3]"
          :class="activeCategoryId === category.id ? 'border-[#0f4c56] bg-[#0f4c56] text-white' : 'border-[#e8edf2] bg-[#f3f4f6] text-[#3d4654]'"
          role="tab" :aria-selected="activeCategoryId === category.id" @click="setFacilityCategory(category.id)">
          {{ category.name }}
        </button>
      </div>
      <div class="grid grid-cols-2 gap-3.5 min-[900px]:grid-cols-3 min-[900px]:gap-4">
        <button v-for="(item, index) in facilityVisibleImages" :key="item.src" type="button"
          class="block w-full cursor-pointer overflow-hidden rounded-xl border border-[#e8edf2] bg-[#f3f4f6] text-left transition hover:-translate-y-0.75 hover:border-[#cfd8e3] hover:shadow-[0_12px_28px_rgba(15,23,42,.08)]"
          @click="openFacility(index)">
          <img class="block aspect-4/3 w-full object-cover saturate-[.82] contrast-[1.04]" :src="item.src"
            :alt="item.caption" loading="lazy" decoding="async" />
          <p class="px-3.5 py-3 pb-3.5 text-3.25 font-semibold text-[#3d4654]">{{ item.caption }}</p>
        </button>
      </div>
      <div class="mt-7">
        <NuxtLink v-if="facilityContent.link.text && facilityContent.link.href" :to="facilityContent.link.href" class="text-sm font-semibold tracking-[.02em] text-[#3f7f88] no-underline">{{ facilityContent.link.text }}</NuxtLink>
      </div>
    </UContainer>
  </section>

  <ImageLightbox v-model:open="facilityPreviewOpen" v-model:index="facilityPreviewIndex"
    :items="facilityPreviewItems" />

  <section v-if="exportServicesContent" class="bg-[#070b12] py-24 md:py-28">
    <UContainer class="max-w-295 px-6">
      <div class="mb-10 max-w-155">
        <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold tracking-normal text-white max-md:text-[32px]">{{
          exportServicesContent.title }}</h2>
        <p class="text-4.25 leading-[1.7] text-white/62">{{ exportServicesContent.subtitle }}</p>
      </div>
      <div class="grid grid-cols-1 gap-3.5 min-[680px]:grid-cols-2 min-[1080px]:grid-cols-4 min-[1080px]:gap-4">
        <article v-for="(item, index) in exportServicesContent.items" :key="index"
          class="min-h-full rounded-xl border border-white/10 bg-white/4 px-5.5 py-6 transition hover:-translate-y-0.75 hover:border-[#5fd0dc]/45 hover:bg-white/7">
          <p class="mb-7 text-3.25 font-bold tracking-[.08em] text-[#5fd0dc]">0{{ index + 1 }}</p>
          <h3 class="mb-2.5 text-xl font-semibold text-white">{{ item.name }}</h3>
          <p class="text-sm leading-[1.7] text-[#aab3bf]">{{ item.description }}</p>
        </article>
      </div>
      <div class="mt-2 pt-2">
        <NuxtLink v-if="exportServicesContent.link.text && exportServicesContent.link.href" :to="exportServicesContent.link.href" class="text-sm font-semibold tracking-[.02em] text-white/90 no-underline">
          {{ exportServicesContent.link.text }}
        </NuxtLink>
      </div>
    </UContainer>
  </section>

  <section v-if="productLinesContent" class="bg-white py-24 md:py-28">
    <UContainer class="max-w-295 px-6">
      <div class="mb-10 max-w-155">
        <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold tracking-normal text-[#10141a] max-md:text-[32px]">{{
          productLinesContent.title }}</h2>
        <p class="text-4.25 leading-[1.7] text-[#66707c]">{{ productLinesContent.subtitle }}</p>
      </div>
      <div class="grid grid-cols-1 gap-3.5 md:grid-cols-2 min-[1100px]:grid-cols-3">
        <NuxtLink v-for="item in productLines" :key="item.slug" :to="`/products?category=${item.slug}`"
          class="block cursor-pointer rounded-xl border border-[#e8edf2] bg-[#f3f4f6] px-5 py-5.5 text-inherit no-underline transition hover:-translate-y-0.75 hover:border-[#cfd8e3]">
          <h3 class="mb-2.5 text-lg font-bold text-[#0f4c56]">{{ item.name }}</h3>
        </NuxtLink>
      </div>
      <div class="mt-7">
        <NuxtLink v-if="productLinesContent.link.text && productLinesContent.link.href" :to="productLinesContent.link.href" class="text-[14px] font-semibold tracking-[.02em] text-[#3f7f88] no-underline">{{ productLinesContent.link.text }}</NuxtLink>
      </div>
    </UContainer>
  </section>

  <section v-if="advantagesContent?.items.length" class="bg-white py-24 md:py-28">
    <UContainer class="max-w-295 px-6">
      <div class="mb-10 max-w-155">
        <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold tracking-normal text-[#10141a] max-md:text-[32px]">{{
          advantagesContent.title }}</h2>
        <p class="text-4.25 leading-[1.7] text-[#66707c]">{{ advantagesContent.subtitle }}</p>
      </div>
      <div class="mt-10 grid grid-cols-1 gap-4.5 md:grid-cols-2">
        <article v-for="(item, index) in advantagesContent.items" :key="index"
          class="overflow-hidden rounded-xl border border-[#e6e8ec] bg-[#f3f4f6]">
          <div class="aspect-video overflow-hidden bg-[#dfe3e8]">
            <img v-if="item.image" class="block size-full object-cover saturate-[.8] contrast-[1.05]"
              :src="item.image" :alt="item.name" loading="lazy" decoding="async" />
          </div>
          <div class="p-5.5">
            <h3 class="mb-2 text-5.5 font-semibold text-[#10141a]">{{ item.name }}</h3>
            <p class="text-3.75 leading-[1.7] text-[#66707c]">{{ item.description }}</p>
          </div>
        </article>
      </div>
      <div class="mt-7">
        <NuxtLink v-if="advantagesContent.link.text && advantagesContent.link.href" :to="advantagesContent.link.href" class="text-sm font-semibold tracking-[.02em] text-[#3f7f88] no-underline">{{ advantagesContent.link.text }}</NuxtLink>
      </div>
    </UContainer>
  </section>

  <section v-if="partnersContent?.items.length" class="bg-[#f3f4f6] py-24 md:py-28">
    <UContainer class="max-w-295 px-6">
      <div class="mb-10 max-w-155">
        <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold tracking-normal text-[#10141a] max-md:text-[32px]">{{
          partnersContent.title }}</h2>
        <p class="text-4.25 leading-[1.7] text-[#66707c]">{{ partnersContent.subtitle }}</p>
      </div>
      <div class="mt-10 grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <a v-for="(partner, index) in partnersContent.items" :key="index"
          class="flex h-30 cursor-pointer items-center justify-center rounded-xl border border-[#e1e4e8] bg-white px-5.5 py-5 no-underline transition hover:-translate-y-0.5 hover:border-[#cfd8e3]"
          :href="partner.href || undefined" :target="partner.href ? '_blank' : undefined" :rel="partner.href ? 'noopener noreferrer' : undefined" :aria-label="$t('common.partnerWebsite')">
          <img class="block h-14 w-full max-w-40 object-contain object-center opacity-90" :src="partner.logo"
            alt="" loading="lazy" decoding="async" />
        </a>
      </div>
    </UContainer>
  </section>

  <section v-if="ctaContent" class="bg-[#f3f4f6] pb-24 md:pb-28">
    <UContainer class="max-w-295 px-6">
      <div
        class="flex flex-col gap-6 rounded-[12px] border border-white/6 bg-[#070b12] px-7 py-10 text-white min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between min-[800px]:px-10 min-[800px]:py-12">
        <div>
          <h2 v-if="ctaContent.title" class="mb-2.5 text-8 font-semibold">{{ ctaContent.title }}</h2>
          <p v-if="ctaContent.subtitle" class="max-w-140 text-base leading-[1.7] text-white/62">{{ ctaContent.subtitle }}</p>
        </div>
        <NuxtLink v-if="ctaContent.button && ctaContent.href" :to="ctaContent.href"
          class="flex min-h-12 items-center justify-center rounded-full bg-white px-5.5 text-sm font-semibold tracking-[.01em] text-neutral-950 no-underline transition hover:bg-[#e8eef3]">
          {{ ctaContent.button }}</NuxtLink>
      </div>
    </UContainer>
  </section>
  </div>
</template>


<script setup lang="ts">
const { t, locale } = useI18n()
const tLocal = useLocalized()

type LocalizedText = { en: string; zh: string }
type HomeHeroContent = {
  backgroundImage: string
  badge: string
  title: string
  subtitle: string
  ctaPrimary: { text: string; href: string }
  ctaSecondary: { text: string; href: string }
  trustLabels: string[]
}

type HomeHeroResponse = {
  content: {
    backgroundImage: string
    badge: LocalizedText
    title: LocalizedText
    subtitle: LocalizedText
    ctaPrimary: { text: LocalizedText; href: string }
    ctaSecondary: { text: LocalizedText; href: string }
    trustLabels: LocalizedText[]
  } | null
}

type HomeStatsResponse = {
  content: { items: Array<{ value: LocalizedText; label: LocalizedText }> } | null
}
type ExportServicesContent = {
  title: string
  subtitle: string
  items: Array<{ name: string; description: string }>
  link: { text: string; href: string }
}
type ExportServicesResponse = { content: { title: LocalizedText; subtitle: LocalizedText; items: Array<{ name: LocalizedText; description: LocalizedText }>; link: { text: LocalizedText; href: string } } | null }
type ProductLinesResponse = { content: { title: LocalizedText; subtitle: LocalizedText; link: { text: LocalizedText; href: string } } | null }
type AdvantagesResponse = { content: { title: LocalizedText; subtitle: LocalizedText; link: { text: LocalizedText; href: string }; items: Array<{ name: LocalizedText; description: LocalizedText; image: string }> } | null }

type HomeLabContent = {
  title: string
  subtitle: string
  points: string[]
  link: { text: string; href: string }
  cards: Array<{ name: string; description: string }>
}
type HomeLabResponse = {
  content: {
    title: LocalizedText
    subtitle: LocalizedText
    points: LocalizedText[]
    link: { text: LocalizedText; href: string }
    cards: Array<{ name: LocalizedText; description: LocalizedText }>
  } | null
}

const { data: homeHeroData } = await useApiFetch<HomeHeroResponse>('/api/page-content/home/hero')
const { data: homeStatsData } = await useApiFetch<HomeStatsResponse>('/api/page-content/home/stats')
const { data: homeLabData } = await useApiFetch<HomeLabResponse>('/api/page-content/home/lab')
const { data: exportServicesData } = await useApiFetch<ExportServicesResponse>('/api/page-content/home/export-services')
const { data: productLinesData } = await useApiFetch<ProductLinesResponse>('/api/page-content/home/product-lines')
const { data: advantagesData } = await useApiFetch<AdvantagesResponse>('/api/page-content/home/advantages')
type PartnersResponse = { content: { title: LocalizedText; subtitle: LocalizedText; items: Array<{ logo: string; href: string }> } | null }
const { data: partnersData } = await useApiFetch<PartnersResponse>('/api/page-content/home/partners')
type CtaResponse = { content: { title: LocalizedText; subtitle: LocalizedText; button: LocalizedText; href: string } | null }
const { data: ctaData } = await useApiFetch<CtaResponse>('/api/page-content/home/cta')
const emptyHeroContent = computed(() => ({
  backgroundImage: '',
  badge: '',
  title: '',
  subtitle: '',
  ctaPrimary: { text: '', href: '' },
  ctaSecondary: { text: '', href: '' },
  trustLabels: []
}))
const localizedHero = (value: LocalizedText) => locale.value === 'zh' ? value.zh : value.en
const heroContent = computed<HomeHeroContent>(() => {
  const content = homeHeroData.value?.content
  if (!content) return emptyHeroContent.value
  return {
    backgroundImage: content.backgroundImage || '',
    badge: localizedHero(content.badge),
    title: localizedHero(content.title),
    subtitle: localizedHero(content.subtitle),
    ctaPrimary: { text: localizedHero(content.ctaPrimary.text), href: content.ctaPrimary.href || '' },
    ctaSecondary: { text: localizedHero(content.ctaSecondary.text), href: content.ctaSecondary.href || '' },
    trustLabels: (content.trustLabels || []).map(localizedHero).filter(Boolean)
  }
})
const statsContent = computed(() => ({
  items: (homeStatsData.value?.content?.items || []).map((item) => {
    const localize = (value: LocalizedText) => locale.value === 'zh' ? value.zh : value.en
    return { value: localize(item.value), label: localize(item.label) }
  }).filter((item) => item.value || item.label)
}))
const localizeLabText = (value: LocalizedText) => locale.value === 'zh' ? value.zh : value.en
const labContent = computed<HomeLabContent | null>(() => {
  const content = homeLabData.value?.content
  if (!content) return null
  const localizedContent = {
    title: localizeLabText(content.title),
    subtitle: localizeLabText(content.subtitle),
    points: (content.points || []).map(localizeLabText).filter(Boolean),
    link: { text: localizeLabText(content.link.text), href: content.link.href || '' },
    cards: (content.cards || []).map((item) => ({
      name: localizeLabText(item.name),
      description: localizeLabText(item.description)
    })).filter((item) => item.name || item.description)
  }
  return Object.values(localizedContent).some((value) => {
    if (typeof value === 'string') return Boolean(value)
    if (Array.isArray(value)) return value.length > 0
    return Boolean(value.text || value.href)
  }) ? localizedContent : null
})

usePageSeo({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
  path: '/'
})

useHead({
  script: [
    {
      type: 'application/ld+json' as 'application/json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Cerotd',
        url: useSiteUrl(),
        logo: `${useSiteUrl()}/images/logo.webp`
      })
    }
  ]
})

const partnersContent = computed(() => {
  const content = partnersData.value?.content
  if (!content) return null
  const localize = (value: LocalizedText) => locale.value === 'zh' ? value.zh : value.en
  return {
    title: localize(content.title),
    subtitle: localize(content.subtitle),
    items: (content.items || []).filter((item) => item.logo)
  }
})
const ctaContent = computed(() => {
  const content = ctaData.value?.content
  if (!content) return null
  const localize = (value: LocalizedText) => locale.value === 'zh' ? value.zh : value.en
  const localized = {
    title: localize(content.title),
    subtitle: localize(content.subtitle),
    button: localize(content.button),
    href: content.href || ''
  }
  return localized.title || localized.subtitle || (localized.button && localized.href) ? localized : null
})

type ProductCategory = { slug: string; name: { en: string; zh: string } }
const { data: productCategories } = await useApiFetch<{ items: ProductCategory[] }>('/api/product-categories')
const productLines = computed(() => productCategories.value?.items.map((item) => ({
  slug: item.slug,
  name: tLocal(item.name)
})) || [])
const localizeProductLinesText = (value: LocalizedText) => locale.value === 'zh' ? value.zh : value.en
const productLinesContent = computed(() => {
  const content = productLinesData.value?.content
  if (!content) return null
  return {
    title: localizeProductLinesText(content.title),
    subtitle: localizeProductLinesText(content.subtitle),
    link: { text: localizeProductLinesText(content.link.text), href: content.link.href || '' }
  }
})

const localizeAdvantagesText = (value: LocalizedText) => locale.value === 'zh' ? value.zh : value.en
const advantagesContent = computed(() => {
  const content = advantagesData.value?.content
  if (!content) return null
  return {
    title: localizeAdvantagesText(content.title),
    subtitle: localizeAdvantagesText(content.subtitle),
    link: { text: localizeAdvantagesText(content.link.text), href: content.link.href || '' },
    items: (content.items || []).map((item) => ({
      name: localizeAdvantagesText(item.name),
      description: localizeAdvantagesText(item.description),
      image: item.image || ''
    }))
  }
})


type FacilityImage = {
  categoryId: string
  src: string
  caption: string
}

type FacilityContentResponse = {
  content: {
    title: LocalizedText
    subtitle: LocalizedText
    categories: Array<{ id: string; name: LocalizedText }>
    link: { text: LocalizedText; href: string }
    images: Array<{ categoryId: string; src: string; caption: LocalizedText }>
  } | null
}
const { data: homeFacilityData } = await useApiFetch<FacilityContentResponse>('/api/page-content/home/facility')
const localizeFacilityText = (value: LocalizedText) => locale.value === 'zh' ? value.zh : value.en
const facilityContent = computed(() => {
  const content = homeFacilityData.value?.content
  if (!content) return null
  const localized = {
    title: localizeFacilityText(content.title),
    subtitle: localizeFacilityText(content.subtitle),
    categories: (content.categories || []).map((category) => ({ id: category.id, name: localizeFacilityText(category.name) })).filter((category) => category.name),
    link: { text: localizeFacilityText(content.link.text), href: content.link.href || '' },
    images: (content.images || []).map((item) => ({ categoryId: item.categoryId, src: item.src, caption: localizeFacilityText(item.caption) })).filter((item) => item.src)
  }
  return localized.images.length ? localized : null
})
const facilityCategories = computed(() => facilityContent.value?.categories.filter((category) => facilityContent.value!.images.some((item) => item.categoryId === category.id)) || [])
const activeCategoryId = ref('')
const facilityPreviewOpen = ref(false)
const facilityPreviewIndex = ref(0)

const facilityVisibleImages = computed<FacilityImage[]>(() => facilityContent.value?.images.filter((item) => item.categoryId === activeCategoryId.value) || [])
const facilityPreviewItems = computed(() => facilityVisibleImages.value.map((item) => ({
  src: item.src,
  alt: item.caption
})))
watch(facilityCategories, (categories) => {
  if (!categories.some((category) => category.id === activeCategoryId.value)) activeCategoryId.value = categories[0]?.id || ''
}, { immediate: true })

function setFacilityCategory(categoryId: string) {
  activeCategoryId.value = categoryId
  facilityPreviewOpen.value = false
  facilityPreviewIndex.value = 0
}

function openFacility(index: number) {
  facilityPreviewIndex.value = index
  facilityPreviewOpen.value = true
}

const localizeExportText = (value: LocalizedText) => locale.value === 'zh' ? value.zh : value.en
const exportServicesContent = computed<ExportServicesContent | null>(() => {
  const content = exportServicesData.value?.content
  if (!content) return null
  const localized = {
    title: localizeExportText(content.title),
    subtitle: localizeExportText(content.subtitle),
    items: (content.items || []).map((item) => ({ name: localizeExportText(item.name), description: localizeExportText(item.description) })).filter((item) => item.name || item.description),
    link: { text: localizeExportText(content.link.text), href: content.link.href || '' }
  }
  return localized.items.length || localized.title || localized.subtitle || localized.link.text ? localized : null
})

</script>
