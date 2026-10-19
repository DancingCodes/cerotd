<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-media" aria-hidden="true">
        <img class="hero-media-image" src="/images/hero-bg.webp" alt="" fetchpriority="high" decoding="async" />
      </div>
      <div class="hero-overlay" aria-hidden="true"></div>
      <div v-motion-slide-visible-once-bottom class="container hero-content">
        <p class="hero-badge">{{ $t('home.badge') }}</p>
        <h1 class="hero-title">{{ $t('home.hero.title') }}</h1>
        <p class="hero-subtitle">{{ $t('home.hero.subtitle') }}</p>
        <div class="hero-actions">
          <NuxtLink to="/products" class="btn btn-primary">{{ $t('home.hero.ctaPrimary') }}</NuxtLink>
          <NuxtLink to="/contact" class="btn btn-secondary">{{ $t('home.hero.ctaSecondary') }}</NuxtLink>
        </div>
        <ul class="hero-trust">
          <li class="hero-trust-item">{{ $t('home.hero.trust1') }}</li>
          <li class="hero-trust-item">{{ $t('home.hero.trust2') }}</li>
          <li class="hero-trust-item">{{ $t('home.hero.trust3') }}</li>
        </ul>
      </div>
    </section>

    <section class="proof" aria-label="Company stats">
      <div class="container proof-grid">
        <div v-for="n in 4" :key="n" class="proof-item">
          <p class="proof-value">{{ $t(`home.stats.item${n}.value`) }}</p>
          <p class="proof-label">{{ $t(`home.stats.item${n}.label`) }}</p>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section lab">
      <div class="container">
        <div class="lab-grid">
          <div class="lab-copy">
            <h2 class="section-title">{{ $t('home.lab.title') }}</h2>
            <p class="section-subtitle">{{ $t('home.lab.subtitle') }}</p>
            <ul class="lab-points">
              <li v-for="n in 3" :key="n" class="lab-point">{{ $t(`home.lab.point${n}`) }}</li>
            </ul>
            <NuxtLink to="/about" class="section-link">{{ $t('home.lab.link') }}</NuxtLink>
          </div>
          <div class="lab-panel">
            <article v-for="(item, index) in labItems" :key="item.name" class="lab-card">
              <p class="lab-card-index">0{{ index + 1 }}</p>
              <div class="lab-card-body">
                <h3 class="lab-card-title">{{ item.name }}</h3>
                <p class="lab-card-desc">{{ item.desc }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>


    <section v-motion-slide-visible-once-bottom class="section facility">
      <div class="container">
        <div class="section-copy">
          <h2 class="section-title">{{ $t("home.facility.title") }}</h2>
          <p class="section-subtitle">{{ $t("home.facility.subtitle") }}</p>
        </div>
        <div class="facility-tabs" role="tablist">
          <button
            v-for="tab in facilityTabs"
            :key="tab"
            type="button"
            class="facility-tab"
            :class="{ 'is-active': activeTab === tab }"
            role="tab"
            :aria-selected="activeTab === tab"
            @click="setFacilityTab(tab)"
          >
            {{ $t(`home.facility.tabs.${tab}`) }}
          </button>
        </div>
        <div class="facility-grid">
          <button
            v-for="(item, index) in facilityVisibleImages"
            :key="item.src"
            type="button"
            class="facility-card"
            :aria-label="`${item.caption} - ${$t('home.facility.open')}`"
            @click="openFacility(index)"
          >
            <AppImage
              class="facility-card-image"
              :src="item.src"
              :alt="item.caption"
              loading="lazy"
              decoding="async"
            />
            <p class="facility-caption">{{ item.caption }}</p>
          </button>
        </div>
        <div class="section-actions">
          <NuxtLink to="/about" class="section-link">{{ $t("home.facility.cta") }}</NuxtLink>
        </div>
      </div>
    </section>

    <div
      v-if="facilityPreviewOpen && facilityPreviewImage"
      class="preview"
      role="dialog"
      aria-modal="true"
      :aria-label="facilityPreviewImage.caption"
      @click.self="closeFacility"
    >
      <div class="preview-inner">
        <button
          type="button"
          class="preview-close"
          :aria-label="$t('home.facility.close')"
          @click="closeFacility"
        >
          ×
        </button>
        <button
          type="button"
          class="preview-nav preview-nav-prev"
          :aria-label="$t('common.prev')"
          @click="prevFacility"
        >
          ‹
        </button>
        <AppImage
          class="preview-image"
          :src="facilityPreviewImage.src"
          :alt="facilityPreviewImage.caption"
          loading="eager"
          decoding="async"
        />
        <p class="preview-caption">{{ facilityPreviewImage.caption }}</p>
        <button
          type="button"
          class="preview-nav preview-nav-next"
          :aria-label="$t('common.next')"
          @click="nextFacility"
        >
          ›
        </button>
      </div>
    </div>

    <section v-motion-slide-visible-once-bottom class="section export-services">
      <div class="container">
        <div class="section-copy section-copy-light">
          <h2 class="section-title">{{ $t('home.exportServices.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.exportServices.subtitle') }}</p>
        </div>
        <div class="export-services-grid">
          <article v-for="(item, index) in exportServices" :key="item.name" class="export-service-card">
            <p class="export-service-index">0{{ index + 1 }}</p>
            <h3 class="export-service-title">{{ item.name }}</h3>
            <p class="export-service-desc">{{ item.desc }}</p>
          </article>
        </div>
        <div class="section-actions section-actions-light">
          <NuxtLink to="/contact" class="section-link section-link-light">
            {{ $t('home.exportServices.cta') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section lines">
      <div class="container">
        <div class="section-copy">
          <h2 class="section-title">{{ $t('home.lines.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.lines.subtitle') }}</p>
        </div>
        <div class="lines-grid">
          <NuxtLink
            v-for="item in productLines"
            :key="item.slug"
            :to="`/products?category=${item.slug}`"
            class="line-card"
          >
            <h3 class="line-card-title">{{ item.name }}</h3>
            <p class="line-card-desc">{{ item.desc }}</p>
          </NuxtLink>
        </div>
        <div class="lines-actions">
          <NuxtLink to="/products" class="section-link">{{ $t('common.viewProducts') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section advantages">
      <div class="container">
        <div class="section-copy">
          <h2 class="section-title">{{ $t('home.advantages.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.advantages.subtitle') }}</p>
        </div>
        <div class="advantages-grid">
          <article v-for="(item, index) in advantages" :key="item.name" class="advantage-card">
            <div class="advantage-media">
              <img
                v-if="advantageImages[index]"
                class="advantage-media-image"
                :src="advantageImages[index]"
                :alt="item.name"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="advantage-media-blank">{{ $t('common.mediaBlank') }}</div>
            </div>
            <div class="advantage-card-body">
              <h3 class="advantage-card-title">{{ item.name }}</h3>
              <p class="advantage-card-desc">{{ item.desc }}</p>
            </div>
          </article>
        </div>
        <div class="section-actions">
          <NuxtLink to="/advantages" class="section-link">{{ $t('home.advantages.link') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section partners">
      <div class="container">
        <div class="section-copy">
          <h2 class="section-title">{{ $t('home.partners.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.partners.subtitle') }}</p>
        </div>
        <div class="partners-grid">
          <a
            v-for="partner in partnerLogos"
            :key="partner.name"
            class="partner-slot"
            :href="partner.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="partner.name"
          >
            <img class="partner-logo" :src="partner.logo" :alt="partner.name" loading="lazy" decoding="async" />
          </a>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="cta">
      <div class="container">
        <div class="cta-panel">
          <div class="cta-copy">
            <h2 class="cta-title">{{ $t('home.cta.title') }}</h2>
            <p class="cta-subtitle">{{ $t('home.cta.subtitle') }}</p>
          </div>
          <NuxtLink to="/contact" class="btn btn-light">{{ $t('home.cta.button') }}</NuxtLink>
        </div>
      </div>
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

<style scoped>
.home-page .hero {
  position: relative;
  min-height: 78vh;
  display: flex;
  align-items: center;
  padding: 120px 0 96px;
  overflow: hidden;
  color: #ffffff;
  background: var(--color-ink);
}
.home-page .hero .hero-media {
  position: absolute;
  inset: 0;
}
.home-page .hero .hero-media .hero-media-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  transform: scale(1.04);
  filter: saturate(0.78) contrast(1.05);
}
.home-page .hero .hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(7, 11, 18, 0.88) 0%, rgba(7, 11, 18, 0.72) 42%, rgba(7, 11, 18, 0.34) 100%), linear-gradient(180deg, rgba(7, 11, 18, 0.28) 0%, rgba(7, 11, 18, 0.78) 100%);
}
.home-page .hero .hero-content {
  position: relative;
  z-index: 1;
  max-width: 820px;
}
.home-page .hero .hero-badge {
  margin-bottom: 20px;
  color: var(--color-metal);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.home-page .hero .hero-title {
  margin-bottom: 18px;
  max-width: 18ch;
  font-size: 64px;
  font-weight: 600;
  line-height: 1.06;
  letter-spacing: 0;
}
.home-page .hero .hero-subtitle {
  max-width: 44ch;
  margin-bottom: 28px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 18px;
  line-height: 1.7;
  font-weight: 400;
}
.home-page .hero .hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 28px;
}
.home-page .hero .hero-trust {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.home-page .hero .hero-trust .hero-trust-item {
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: rgba(255, 255, 255, 0.82);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.04em;
}
.home-page .btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}
.home-page .btn.btn-primary {
  background: #ffffff;
  color: var(--color-ink);
}
.home-page .btn.btn-primary:hover {
  background: #e8eef3;
}
.home-page .btn.btn-secondary {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #ffffff;
}
.home-page .btn.btn-secondary:hover {
  border-color: rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.04);
}
.home-page .btn.btn-light {
  background: #ffffff;
  color: var(--color-ink);
}
.home-page .btn.btn-light:hover {
  background: #e8eef3;
}
.home-page .proof {
  background: #ffffff;
  border-bottom: 1px solid var(--color-line);
}
.home-page .proof .proof-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
@media (min-width: 900px) {
  .home-page .proof .proof-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.home-page .proof .proof-item {
  padding: 28px 0;
}
.home-page .proof .proof-item:nth-child(odd) {
  padding-right: 24px;
  border-right: 1px solid var(--color-line);
}
.home-page .proof .proof-item:nth-child(even) {
  padding-left: 24px;
}
.home-page .proof .proof-item:nth-child(-n+2) {
  border-bottom: 1px solid var(--color-line);
}
@media (min-width: 900px) {
  .home-page .proof .proof-item {
    padding: 34px 24px 34px 0;
    border-right: 1px solid var(--color-line);
    border-bottom: 0;
  }
  .home-page .proof .proof-item:nth-child(odd) {
    padding-right: 24px;
  }
  .home-page .proof .proof-item:not(:first-child) {
    padding-left: 24px;
  }
  .home-page .proof .proof-item:last-child {
    border-right: 0;
  }
}
.home-page .proof .proof-item .proof-value {
  margin-bottom: 6px;
  color: var(--color-text);
  font-size: 28px;
  font-weight: 600;
  letter-spacing: 0;
}
.home-page .proof .proof-item .proof-label {
  color: var(--color-muted);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.02em;
}
.home-page .section {
  padding: 96px 0;
}
@media (min-width: 768px) {
  .home-page .section {
    padding: 112px 0;
  }
}
.home-page .section-top {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}
@media (min-width: 768px) {
  .home-page .section-top {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}
.home-page .section-copy {
  max-width: 620px;
}
.home-page .section-copy .section-title {
  margin-bottom: 14px;
  color: var(--color-text);
  font-size: 40px;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: 0;
}
.home-page .section-copy .section-subtitle {
  color: var(--color-muted);
  font-size: 17px;
  line-height: 1.7;
}
.home-page .section-copy.section-copy-light {
  margin-bottom: 40px;
}
.home-page .section-copy.section-copy-light .section-title {
  color: #ffffff;
}
.home-page .section-copy.section-copy-light .section-subtitle {
  color: rgba(255, 255, 255, 0.62);
}
.home-page .section-actions {
  margin-top: 28px;
}
.home-page .section-actions.section-actions-light {
  margin-top: 8px;
  padding-top: 8px;
}
.home-page .section-link {
  color: var(--color-accent);
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: 0.02em;
}
.home-page .section-link.section-link-light {
  color: rgba(255, 255, 255, 0.88);
}
.home-page .lab {
  background: var(--color-surface);
}
.home-page .lab .lab-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 28px;
  align-items: start;
}
@media (min-width: 960px) {
  .home-page .lab .lab-grid {
    grid-template-columns: 0.95fr 1.05fr;
    gap: 48px;
  }
}
.home-page .lab .section-title {
  margin-bottom: 14px;
  color: var(--color-text);
  font-size: 40px;
  font-weight: 600;
  line-height: 1.12;
  letter-spacing: 0;
}
.home-page .lab .section-subtitle {
  color: var(--color-muted);
  font-size: 17px;
  line-height: 1.7;
}
.home-page .lab .lab-points {
  margin: 28px 0 24px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.home-page .lab .lab-point {
  padding-top: 14px;
  border-top: 1px solid var(--color-line);
  color: #3d4654;
  font-size: 16px;
  line-height: 1.7;
}
.home-page .lab .lab-panel {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
@media (min-width: 640px) {
  .home-page .lab .lab-panel {
    grid-template-columns: repeat(2, 1fr);
  }
}
.home-page .lab .lab-card {
  display: grid;
  grid-template-columns: 42px 1fr;
  gap: 14px;
  min-height: 100%;
  padding: 22px 20px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid var(--color-line);
}
.home-page .lab .lab-card-index {
  color: var(--color-metal);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
}
.home-page .lab .lab-card-title {
  margin-bottom: 8px;
  color: var(--color-text);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0;
}
.home-page .lab .lab-card-desc {
  color: var(--color-muted);
  font-size: 15px;
  line-height: 1.7;
}
.home-page .facility {
  background: #ffffff;
}
.home-page .facility .facility-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 32px 0 24px;
}
.home-page .facility .facility-tab {
  min-height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid #e8edf2;
  background: var(--color-surface);
  color: #3d4654;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.25s ease, border-color 0.25s ease, color 0.25s ease;
}
.home-page .facility .facility-tab:hover {
  border-color: #cfd8e3;
}
.home-page .facility .facility-tab.is-active {
  background: #0f4c56;
  border-color: #0f4c56;
  color: #ffffff;
}
.home-page .facility .facility-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
@media (min-width: 900px) {
  .home-page .facility .facility-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }
}
.home-page .facility .facility-card {
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  border-radius: 12px;
  background: var(--color-surface);
  border: 1px solid #e8edf2;
  cursor: pointer;
  text-align: left;
  transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
}
.home-page .facility .facility-card:hover {
  transform: translateY(-3px);
  border-color: #cfd8e3;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}
.home-page .facility .facility-card-image {
  display: block;
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  filter: saturate(0.82) contrast(1.04);
}
.home-page .facility .facility-caption {
  padding: 12px 14px 14px;
  color: #3d4654;
  font-size: 13px;
  line-height: 1.5;
  font-weight: 600;
}
.home-page .preview {
  position: fixed;
  inset: 0;
  z-index: 80;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: linear-gradient(180deg, rgba(7, 11, 18, 0.72) 0%, rgba(7, 11, 18, 0.9) 100%);
  backdrop-filter: blur(10px);
}
.home-page .preview .preview-inner {
  position: relative;
  width: min(960px, 100%);
  padding: 0 48px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-page .preview .preview-inner::after {
  content: "";
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: -18px;
  height: 48px;
  border-radius: 999px;
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45) 0%, transparent 72%);
  pointer-events: none;
  z-index: 0;
}
.home-page .preview .preview-inner .preview-image {
  position: relative;
  z-index: 1;
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 12px;
  background: #0d1524;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
}
.home-page .preview .preview-inner .preview-caption {
  position: absolute;
  left: 48px;
  right: 48px;
  bottom: -34px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 13px;
  line-height: 1.5;
  text-align: center;
}
.home-page .preview .preview-inner .preview-close {
  position: absolute;
  top: -40px;
  right: 0;
  z-index: 2;
  color: #ffffff;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
}
.home-page .preview .preview-inner .preview-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  cursor: pointer;
  user-select: none;
}
.home-page .preview .preview-inner .preview-nav.preview-nav-prev {
  left: -8px;
}
.home-page .preview .preview-inner .preview-nav.preview-nav-next {
  right: -8px;
}
@media (max-width: 767px) {
  .home-page .preview {
    padding: 16px;
  }
  .home-page .preview .preview-inner {
    padding: 0 8px;
  }
  .home-page .preview .preview-inner .preview-caption {
    left: 8px;
    right: 8px;
    bottom: -30px;
  }
  .home-page .preview .preview-inner .preview-close {
    top: 8px;
    right: 14px;
  }
  .home-page .preview .preview-inner .preview-nav.preview-nav-prev {
    left: 14px;
  }
  .home-page .preview .preview-inner .preview-nav.preview-nav-next {
    right: 14px;
  }
}
.home-page .export-services {
  background: var(--color-ink);
}
.home-page .export-services .export-services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
@media (min-width: 680px) {
  .home-page .export-services .export-services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1080px) {
  .home-page .export-services .export-services-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
}
.home-page .export-services .export-service-card {
  min-height: 100%;
  padding: 24px 22px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  transition: background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
}
.home-page .export-services .export-service-card:hover {
  transform: translateY(-3px);
  border-color: rgba(95, 208, 220, 0.42);
  background: rgba(255, 255, 255, 0.07);
}
.home-page .export-services .export-service-index {
  margin-bottom: 28px;
  color: #5fd0dc;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.08em;
}
.home-page .export-services .export-service-title {
  margin-bottom: 10px;
  color: #ffffff;
  font-size: 20px;
  font-weight: 650;
  letter-spacing: 0;
}
.home-page .export-services .export-service-desc {
  color: #aab3bf;
  font-size: 14px;
  line-height: 1.7;
}
.home-page .lines {
  background: #ffffff;
}
.home-page .lines .lines-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}
@media (min-width: 768px) {
  .home-page .lines .lines-grid {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1100px) {
  .home-page .lines .lines-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.home-page .lines .line-card {
  display: block;
  padding: 22px 20px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  border-radius: 12px;
  background: var(--color-surface);
  border: 1px solid #e8edf2;
  transition: transform 0.25s ease, border-color 0.25s ease;
}
.home-page .lines .line-card:hover {
  transform: translateY(-3px);
  border-color: #cfd8e3;
}
.home-page .lines .line-card .line-card-title {
  margin-bottom: 10px;
  color: #0f4c56;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0;
}
.home-page .lines .line-card .line-card-desc {
  color: #4b5563;
  font-size: 14px;
  line-height: 1.7;
}
.home-page .lines .lines-actions {
  margin-top: 28px;
}
.home-page .advantages {
  background: #ffffff;
}
.home-page .advantages .advantages-grid {
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
}
@media (min-width: 768px) {
  .home-page .advantages .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.home-page .advantages .advantage-card {
  overflow: hidden;
  border-radius: 12px;
  background: var(--color-surface);
  border: 1px solid var(--color-line);
}
.home-page .advantages .advantage-card .advantage-media {
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #dfe3e8;
}
.home-page .advantages .advantage-card .advantage-media .advantage-media-blank {
  width: 100%;
  height: 100%;
  min-height: 160px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(139, 154, 171, 0.12), transparent 42%), #121a28;
  color: #8b95a5;
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.home-page .advantages .advantage-card .advantage-media .advantage-media-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: saturate(0.8) contrast(1.05);
}
.home-page .advantages .advantage-card .advantage-card-body {
  padding: 22px;
}
.home-page .advantages .advantage-card .advantage-card-title {
  margin-bottom: 8px;
  color: var(--color-text);
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0;
}
.home-page .advantages .advantage-card .advantage-card-desc {
  color: var(--color-muted);
  font-size: 15px;
  line-height: 1.7;
}
.home-page .partners {
  background: var(--color-surface);
}
.home-page .partners .partners-grid {
  margin-top: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}
@media (min-width: 768px) {
  .home-page .partners .partners-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
.home-page .partners .partner-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 120px;
  padding: 20px 22px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #e1e4e8;
  text-decoration: none;
  cursor: pointer;
  transition: border-color 0.25s ease, transform 0.25s ease;
}
.home-page .partners .partner-slot:hover {
  border-color: #cfd8e3;
  transform: translateY(-2px);
}
.home-page .partners .partner-slot .partner-logo {
  width: 100%;
  max-width: 160px;
  height: 56px;
  object-fit: contain;
  object-position: center;
  display: block;
  opacity: 0.92;
}
.home-page .cta {
  padding: 0 0 96px;
  background: var(--color-surface);
}
.home-page .cta .cta-panel {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 40px 28px;
  border-radius: 12px;
  background: var(--color-ink);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.06);
}
@media (min-width: 800px) {
  .home-page .cta .cta-panel {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 48px 40px;
  }
}
.home-page .cta .cta-panel .cta-title {
  margin-bottom: 10px;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 0;
}
.home-page .cta .cta-panel .cta-subtitle {
  max-width: 560px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 16px;
  line-height: 1.7;
}
@media (max-width: 767px) {
  .home-page .hero {
    min-height: 86vh;
    padding: 110px 0 88px;
    align-items: center;
  }
  .home-page .hero .hero-title {
    max-width: none;
    font-size: 42px;
  }
  .home-page .hero .hero-subtitle {
    font-size: 16px;
  }
  .home-page .section-copy .section-title,
  .home-page .lab .section-title,
  .home-page .facility .section-title {
    font-size: 32px;
  }
}
</style>




