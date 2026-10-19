<template>
  <header class="sticky top-0 z-50 border-b border-[#d9dde3]/95 bg-white/90 backdrop-blur-4.5">
    <nav aria-label="Primary">
      <div class="mx-auto flex min-h-18.5 w-full max-w-295 items-center justify-between px-6">
        <NuxtLink to="/" class="inline-flex items-center no-underline">
          <img src="/images/logo.webp" alt="Cerotd" class="h-9 w-auto" />
        </NuxtLink>

        <div class="hidden items-center gap-6.5 lg:flex">
          <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to" class="relative text-3.75 font-medium tracking-[0.01em] text-[#5b6572] no-underline transition-colors hover:text-[var(--ui-text-highlighted)] [&.router-link-active]:font-semibold [&.router-link-active]:text-[#0f4c56] [&.router-link-active]:after:absolute [&.router-link-active]:after:-bottom-2 [&.router-link-active]:after:left-0 [&.router-link-active]:after:right-0 [&.router-link-active]:after:h-0.5 [&.router-link-active]:after:rounded-full [&.router-link-active]:after:bg-[#0f4c56]">
            {{ $t(item.label) }}
          </NuxtLink>

          <NuxtLink to="/contact" class="inline-flex min-h-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0f9aa8] to-[#3dd6e0] px-4.5 text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90 [&.router-link-active]:ring-2 [&.router-link-active]:ring-[#0f4c56]/20">
            {{ $t('common.contact') }}
          </NuxtLink>

          <button type="button" class="ml-1 cursor-pointer rounded-full bg-muted px-3.5 py-2 text-3.25 font-semibold text-[#3d4654] transition-colors hover:bg-[#e2e6eb]" @click="toggleLocale">
            {{ locale === 'en' ? '中文' : 'EN' }}
          </button>
        </div>

        <button
          type="button"
          class="inline-flex h-10.5 w-10.5 cursor-pointer flex-col items-center justify-center gap-1.25 rounded-xl bg-muted lg:hidden"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle menu"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <span class="h-0.5 w-4.5 rounded-full bg-[#1f2937]"></span>
          <span class="h-0.5 w-4.5 rounded-full bg-[#1f2937]"></span>
          <span class="h-0.5 w-4.5 rounded-full bg-[#1f2937]"></span>
        </button>
      </div>

      <div v-if="mobileMenuOpen" class="mx-auto flex w-full max-w-295 flex-col gap-1 px-6 pb-4.5 lg:hidden">
        <NuxtLink
          v-for="item in navItems"
          :key="`mobile-${item.to}`"
          :to="item.to"
          class="border-b border-[var(--ui-border)] py-3 text-base font-medium text-[#7a8490] no-underline"
          :class="{ 'font-bold text-[#0f4c56]': isNavActive(item.to) }"
          @click="mobileMenuOpen = false"
        >
          {{ $t(item.label) }}
        </NuxtLink>
        <NuxtLink to="/contact" class="mt-3 inline-flex min-h-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f9aa8] to-[#3dd6e0] text-center font-semibold text-white no-underline" @click="mobileMenuOpen = false">
          {{ $t('common.contact') }}
        </NuxtLink>
        <button type="button" class="mt-2.5 cursor-pointer rounded-xl bg-muted px-4 py-3 text-left font-semibold text-[#3d4654]" @click="toggleLocale">
          {{ locale === 'en' ? '中文' : 'EN' }}
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
type NavItem = {
  to: string
  label: string
}

const { locale, setLocale } = useI18n()
const mobileMenuOpen = ref(false)

const navItems: NavItem[] = [
  { to: '/', label: 'common.home' },
  { to: '/products', label: 'common.products' },
  { to: '/services', label: 'common.services' },
  { to: '/advantages', label: 'common.advantages' },
  { to: '/about', label: 'common.about' },
  { to: '/news', label: 'common.news' }
]

const route = useRoute()

function isNavActive(to: string) {
  if (to === '/') return route.path === '/'
  return route.path === to || route.path.startsWith(`${to}/`)
}

const toggleLocale = () => {
  setLocale(locale.value === 'en' ? 'zh' : 'en')
}
</script>
