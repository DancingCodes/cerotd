<template>
  <div>
    <section class="bg-[radial-gradient(circle_at_70%_20%,rgba(139,154,171,.14),transparent_28%),linear-gradient(180deg,var(--ui-color-neutral-950)_0%,var(--ui-color-neutral-900)_100%)] py-18 text-white md:py-22">
      <UContainer>
        <h1 class="mb-4.5 text-14 leading-[1.08]">{{ $t('advantages.hero.title') }}</h1>
        <p class="max-w-[34ch] text-5 leading-[1.7] text-[#c8ced6]">{{ $t('advantages.hero.subtitle') }}</p>
      </UContainer>
    </section>

    <section class="bg-white py-24 md:py-30">
      <UContainer>
        <div class="mb-12">
          <h2 class="mb-3.5 text-9 text-gray-900">{{ $t('advantages.outcomes.title') }}</h2>
          <p class="max-w-[48ch] text-4.25 leading-[1.7] text-gray-600">{{ $t('advantages.outcomes.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-4 min-[900px]:grid-cols-2">
          <article v-for="item in outcomes" :key="item.name" class="rounded-xl border border-default bg-muted px-6 py-6.5">
            <h3 class="mb-3 text-xl font-bold text-[#0f4c56]">{{ item.name }}</h3>
            <p class="text-3.75 leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="bg-muted py-24 md:py-30">
      <UContainer>
        <div class="mb-12 max-w-155">
          <h2 class="mb-3.5 text-9 leading-[1.12] font-semibold text-highlighted">{{ $t('advantages.compare.title') }}</h2>
          <p class="text-4.25 leading-[1.7] text-muted">{{ $t('advantages.compare.subtitle') }}</p>
        </div>
        <div class="grid">
          <article v-for="item in compare" :key="item.name" class="grid grid-cols-1 gap-2.5 border-t border-[#e2e6eb] py-7 last:border-b min-[800px]:grid-cols-[.9fr_1.1fr] min-[800px]:gap-8">
            <h3 class="text-5.5 text-gray-900">{{ item.name }}</h3>
            <p class="text-base leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="bg-white py-24 md:py-30">
      <UContainer>
        <div class="mb-12 max-w-155">
          <h2 class="mb-3.5 text-9 leading-[1.12] font-semibold text-highlighted">{{ $t('advantages.pillars.title') }}</h2>
          <p class="text-4.25 leading-[1.7] text-muted">{{ $t('advantages.pillars.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-4.5 min-[900px]:grid-cols-2">
          <article v-for="(item, index) in pillars" :key="item.name" class="rounded-xl border border-default bg-muted p-7 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,.1)]">
            <p class="mb-6 text-3.25 font-bold tracking-[.08em] text-primary">0{{ index + 1 }}</p>
            <h3 class="mb-3 text-2xl text-gray-900">{{ item.name }}</h3>
            <p class="text-3.75 leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="bg-neutral-950 py-24 md:py-30">
      <UContainer>
        <div class="mb-12 max-w-155">
          <h2 class="mb-3.5 text-9 text-white">{{ $t('advantages.assurance.title') }}</h2>
          <p class="text-4.25 leading-[1.7] text-white/60">{{ $t('advantages.assurance.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-3.5 min-[900px]:grid-cols-2">
          <article v-for="(item, index) in assurance" :key="item.name" class="rounded-xl border border-white/10 bg-white/4 px-5.5 py-6.5">
            <p class="mb-5.5 text-3.25 font-bold tracking-[.08em] text-[#5fd0dc]">0{{ index + 1 }}</p>
            <h3 class="mb-2.5 text-5.5 text-white">{{ item.name }}</h3>
            <p class="text-sm leading-[1.7] text-[#9aa3af]">{{ item.desc }}</p>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="bg-white pt-7 pb-24 md:pt-5 md:pb-30">
      <UContainer>
        <div class="flex flex-col gap-5.5 rounded-3.5 border border-white/8 bg-[radial-gradient(circle_at_100%_0%,rgba(95,208,220,.18),transparent_34%),linear-gradient(135deg,#102033_0%,#0b1522_100%)] px-7 py-8.5 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between min-[800px]:px-11 min-[800px]:py-10">
          <div>
            <h2 class="mb-2.5 text-7.5 font-semibold text-white">{{ $t('advantages.cta.title') }}</h2>
            <p class="max-w-[46ch] text-base leading-[1.7] text-white/70">{{ $t('advantages.cta.subtitle') }}</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <NuxtLink to="/contact" class="inline-flex items-center justify-center rounded-full bg-white px-5.5 py-3.5 text-3.75 font-semibold whitespace-nowrap text-[#102033] no-underline">{{ $t('advantages.cta.button') }}</NuxtLink>
            <NuxtLink to="/products" class="inline-flex items-center justify-center rounded-full border border-white/30 bg-transparent px-5.5 py-3.5 text-3.75 font-semibold whitespace-nowrap text-white no-underline">{{ $t('advantages.cta.secondary') }}</NuxtLink>
          </div>
        </div>
      </UContainer>
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
