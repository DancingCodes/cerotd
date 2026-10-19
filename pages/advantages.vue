<template>
  <div>
    <section class="bg-[radial-gradient(circle_at_70%_20%,rgba(139,154,171,.14),transparent_28%),linear-gradient(180deg,var(--color-ink)_0%,var(--color-ink-soft)_100%)] py-[72px] text-white md:py-[88px]">
      <div class="container">
        <h1 class="mb-[18px] text-4xl leading-[1.08] md:text-[56px]">{{ $t('advantages.hero.title') }}</h1>
        <p class="max-w-[34ch] text-lg leading-[1.7] text-[#c8ced6] md:text-xl">{{ $t('advantages.hero.subtitle') }}</p>
      </div>
    </section>

    <section class="bg-white py-24 md:py-[120px]">
      <div class="container">
        <div class="mb-12">
          <h2 class="mb-3.5 text-3xl text-gray-900 md:text-4xl">{{ $t('advantages.outcomes.title') }}</h2>
          <p class="max-w-[48ch] text-[17px] leading-[1.7] text-gray-600">{{ $t('advantages.outcomes.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
          <article v-for="item in outcomes" :key="item.name" class="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-6 py-[26px]">
            <h3 class="mb-3 text-xl font-bold text-[#0f4c56]">{{ item.name }}</h3>
            <p class="text-[15px] leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-[var(--color-surface)] py-24 md:py-[120px]">
      <div class="container">
        <div class="mb-12 max-w-[620px]">
          <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold text-[var(--color-text)] max-md:text-[32px]">{{ $t('advantages.compare.title') }}</h2>
          <p class="text-[17px] leading-[1.7] text-[var(--color-muted)]">{{ $t('advantages.compare.subtitle') }}</p>
        </div>
        <div class="grid">
          <article v-for="item in compare" :key="item.name" class="grid grid-cols-1 gap-2.5 border-t border-[#e2e6eb] py-7 last:border-b min-[800px]:grid-cols-[.9fr_1.1fr] min-[800px]:gap-8">
            <h3 class="text-[22px] text-gray-900">{{ item.name }}</h3>
            <p class="text-base leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white py-24 md:py-[120px]">
      <div class="container">
        <div class="mb-12 max-w-[620px]">
          <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold text-[var(--color-text)] max-md:text-[32px]">{{ $t('advantages.pillars.title') }}</h2>
          <p class="text-[17px] leading-[1.7] text-[var(--color-muted)]">{{ $t('advantages.pillars.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-[18px] min-[900px]:grid-cols-2">
          <article v-for="(item, index) in pillars" :key="item.name" class="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-7 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,.1)]">
            <p class="mb-6 text-[13px] font-bold tracking-[.08em] text-[var(--color-accent)]">0{{ index + 1 }}</p>
            <h3 class="mb-3 text-2xl text-gray-900">{{ item.name }}</h3>
            <p class="text-[15px] leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-[var(--color-ink)] py-24 md:py-[120px]">
      <div class="container">
        <div class="mb-12 max-w-[620px]">
          <h2 class="mb-3.5 text-[40px] leading-[1.12] font-semibold text-white max-md:text-[32px]">{{ $t('advantages.assurance.title') }}</h2>
          <p class="text-[17px] leading-[1.7] text-white/60">{{ $t('advantages.assurance.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-3.5 min-[900px]:grid-cols-2">
          <article v-for="(item, index) in assurance" :key="item.name" class="rounded-xl border border-white/10 bg-white/[.04] px-[22px] py-[26px]">
            <p class="mb-[22px] text-[13px] font-bold tracking-[.08em] text-[#5fd0dc]">0{{ index + 1 }}</p>
            <h3 class="mb-2.5 text-[22px] text-white">{{ item.name }}</h3>
            <p class="text-sm leading-[1.7] text-[#9aa3af]">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white pt-7 pb-24 md:pt-5 md:pb-[120px]">
      <div class="container">
        <div class="flex flex-col gap-[22px] rounded-[14px] border border-white/[.08] bg-[radial-gradient(circle_at_100%_0%,rgba(95,208,220,.18),transparent_34%),linear-gradient(135deg,#102033_0%,#0b1522_100%)] px-7 py-[34px] min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between min-[800px]:px-11 min-[800px]:py-10">
          <div>
            <h2 class="mb-2.5 text-3xl font-semibold text-white">{{ $t('advantages.cta.title') }}</h2>
            <p class="max-w-[46ch] text-base leading-[1.7] text-white/70">{{ $t('advantages.cta.subtitle') }}</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/contact" class="inline-flex items-center justify-center rounded-full bg-white px-[22px] py-3.5 text-[15px] font-semibold whitespace-nowrap text-[#102033] no-underline">{{ $t('advantages.cta.button') }}</NuxtLink>
            <NuxtLink to="/products" class="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-[22px] py-3.5 text-[15px] font-semibold whitespace-nowrap text-white no-underline">{{ $t('advantages.cta.secondary') }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

usePageSeo({
  title: t('seo.advantages.title'),
  description: t('seo.advantages.description'),
  path: '/advantages'
})

const outcomes = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`advantages.outcomes.items.item${n}.name`),
    desc: t(`advantages.outcomes.items.item${n}.desc`)
  }))
})

const pillars = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`advantages.pillars.items.item${n}.name`),
    desc: t(`advantages.pillars.items.item${n}.desc`)
  }))
})

const compare = computed(() => {
  locale.value
  return [1, 2, 3].map((n) => ({
    name: t(`advantages.compare.items.item${n}.name`),
    desc: t(`advantages.compare.items.item${n}.desc`)
  }))
})

const assurance = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`advantages.assurance.items.item${n}.name`),
    desc: t(`advantages.assurance.items.item${n}.desc`)
  }))
})
</script>
