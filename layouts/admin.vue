<template>
  <div class="flex min-h-screen flex-col bg-[#f5f7fa] text-gray-900 lg:h-screen lg:overflow-hidden">
    <div v-if="route.path !== '/admin'" class="border-b border-[#e5eaf0] bg-white">
      <div class="mx-auto flex min-h-16 w-full max-w-295 items-center justify-between gap-3 px-4 sm:px-6">
        <NuxtLink to="/admin/product-categories" class="shrink-0"><img src="/images/logo.webp" alt="Cerotd" class="h-8.5 w-auto" /></NuxtLink>
        <div class="hidden min-w-0 items-center justify-end gap-2 lg:flex">
          <template v-if="token">
            <NuxtLink v-for="item in navItems" :key="item.to" :to="item.to"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f]">
              {{ $t(item.label) }}
            </NuxtLink>
            <UButton color="error" variant="soft" size="sm" @click="logout">{{ $t('admin.nav.logout') }}</UButton>
          </template>
          <UButton color="neutral" variant="soft" size="sm" @click="toggleLocale">{{ locale === 'en' ? '中文' : 'EN' }}</UButton>
        </div>
        <div class="flex items-center gap-2 lg:hidden">
          <UButton color="neutral" variant="soft" size="sm" @click="toggleLocale">{{ locale === 'en' ? '中文' : 'EN' }}</UButton>
          <UButton v-if="token" :icon="mobileNavOpen ? 'i-lucide-x' : 'i-lucide-menu'" color="neutral" variant="soft" size="sm"
            @click="mobileNavOpen = !mobileNavOpen" />
        </div>
      </div>
      <nav v-if="token && mobileNavOpen" class="border-t border-[#e5eaf0] px-4 py-3 sm:px-6 lg:hidden">
        <div class="mx-auto grid w-full max-w-295 grid-cols-2 gap-2">
          <NuxtLink v-for="item in navItems" :key="`mobile-${item.to}`" :to="item.to"
            class="cursor-pointer rounded-[10px] px-3 py-2.5 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f]"
            @click="mobileNavOpen = false">
            {{ $t(item.label) }}
          </NuxtLink>
          <UButton class="col-span-2 justify-center" color="error" variant="soft" @click="logout">{{ $t('admin.nav.logout') }}</UButton>
        </div>
      </nav>
    </div>
    <div class="flex-1 px-4 py-4 sm:px-6 sm:py-6 lg:min-h-0 lg:py-7">
      <div class="mx-auto w-full max-w-295 lg:h-full">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const { clearToken, token } = useAdminAuth()
const route = useRoute()
const mobileNavOpen = ref(false)

const navItems = [
  { to: '/admin/product-categories', label: 'admin.nav.productCategories' },
  { to: '/admin/products', label: 'admin.nav.products' },
  { to: '/admin/news-categories', label: 'admin.nav.newsCategories' },
  { to: '/admin/news', label: 'admin.nav.news' },
  { to: '/admin/inquiries', label: 'admin.nav.inquiries' }
]

watch(() => route.path, () => {
  mobileNavOpen.value = false
})

useSeoMeta({
  title: 'Cerotd Admin',
  robots: 'noindex, nofollow'
})

function logout() {
  mobileNavOpen.value = false
  clearToken()
  navigateTo('/admin')
}

function toggleLocale() {
  setLocale(locale.value === 'en' ? 'zh' : 'en')
}
</script>
