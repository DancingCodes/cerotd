<template>
  <div>
    <section class="relative flex min-h-[78vh] items-center overflow-hidden bg-neutral-950 py-24 pt-30 text-white max-md:min-h-[86vh] max-md:py-22 max-md:pt-27.5">
      <div class="absolute inset-0" aria-hidden="true">
        <img class="size-full scale-[1.04] object-cover object-[center_40%] saturate-[.78] contrast-[1.05]" src="/images/hero-bg.webp" alt="" fetchpriority="high" decoding="async" />
      </div>
      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,11,18,.88)_0%,rgba(7,11,18,.72)_42%,rgba(7,11,18,.34)_100%),linear-gradient(180deg,rgba(7,11,18,.28)_0%,rgba(7,11,18,.78)_100%)]" aria-hidden="true"></div>
      <UContainer class="relative z-10 max-w-205">
        <p class="mb-5 text-xs font-semibold tracking-[.16em] text-dimmed uppercase">{{ $t('home.badge') }}</p>
        <h1 class="mb-4.5 max-w-[18ch] text-16 leading-[1.06] font-semibold max-md:max-w-none max-md:text-10.5">{{ $t('home.hero.title') }}</h1>
        <p class="mb-7 max-w-[44ch] text-lg leading-[1.7] text-white/80 max-md:text-base">{{ $t('home.hero.subtitle') }}</p>
        <div class="mb-7 flex flex-wrap gap-3">
          <NuxtLink to="/products" class="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5.5 text-sm font-semibold tracking-[.01em] text-neutral-950 no-underline transition hover:bg-[#e8eef3]">{{ $t('home.hero.ctaPrimary') }}</NuxtLink>
          <NuxtLink to="/contact" class="inline-flex min-h-12 items-center justify-center rounded-full border border-white/30 bg-transparent px-5.5 text-sm font-semibold tracking-[.01em] text-white no-underline transition hover:border-white/60 hover:bg-white/4">{{ $t('home.hero.ctaSecondary') }}</NuxtLink>
        </div>
        <ul class="flex flex-wrap gap-2.5">
          <li class="rounded-full border border-white/16 bg-white/4 px-3 py-2 text-xs font-medium tracking-[.04em] text-white/80">{{ $t('home.hero.trust1') }}</li>
          <li class="rounded-full border border-white/16 bg-white/4 px-3 py-2 text-xs font-medium tracking-[.04em] text-white/80">{{ $t('home.hero.trust2') }}</li>
          <li class="rounded-full border border-white/16 bg-white/4 px-3 py-2 text-xs font-medium tracking-[.04em] text-white/80">{{ $t('home.hero.trust3') }}</li>
        </ul>
      </UContainer>
    </section>

    <section class="border-b border-default bg-white" aria-label="Company stats">
      <UContainer class="grid grid-cols-2 min-[900px]:grid-cols-4 [&>div]:py-7 [&>div:nth-child(odd)]:border-r [&>div:nth-child(odd)]:border-default [&>div:nth-child(odd)]:pr-6 [&>div:nth-child(even)]:pl-6 [&>div:nth-child(-n+2)]:border-b [&>div:nth-child(-n+2)]:border-default min-[900px]:[&>div]:border-b-0 min-[900px]:[&>div]:border-r min-[900px]:[&>div]:border-default min-[900px]:[&>div]:py-8.5 min-[900px]:[&>div]:pr-6 min-[900px]:[&>div:not(:first-child)]:pl-6 min-[900px]:[&>div:last-child]:border-r-0">
        <div v-for="n in 4" :key="n">
          <p class="mb-1.5 text-7 font-semibold text-highlighted">{{ $t(`home.stats.item${n}.value`) }}</p>
          <p class="text-3.25 font-medium tracking-[.02em] text-muted">{{ $t(`home.stats.item${n}.label`) }}</p>
        </div>
      </UContainer>
    </section>

    <section class="bg-muted py-24 md:py-28">
      <UContainer>
        <div class="grid grid-cols-1 items-start gap-7 min-[960px]:grid-cols-[.95fr_1.05fr] min-[960px]:gap-12">
          <div>
            <h2 class="mb-3.5 text-10 leading-[1.12] font-semibold text-highlighted max-md:text-8">{{ $t('home.lab.title') }}</h2>
            <p class="text-4.25 leading-[1.7] text-muted">{{ $t('home.lab.subtitle') }}</p>
            <ul class="my-7 flex flex-col gap-3.5">
              <li v-for="n in 3" :key="n" class="border-t border-default pt-3.5 text-base leading-[1.7] text-[#3d4654]">{{ $t(`home.lab.point${n}`) }}</li>
            </ul>
            <NuxtLink to="/about" class="text-sm font-semibold tracking-[.02em] text-primary no-underline">{{ $t('home.lab.link') }}</NuxtLink>
          </div>
          <div class="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
            <article v-for="(item, index) in labItems" :key="item.name" class="grid min-h-full grid-cols-[42px_1fr] gap-3.5 rounded-xl border border-default bg-white px-5 py-5.5">
              <p class="text-3.25 font-semibold tracking-[.08em] text-dimmed">0{{ index + 1 }}</p>
              <div>
                <h3 class="mb-2 text-lg font-semibold text-highlighted">{{ item.name }}</h3>
                <p class="text-3.75 leading-[1.7] text-muted">{{ item.desc }}</p>
              </div>
            </article>
          </div>
        </div>
      </UContainer>
    </section>


    <section class="bg-white py-24 md:py-28">
      <UContainer>
        <div class="max-w-155">
          <h2 class="mb-3.5 text-10 leading-[1.12] font-semibold text-highlighted max-md:text-8">{{ $t("home.facility.title") }}</h2>
          <p class="text-4.25 leading-[1.7] text-muted">{{ $t("home.facility.subtitle") }}</p>
        </div>
        <div class="my-6 mt-8 flex flex-wrap gap-2.5" role="tablist">
          <button
            v-for="tab in facilityTabs"
            :key="tab"
            type="button"
            class="min-h-10 cursor-pointer rounded-full border border-[#e8edf2] bg-muted px-4 text-sm font-semibold text-[#3d4654] transition hover:border-[#cfd8e3]"
            :class="{ 'border-[#0f4c56] bg-[#0f4c56] text-white': activeTab === tab }"
            role="tab"
            :aria-selected="activeTab === tab"
            @click="setFacilityTab(tab)"
          >
            {{ $t(`home.facility.tabs.${tab}`) }}
          </button>
        </div>
        <div class="grid grid-cols-2 gap-3.5 min-[900px]:grid-cols-3 min-[900px]:gap-4">
          <button
            v-for="(item, index) in facilityVisibleImages"
            :key="item.src"
            type="button"
            class="block w-full cursor-pointer overflow-hidden rounded-xl border border-[#e8edf2] bg-muted text-left transition hover:-translate-y-0.75 hover:border-[#cfd8e3] hover:shadow-[0_12px_28px_rgba(15,23,42,.08)]"
            :aria-label="`${item.caption} - ${$t('home.facility.open')}`"
            @click="openFacility(index)"
          >
            <img
              class="block aspect-4/3 w-full object-cover saturate-[.82] contrast-[1.04]"
              :src="item.src"
              :alt="item.caption"
              loading="lazy"
              decoding="async"
            />
            <p class="px-3.5 py-3 pb-3.5 text-3.25 font-semibold leading-normal text-[#3d4654]">{{ item.caption }}</p>
          </button>
        </div>
        <div class="mt-7">
          <NuxtLink to="/about" class="text-sm font-semibold tracking-[.02em] text-primary no-underline">{{ $t("home.facility.cta") }}</NuxtLink>
        </div>
      </UContainer>
    </section>

    <div
      v-if="facilityPreviewOpen && facilityPreviewImage"
      class="fixed inset-0 z-80 flex items-center justify-center bg-linear-to-b from-[#070b12]/70 to-[#070b12]/90 p-6 backdrop-blur-2.5 max-md:p-4"
      role="dialog"
      aria-modal="true"
      :aria-label="facilityPreviewImage.caption"
      @click.self="closeFacility"
    >
      <div class="relative flex w-full max-w-240 items-center justify-center px-12 max-md:px-2">
        <button
          type="button"
          class="absolute -top-10 right-0 z-20 cursor-pointer text-8 leading-none text-white max-md:top-2 max-md:right-3.5"
          :aria-label="$t('home.facility.close')"
          @click="closeFacility"
        >
          ×
        </button>
        <button
          type="button"
          class="absolute -left-2 top-1/2 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-7 text-white max-md:left-3.5"
          :aria-label="$t('common.prev')"
          @click="prevFacility"
        >
          ‹
        </button>
        <img
          class="relative z-10 max-h-[80vh] max-w-full rounded-xl bg-[#0d1524] object-contain shadow-[0_24px_64px_rgba(0,0,0,.45)]"
          :src="facilityPreviewImage.src"
          :alt="facilityPreviewImage.caption"
          loading="eager"
          decoding="async"
        />
        <p class="absolute -bottom-8.5 left-12 right-12 text-center text-3.25 leading-normal text-white/80 max-md:-bottom-7.5 max-md:left-2 max-md:right-2">{{ facilityPreviewImage.caption }}</p>
        <button
          type="button"
          class="absolute -right-2 top-1/2 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-7 text-white max-md:right-3.5"
          :aria-label="$t('common.next')"
          @click="nextFacility"
        >
          ›
        </button>
      </div>
    </div>

    <section class="bg-neutral-950 py-24 md:py-28">
      <UContainer>
        <div class="mb-10 max-w-155">
          <h2 class="mb-3.5 text-10 leading-[1.12] font-semibold text-white max-md:text-8">{{ $t('home.exportServices.title') }}</h2>
          <p class="text-4.25 leading-[1.7] text-white/60">{{ $t('home.exportServices.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-3.5 min-[680px]:grid-cols-2 min-[1080px]:grid-cols-4 min-[1080px]:gap-4">
          <article v-for="(item, index) in exportServices" :key="item.name" class="min-h-full rounded-xl border border-white/10 bg-white/4 px-5.5 py-6 transition hover:-translate-y-0.75 hover:border-[#5fd0dc]/45 hover:bg-white/7">
            <p class="mb-7 text-3.25 font-bold tracking-[.08em] text-[#5fd0dc]">0{{ index + 1 }}</p>
            <h3 class="mb-2.5 text-xl font-semibold text-white">{{ item.name }}</h3>
            <p class="text-sm leading-[1.7] text-[#aab3bf]">{{ item.desc }}</p>
          </article>
        </div>
        <div class="mt-2 pt-2">
          <NuxtLink to="/contact" class="text-sm font-semibold tracking-[.02em] text-white/90 no-underline">
            {{ $t('home.exportServices.cta') }}
          </NuxtLink>
        </div>
      </UContainer>
    </section>

    <section class="bg-white py-24 md:py-28">
      <UContainer>
        <div class="mb-10 max-w-155">
          <h2 class="mb-3.5 text-10 leading-[1.12] font-semibold text-highlighted max-md:text-8">{{ $t('home.lines.title') }}</h2>
          <p class="text-4.25 leading-[1.7] text-muted">{{ $t('home.lines.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-3.5 md:grid-cols-2 min-[1100px]:grid-cols-3">
          <NuxtLink
            v-for="item in productLines"
            :key="item.slug"
            :to="`/products?category=${item.slug}`"
            class="block cursor-pointer rounded-xl border border-[#e8edf2] bg-muted px-5 py-5.5 text-inherit no-underline transition hover:-translate-y-0.75 hover:border-[#cfd8e3]"
          >
            <h3 class="mb-2.5 text-lg font-bold text-[#0f4c56]">{{ item.name }}</h3>
            <p class="text-sm leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </NuxtLink>
        </div>
        <div class="mt-7">
          <NuxtLink to="/products" class="text-sm font-semibold tracking-[.02em] text-primary no-underline">{{ $t('common.viewProducts') }}</NuxtLink>
        </div>
      </UContainer>
    </section>

    <section class="bg-white py-24 md:py-28">
      <UContainer>
        <div class="mb-10 max-w-155">
          <h2 class="mb-3.5 text-10 leading-[1.12] font-semibold text-highlighted max-md:text-8">{{ $t('home.advantages.title') }}</h2>
          <p class="text-4.25 leading-[1.7] text-muted">{{ $t('home.advantages.subtitle') }}</p>
        </div>
        <div class="mt-10 grid grid-cols-1 gap-4.5 md:grid-cols-2">
          <article v-for="(item, index) in advantages" :key="item.name" class="overflow-hidden rounded-xl border border-default bg-muted">
            <div class="aspect-video overflow-hidden bg-[#dfe3e8]">
              <img
                v-if="advantageImages[index]"
                class="block size-full object-cover saturate-[.8] contrast-[1.05]"
                :src="advantageImages[index]"
                :alt="item.name"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="flex min-h-40 size-full items-center justify-center bg-[linear-gradient(135deg,rgba(139,154,171,.12),transparent_42%),#121a28] text-xs font-semibold tracking-[.08em] text-[#8b95a5] uppercase">{{ $t('common.mediaBlank') }}</div>
            </div>
            <div class="p-5.5">
              <h3 class="mb-2 text-5.5 font-semibold text-highlighted">{{ item.name }}</h3>
              <p class="text-3.75 leading-[1.7] text-muted">{{ item.desc }}</p>
            </div>
          </article>
        </div>
        <div class="mt-7">
          <NuxtLink to="/advantages" class="text-sm font-semibold tracking-[.02em] text-primary no-underline">{{ $t('home.advantages.link') }}</NuxtLink>
        </div>
      </UContainer>
    </section>

    <section class="bg-muted py-24 md:py-28">
      <UContainer>
        <div class="mb-10 max-w-155">
          <h2 class="mb-3.5 text-10 leading-[1.12] font-semibold text-highlighted max-md:text-8">{{ $t('home.partners.title') }}</h2>
          <p class="text-4.25 leading-[1.7] text-muted">{{ $t('home.partners.subtitle') }}</p>
        </div>
        <div class="mt-10 grid grid-cols-2 gap-3.5 md:grid-cols-4">
          <a
            v-for="partner in partnerLogos"
            :key="partner.name"
            class="flex h-30 cursor-pointer items-center justify-center rounded-xl border border-[#e1e4e8] bg-white px-5.5 py-5 no-underline transition hover:-translate-y-0.5 hover:border-[#cfd8e3]"
            :href="partner.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="partner.name"
          >
            <img class="block h-14 w-full max-w-40 object-contain object-center opacity-90" :src="partner.logo" :alt="partner.name" loading="lazy" decoding="async" />
          </a>
        </div>
      </UContainer>
    </section>

    <section class="bg-muted pb-24 md:pb-28">
      <UContainer>
        <div class="flex flex-col gap-6 rounded-xl border border-white/6 bg-neutral-950 px-7 py-10 text-white min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between min-[800px]:px-10 min-[800px]:py-12">
          <div>
            <h2 class="mb-2.5 text-8 font-semibold">{{ $t('home.cta.title') }}</h2>
            <p class="max-w-140 text-base leading-[1.7] text-white/60">{{ $t('home.cta.subtitle') }}</p>
          </div>
          <NuxtLink to="/contact" class="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-5.5 text-sm font-semibold tracking-[.01em] text-neutral-950 no-underline transition hover:bg-[#e8eef3]">{{ $t('home.cta.button') }}</NuxtLink>
        </div>
      </UContainer>
    </section>
  </div>
</template>


<script setup lang="ts">
import { PRODUCT_CATEGORIES } from '#shared/product-categories'

const { t, locale } = useI18n()
const tLocal = useLocalized()

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

const partnerLogos = [
  { name: 'SK', logo: '/images/partners/sk.webp', href: 'https://eng.sk.com/' },
  { name: 'ExxonMobil', logo: '/images/partners/exxonmobil.webp', href: 'https://corporate.exxonmobil.com/' },
  { name: 'PetroChina', logo: '/images/partners/petrochina.webp', href: 'https://www.petrochina.com.cn/' },
  { name: 'Sinopec', logo: '/images/partners/sinopec.webp', href: 'https://www.sinopec.com/' },
  { name: 'Infineum', logo: '/images/partners/infineum.webp', href: 'https://www.infineum.com/' },
  { name: 'Afton Chemical', logo: '/images/partners/afton-chemical.webp', href: 'https://www.aftonchemical.com/' },
  { name: 'Chevron', logo: '/images/partners/chevron.webp', href: 'https://www.chevron.com/' },
  { name: 'Lubrizol', logo: '/images/partners/lubrizol.webp', href: 'https://www.lubrizol.com/' }
]

const advantageImages = [
  '/images/factory/8.webp',
  '/images/factory/9.webp',
  '/images/factory/10.webp',
  '/images/factory/11.webp'
]

const productLines = computed(() => {
  locale.value
  return PRODUCT_CATEGORIES.map((item) => ({
    slug: item.slug,
    name: tLocal(item.name),
    desc: t(`home.lines.items.${item.slug}.desc`)
  }))
})

const advantages = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`home.advantages.items.item${n}.name`),
    desc: t(`home.advantages.items.item${n}.desc`)
  }))
})


type FacilityTab = 'plant' | 'production' | 'laboratory'
type FacilityImage = {
  tab: FacilityTab
  src: string
  caption: string
}

const facilityTabs: FacilityTab[] = ['plant', 'production', 'laboratory']
const activeTab = ref<FacilityTab>('plant')
const facilityPreviewOpen = ref(false)
const facilityPreviewIndex = ref(0)

const facilityImages = computed<FacilityImage[]>(() => {
  locale.value
  return [
    { tab: 'plant', src: '/images/factory/10.webp', caption: t('home.facility.captions.plant1') },
    { tab: 'plant', src: '/images/factory/7.webp', caption: t('home.facility.captions.plant2') },
    { tab: 'plant', src: '/images/factory/9.webp', caption: t('home.facility.captions.plant3') },
    { tab: 'production', src: '/images/factory/11.webp', caption: t('home.facility.captions.production1') },
    { tab: 'production', src: '/images/factory/8.webp', caption: t('home.facility.captions.production2') },
    { tab: 'laboratory', src: '/images/factory/1.webp', caption: t('home.facility.captions.lab1') },
    { tab: 'laboratory', src: '/images/factory/2.webp', caption: t('home.facility.captions.lab2') },
    { tab: 'laboratory', src: '/images/factory/3.webp', caption: t('home.facility.captions.lab3') },
    { tab: 'laboratory', src: '/images/factory/4.webp', caption: t('home.facility.captions.lab4') },
    { tab: 'laboratory', src: '/images/factory/5.webp', caption: t('home.facility.captions.lab5') },
    { tab: 'laboratory', src: '/images/factory/6.webp', caption: t('home.facility.captions.lab6') }
  ]
})

const facilityVisibleImages = computed(() => facilityImages.value.filter((item) => item.tab === activeTab.value))
const facilityPreviewImage = computed(() => facilityVisibleImages.value[facilityPreviewIndex.value] || null)

function setFacilityTab(tab: FacilityTab) {
  activeTab.value = tab
  facilityPreviewOpen.value = false
  facilityPreviewIndex.value = 0
}

function openFacility(index: number) {
  facilityPreviewIndex.value = index
  facilityPreviewOpen.value = true
}

function closeFacility() {
  facilityPreviewOpen.value = false
}

function prevFacility() {
  const total = facilityVisibleImages.value.length
  if (!total) return
  facilityPreviewIndex.value = (facilityPreviewIndex.value - 1 + total) % total
}

function nextFacility() {
  const total = facilityVisibleImages.value.length
  if (!total) return
  facilityPreviewIndex.value = (facilityPreviewIndex.value + 1) % total
}

function onFacilityKeydown(event: KeyboardEvent) {
  if (!facilityPreviewOpen.value) return
  if (event.key === 'Escape') closeFacility()
  if (event.key === 'ArrowLeft') prevFacility()
  if (event.key === 'ArrowRight') nextFacility()
}

watch(facilityPreviewOpen, (open) => {
  if (import.meta.client) {
    document.body.style.overflow = open ? 'hidden' : ''
  }
})

onMounted(() => {
  window.addEventListener('keydown', onFacilityKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onFacilityKeydown)
  if (import.meta.client) document.body.style.overflow = ''
})

const exportServices = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`home.exportServices.items.item${n}.name`),
    desc: t(`home.exportServices.items.item${n}.desc`)
  }))
})

const labItems = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`home.lab.items.item${n}.name`),
    desc: t(`home.lab.items.item${n}.desc`)
  }))
})

</script>

