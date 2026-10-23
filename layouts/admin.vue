<template>
  <div class="min-h-screen bg-[#f5f7fa] text-gray-900">
    <div v-if="route.path !== '/admin'" class="border-b border-[#e5eaf0] bg-white">
      <div
        class="mx-auto flex min-h-16 w-full max-w-295 items-center justify-between gap-4 px-6 max-[720px]:gap-2 max-[720px]:px-4 max-[720px]:py-3">
        <NuxtLink to="/admin/dashboard" class="shrink-0 text-base font-bold text-[#0e7f8f] no-underline">{{
          $t('admin.brand') }}</NuxtLink>
        <div class="flex min-w-0 flex-wrap items-center justify-end gap-2 max-[720px]:gap-1">
          <template v-if="token">
            <NuxtLink to="/admin/dashboard"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f] max-[720px]:px-2 max-[720px]:py-1.5">
              {{ $t('admin.nav.dashboard') }}
            </NuxtLink>
            <NuxtLink to="/admin/product-categories"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f] max-[720px]:px-2 max-[720px]:py-1.5">
              {{ $t('admin.nav.productCategories') }}
            </NuxtLink>
            <NuxtLink to="/admin/products"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f] max-[720px]:px-2 max-[720px]:py-1.5">
              {{ $t('admin.nav.products') }}
            </NuxtLink>
            <NuxtLink to="/admin/news-categories"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f] max-[720px]:px-2 max-[720px]:py-1.5">
              {{ $t('admin.nav.newsCategories') }}
            </NuxtLink>
            <NuxtLink to="/admin/news"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f] max-[720px]:px-2 max-[720px]:py-1.5">
              {{ $t('admin.nav.news') }}
            </NuxtLink>
            <NuxtLink to="/admin/inquiries"
              class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f] max-[720px]:px-2 max-[720px]:py-1.5">
              {{ $t('admin.nav.inquiries') }}
            </NuxtLink>
            <UButton color="neutral" variant="soft" size="sm" @click="logout">{{ $t('admin.nav.logout') }}</UButton>
          </template>
          <UButton color="neutral" variant="soft" size="sm" @click="toggleLocale">{{ locale === 'en' ? '中文' : 'EN' }}</UButton>
        </div>
      </div>
    </div>
    <div class="py-7 pb-12 max-[720px]:pt-5">
      <div class="mx-auto w-full max-w-295 px-6 max-[720px]:px-4">
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
