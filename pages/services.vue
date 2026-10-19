<template>
  <div>
    <section class="bg-[radial-gradient(circle_at_20%_0%,rgba(95,208,220,.14),transparent_28%),linear-gradient(180deg,var(--ui-color-neutral-950)_0%,var(--ui-color-neutral-900)_100%)] py-18 text-white md:py-22">
      <UContainer>
        <h1 class="mb-4.5 text-4xl leading-[1.08] md:text-14">{{ $t('services.hero.title') }}</h1>
        <p class="max-w-[30ch] text-lg leading-[1.7] text-[#c8ced6] md:text-xl">{{ $t('services.hero.subtitle') }}</p>
      </UContainer>
    </section>

    <section class="bg-muted py-24 md:py-30">
      <UContainer>
        <div class="mb-12">
          <h2 class="mb-3.5 text-3xl text-gray-900 md:text-4xl">{{ $t('services.audience.title') }}</h2>
          <p class="max-w-[48ch] text-4.25 leading-[1.7] text-gray-600">{{ $t('services.audience.subtitle') }}</p>
        </div>
        <div class="grid grid-cols-1 gap-4 min-[900px]:grid-cols-3">
          <article v-for="item in audience" :key="item.name" class="rounded-xl border border-[var(--ui-border)] bg-white px-6 py-6.5">
            <h3 class="mb-3 text-xl font-bold text-[#0f4c56]">{{ item.name }}</h3>
            <p class="text-3.75 leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="bg-white py-24 md:py-30">
      <UContainer>
        <div class="mb-12">
          <h2 class="mb-3.5 text-3xl text-gray-900 md:text-4xl">{{ $t('services.list.title') }}</h2>
        </div>
        <div class="grid grid-cols-1 gap-4.5 min-[900px]:grid-cols-2">
          <article v-for="(item, index) in list" :key="item.name" class="rounded-xl border border-[var(--ui-border)] bg-muted p-7 transition hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(15,23,42,.1)]">
            <p class="mb-6 text-3.25 font-bold tracking-[.08em] text-[var(--ui-primary)]">0{{ index + 1 }}</p>
            <h3 class="mb-3 text-2xl text-gray-900">{{ item.name }}</h3>
            <p class="text-3.75 leading-[1.7] text-gray-600">{{ item.desc }}</p>
          </article>
        </div>
      </UContainer>
    </section>

    <section class="bg-[var(--ui-color-neutral-950)] py-24 md:py-30">
      <UContainer>
        <div class="mb-12">
          <h2 class="mb-3.5 text-3xl text-white md:text-4xl">{{ $t('services.process.title') }}</h2>
          <p class="max-w-[48ch] text-4.25 leading-[1.7] text-[#c8ced6]">{{ $t('services.process.subtitle') }}</p>
        </div>
        <ol class="grid grid-cols-1 gap-3.5 min-[960px]:grid-cols-4 min-[960px]:gap-4.5">
          <li v-for="(item, index) in processSteps" :key="item.step" class="relative flex flex-col">
            <div class="h-full rounded-xl border border-white/10 bg-white/4 px-5.5 py-6.5 transition hover:-translate-y-0.75 hover:bg-white/7">
              <p class="mb-7 text-3.25 font-bold tracking-[.08em] text-[#5fd0dc]">{{ item.step }}</p>
              <h3 class="mb-2.5 text-5.5 text-white">{{ item.name }}</h3>
              <p class="text-sm leading-[1.7] text-[#9aa3af]">{{ item.desc }}</p>
            </div>
            <span
              v-if="index < processSteps.length - 1"
              class="absolute top-9.5 -right-3.5 hidden h-0.5 w-7 bg-gradient-to-r from-[#5fd0dc]/15 to-[#5fd0dc]/75 after:absolute after:-right-px after:top-1/2 after:size-1.5 after:-translate-y-1/2 after:rounded-full after:bg-[#5fd0dc] min-[960px]:block"
              aria-hidden="true"
            ></span>
          </li>
        </ol>
      </UContainer>
    </section>

    <section class="bg-white py-24 md:py-30">
      <UContainer>
        <div class="mb-12">
          <h2 class="mb-3.5 text-3xl text-gray-900 md:text-4xl">{{ $t('services.checklist.title') }}</h2>
          <p class="max-w-[48ch] text-4.25 leading-[1.7] text-gray-600">{{ $t('services.checklist.subtitle') }}</p>
        </div>
        <ol class="flex flex-col gap-3">
          <li v-for="(item, index) in checklist" :key="index" class="grid grid-cols-[42px_1fr] items-start gap-3.5 rounded-xl border border-[var(--ui-border)] bg-muted px-5 py-4.5">
            <span class="pt-0.5 text-3.25 font-bold tracking-[.08em] text-[var(--ui-primary)]">0{{ index + 1 }}</span>
            <p class="text-3.75 leading-[1.7] text-gray-800">{{ item }}</p>
          </li>
        </ol>
      </UContainer>
    </section>

    <section class="bg-white pt-7 pb-24 md:pt-5 md:pb-30">
      <UContainer>
        <div class="flex flex-col gap-5.5 rounded-3.5 border border-white/8 bg-[radial-gradient(circle_at_100%_0%,rgba(95,208,220,.18),transparent_34%),linear-gradient(135deg,#102033_0%,#0b1522_100%)] px-7 py-8.5 min-[800px]:flex-row min-[800px]:items-center min-[800px]:justify-between min-[800px]:px-11 min-[800px]:py-10">
          <div>
            <h2 class="mb-2.5 text-3xl font-semibold text-white">{{ $t('services.cta.title') }}</h2>
            <p class="max-w-[42ch] text-base leading-[1.7] text-white/70">{{ $t('services.cta.subtitle') }}</p>
          </div>
          <NuxtLink to="/contact" class="inline-flex items-center justify-center rounded-full bg-white px-5.5 py-3.5 text-3.75 font-semibold whitespace-nowrap text-[#102033] no-underline">{{ $t('services.cta.button') }}</NuxtLink>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

usePageSeo({
  title: t('seo.services.title'),
  description: t('seo.services.description'),
  path: '/services'
})

const list = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`services.list.items.item${n}.name`),
    desc: t(`services.list.items.item${n}.desc`)
  }))
})

const processSteps = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    step: t(`services.process.items.item${n}.step`),
    name: t(`services.process.items.item${n}.name`),
    desc: t(`services.process.items.item${n}.desc`)
  }))
})

const audience = computed(() => {
  locale.value
  return [1, 2, 3].map((n) => ({
    name: t(`services.audience.items.item${n}.name`),
    desc: t(`services.audience.items.item${n}.desc`)
  }))
})

const checklist = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5].map((n) => t(`services.checklist.items.item${n}`))
})
</script>
