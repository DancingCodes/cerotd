<template>
  <div>
    <section class="bg-[radial-gradient(circle_at_15%_20%,rgba(95,208,220,.16),transparent_30%),linear-gradient(180deg,var(--ui-color-neutral-950)_0%,var(--ui-color-neutral-900)_100%)] py-18 text-white md:py-22">
      <UContainer>
        <h1 class="mb-4.5 max-w-[12ch] text-14 leading-[1.08]">{{ $t('about.hero.title') }}</h1>
        <p class="max-w-[28ch] text-5 leading-[1.7] text-[#c8ced6]">{{ $t('about.hero.subtitle') }}</p>
      </UContainer>
    </section>

    <section class="bg-white py-24 md:py-30">
      <UContainer class="grid grid-cols-1 gap-8 md:gap-10">
        <div class="min-w-0 overflow-hidden rounded-3.5 bg-[#0d1524]">
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
          <h2 class="mb-5 text-9 text-gray-900">{{ $t('about.intro.title') }}</h2>
          <p class="text-lg leading-[1.8] text-gray-600 [&+p]:mt-4">{{ $t('about.intro.p1') }}</p>
          <p class="intro-desc">{{ $t('about.intro.p2') }}</p>
          <p class="intro-desc">{{ $t('about.intro.p3') }}</p>
        </div>
      </UContainer>
    </section>

    <section class="bg-muted py-24 md:py-30">
      <UContainer>
        <div class="mb-12">
          <h2 class="mb-3.5 text-9 text-gray-900">{{ $t('about.values.title') }}</h2>
        </div>
        <div class="grid grid-cols-1 gap-4.5 min-[900px]:grid-cols-3">
          <article v-for="item in values" :key="item.name" class="rounded-3.5 border border-default bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,.08)] transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,.12)]">
            <h3 class="mb-3 text-5.5 text-gray-900">{{ item.name }}</h3>
            <p class="text-3.75 leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="bg-white py-24 md:py-30">
      <UContainer>
        <div class="mb-12 max-w-155">
          <h2 class="mb-3.5 text-9 leading-[1.12] font-semibold text-highlighted">{{ $t('about.stats.title') }}</h2>
        </div>
        <div class="grid grid-cols-2 gap-3 min-[900px]:grid-cols-4 min-[900px]:gap-4.5">
          <div v-for="n in 4" :key="n" class="min-w-0 rounded-xl border border-[#e8edf2] bg-muted px-3.5 py-5 transition hover:-translate-y-0.75 hover:bg-[#eef2f6] min-[900px]:px-6 min-[900px]:py-7">
            <p class="mb-2.5 wrap-break-word text-6.5 leading-[1.15] font-bold text-[#0f4c56] min-[900px]:text-4xl min-[900px]:leading-none">{{ $t(`about.stats.item${n}.value`) }}</p>
            <p class="text-3.25 text-gray-600 min-[900px]:text-3.75">{{ $t(`about.stats.item${n}.label`) }}</p>
          </div>
        </div>
      </UContainer>
    </section>

    <section class="bg-muted py-24 md:py-30">
      <UContainer>
        <div class="mb-12 max-w-155">
          <h2 class="mb-3.5 text-9 leading-[1.12] font-semibold text-highlighted">{{ $t('about.trust.title') }}</h2>
          <p class="max-w-[52ch] text-4.25 leading-[1.7] text-gray-600">{{ $t('about.trust.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3.5 min-[900px]:grid-cols-3 min-[900px]:gap-4">
          <article v-for="item in trustItems" :key="item.name" class="rounded-xl border border-[#e8edf2] bg-white px-5 py-5.5 transition hover:-translate-y-0.75 hover:border-[#cfd8e3]">
            <p class="mb-2 text-base font-bold text-[#0f4c56]">{{ item.name }}</p>
            <p class="text-sm leading-[1.6] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </UContainer>
    </section>

    <section id="certificates" class="bg-white py-24 md:py-30">
      <UContainer>
        <div class="mb-12 max-w-155">
          <h2 class="mb-3.5 text-9 leading-[1.12] font-semibold text-highlighted">{{ $t('about.certificates.title') }}</h2>
          <p class="text-4.25 leading-[1.7] text-muted">{{ $t('about.certificates.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-2 gap-3.5 md:grid-cols-3 md:gap-4 min-[1100px]:grid-cols-4">
          <button
            v-for="(item, index) in certificateItems"
            :key="item.src"
            type="button"
            class="block w-full cursor-pointer rounded-xl border border-[#e8edf2] bg-muted p-3.5 transition hover:-translate-y-0.75 hover:border-[#cfd8e3] hover:shadow-[0_12px_28px_rgba(15,23,42,.08)]"
            @click="openCertificate(index)"
          >
            <img
              class="block aspect-3/4 w-full rounded-xl bg-white object-contain"
              :src="item.src"
              :alt="item.alt"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
      </UContainer>
    </section>

    <div
      v-if="certificatePreviewOpen && certificatePreviewItem"
      class="fixed inset-0 z-80 flex items-center justify-center bg-linear-to-b from-[#070b12]/70 to-[#070b12]/90 p-6 backdrop-blur-2.5"
      @click.self="closeCertificate"
    >
      <div class="relative flex w-full max-w-240 items-center justify-center">
        <button
          type="button"
          class="absolute -top-10 right-0 z-20 cursor-pointer text-8 leading-none text-white"
          :aria-label="$t('about.certificates.close')"
          @click="closeCertificate"
        >
          ×
        </button>
        <button
          type="button"
          class="absolute -left-2 top-1/2 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-7 text-white"
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
          class="absolute -right-2 top-1/2 z-20 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/15 text-7 text-white"
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
