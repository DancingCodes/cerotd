<template>
  <div>
    <section class="bg-[radial-gradient(circle_at_15%_20%,rgba(95,208,220,.16),transparent_30%),linear-gradient(180deg,var(--color-ink)_0%,var(--color-ink-soft)_100%)] py-[72px] text-white md:py-[88px]">
      <div v-motion-slide-visible-once-bottom class="container">
        <h1 class="mb-[18px] max-w-[12ch] text-4xl leading-[1.08] md:text-[56px]">{{ $t('about.hero.title') }}</h1>
        <p class="max-w-[28ch] text-lg leading-[1.7] text-[#c8ced6] md:text-xl">{{ $t('about.hero.subtitle') }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="bg-white py-24 md:py-[120px]">
      <div class="container grid grid-cols-1 gap-8 md:gap-10">
        <div class="min-w-0 overflow-hidden rounded-[14px] bg-[#0d1524]">
          <video
            class="block aspect-video w-full object-cover"
            :src="aboutVideoSrc"
            autoplay
            muted
            loop
            playsinline
            controls
            preload="metadata"
          ></video>
        </div>
        <div>
          <h2 class="mb-5 text-3xl text-gray-900 md:text-4xl">{{ $t('about.intro.title') }}</h2>
          <p class="text-lg leading-[1.8] text-gray-600 [&+p]:mt-4">{{ $t('about.intro.p1') }}</p>
          <p class="intro-desc">{{ $t('about.intro.p2') }}</p>
          <p class="intro-desc">{{ $t('about.intro.p3') }}</p>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="bg-[var(--color-surface)] py-24 md:py-[120px]">
      <div class="container">
        <div class="mb-12">
          <h2 class="mb-3.5 text-3xl text-gray-900 md:text-4xl">{{ $t('about.values.title') }}</h2>
        </div>
        <div class="grid grid-cols-1 gap-[18px] min-[900px]:grid-cols-3">
          <article v-for="item in values" :key="item.name" class="rounded-[14px] border border-[var(--color-line)] bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,.12)]">
            <h3 class="mb-3 text-[22px] text-gray-900">{{ item.name }}</h3>
            <p class="text-[15px] leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="bg-white py-24 md:py-[120px]">
      <div class="container">
        <div class="mb-12 max-w-[620px]">
          <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold text-[var(--color-text)] max-md:text-[32px]">{{ $t('about.stats.title') }}</h2>
        </div>
        <div class="grid grid-cols-2 gap-3 min-[900px]:grid-cols-4 min-[900px]:gap-[18px]">
          <div v-for="n in 4" :key="n" class="min-w-0 rounded-xl border border-[#e8edf2] bg-[var(--color-surface)] px-3.5 py-5 transition hover:-translate-y-[3px] hover:bg-[#eef2f6] min-[900px]:px-6 min-[900px]:py-7">
            <p class="mb-2.5 break-words text-[26px] leading-[1.15] font-bold text-[#0f4c56] min-[900px]:text-4xl min-[900px]:leading-none">{{ $t(`about.stats.item${n}.value`) }}</p>
            <p class="text-[13px] leading-[1.5] text-gray-600 min-[900px]:text-[15px]">{{ $t(`about.stats.item${n}.label`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="bg-[var(--color-surface)] py-24 md:py-[120px]">
      <div class="container">
        <div class="mb-12 max-w-[620px]">
          <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold text-[var(--color-text)] max-md:text-[32px]">{{ $t('about.trust.title') }}</h2>
          <p class="max-w-[52ch] text-[17px] leading-[1.7] text-gray-600">{{ $t('about.trust.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3.5 min-[900px]:grid-cols-3 min-[900px]:gap-4">
          <article v-for="item in trustItems" :key="item.name" class="rounded-xl border border-[#e8edf2] bg-white px-5 py-[22px] transition hover:-translate-y-[3px] hover:border-[#cfd8e3]">
            <p class="mb-2 text-base font-bold text-[#0f4c56]">{{ item.name }}</p>
            <p class="text-sm leading-[1.6] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="certificates" v-motion-slide-visible-once-bottom class="bg-white py-24 md:py-[120px]">
      <div class="container">
        <div class="mb-12 max-w-[620px]">
          <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold text-[var(--color-text)] max-md:text-[32px]">{{ $t('about.certificates.title') }}</h2>
          <p class="text-[17px] leading-[1.7] text-[var(--color-muted)]">{{ $t('about.certificates.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4 min-[1100px]:grid-cols-4">
          <button
            v-for="(item, index) in certificateItems"
            :key="item.src"
            type="button"
            class="block w-full cursor-pointer rounded-xl border border-[#e8edf2] bg-[var(--color-surface)] p-3.5 transition hover:-translate-y-[3px] hover:border-[#cfd8e3] hover:shadow-[0_12px_28px_rgba(15,23,42,.08)]"
            @click="openCertificate(index)"
          >
            <img
              class="block aspect-[3/4] w-full rounded-xl bg-white object-contain"
              :src="item.src"
              :alt="item.alt"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
      </div>
    </section>

    <div
      v-if="certificatePreviewOpen && certificatePreviewItem"
      class="fixed inset-0 z-[80] flex items-center justify-center bg-gradient-to-b from-[#070b12]/70 to-[#070b12]/90 p-6 backdrop-blur-[10px]"
      @click.self="closeCertificate"
    >
      <div class="relative flex w-full max-w-[960px] items-center justify-center">
        <button
          type="button"
          class="absolute -top-10 right-0 z-20 cursor-pointer text-[32px] leading-none text-white"
          :aria-label="$t('about.certificates.close')"
          @click="closeCertificate"
        >
          ×
        </button>
        <button
          type="button"
          class="absolute left-[-8px] top-1/2 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-[28px] text-white"
          :aria-label="$t('common.prev')"
          @click="prevCertificate"
        >
          ‹
        </button>
        <img
          class="relative z-10 max-h-[80vh] max-w-full rounded-xl bg-white object-contain shadow-[0_24px_64px_rgba(0,0,0,.45)]"
          :src="certificatePreviewItem.src"
          :alt="certificatePreviewItem.alt"
          loading="eager"
          decoding="async"
        />
        <button
          type="button"
          class="absolute right-[-8px] top-1/2 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-[28px] text-white"
          :aria-label="$t('common.next')"
          @click="nextCertificate"
        >
          ›
        </button>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const aboutVideoSrc = `${useSiteUrl()}/cdn/videos/about-intro.mp4`

usePageSeo({
  title: t('seo.about.title'),
  description: t('seo.about.description'),
  path: '/about'
})

const values = computed(() => {
  locale.value
  return [1, 2, 3].map((n) => ({
    name: t(`about.values.items.item${n}.name`),
    desc: t(`about.values.items.item${n}.desc`)
  }))
})


const trustItems = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5, 6].map((n) => ({
    name: t(`about.trust.items.item${n}.name`),
    desc: t(`about.trust.items.item${n}.desc`)
  }))
})

const certificateItems = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    src: `/images/certificate/${n}.webp`,
    alt: t('about.certificates.alt', { n })
  }))
})

const certificatePreviewOpen = ref(false)
const certificatePreviewIndex = ref(0)
const certificatePreviewItem = computed(() => certificateItems.value[certificatePreviewIndex.value] || null)

function openCertificate(index: number) {
  certificatePreviewIndex.value = index
  certificatePreviewOpen.value = true
}

function closeCertificate() {
  certificatePreviewOpen.value = false
}

function prevCertificate() {
  const total = certificateItems.value.length
  if (!total) return
  certificatePreviewIndex.value = (certificatePreviewIndex.value - 1 + total) % total
}

function nextCertificate() {
  const total = certificateItems.value.length
  if (!total) return
  certificatePreviewIndex.value = (certificatePreviewIndex.value + 1) % total
}

</script>
