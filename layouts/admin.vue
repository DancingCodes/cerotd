<template>
  <div class="flex h-screen flex-col overflow-hidden bg-[#f5f7fa] text-gray-900">
    <div v-if="route.path !== '/admin'" class="border-b border-[#e5eaf0] bg-white">
      <div class="mx-auto flex min-h-16 w-full max-w-295 items-center justify-between gap-4 px-6">
        <NuxtLink to="/admin/product-categories" class="shrink-0"><img src="/images/logo.webp" alt="Cerotd" class="h-8.5 w-auto" /></NuxtLink>
        <div class="flex min-w-0 items-center justify-end gap-2">
          <template v-if="token">
            <NuxtLink to="/admin/product-categories"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f]">
              {{ $t('admin.nav.productCategories') }}
            </NuxtLink>
            <NuxtLink to="/admin/products"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f]">
              {{ $t('admin.nav.products') }}
            </NuxtLink>
            <NuxtLink to="/admin/news-categories"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f]">
              {{ $t('admin.nav.newsCategories') }}
            </NuxtLink>
            <NuxtLink to="/admin/news"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f]">
              {{ $t('admin.nav.news') }}
            </NuxtLink>
            <NuxtLink to="/admin/inquiries"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f]">
              {{ $t('admin.nav.inquiries') }}
            </NuxtLink>
            <UButton color="neutral" variant="soft" size="sm" @click="logout">{{ $t('admin.nav.logout') }}</UButton>
          </template>
          <UButton color="neutral" variant="soft" size="sm" @click="toggleLocale">{{ locale === 'en' ? '中文' : 'EN' }}</UButton>
        </div>
      </div>
    </div>
    <div class="min-h-0 flex-1 py-7">
      <div class="mx-auto h-full w-full max-w-295 px-6">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const { clearToken, token } = useAdminAuth()
const route = useRoute()

useSeoMeta({
  title: 'Cerotd Admin',
  robots: 'noindex, nofollow'
})

function logout() {
  clearToken()
  navigateTo('/admin')
}

function toggleLocale() {
  setLocale(locale.value === 'en' ? 'zh' : 'en')
}
</script>
