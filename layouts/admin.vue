<template>
  <div class="min-h-screen bg-[#f5f7fa] text-gray-900">
    <div class="border-b border-[#e5eaf0] bg-white">
      <div class="mx-auto flex min-h-16 w-full max-w-[1180px] items-center justify-between gap-4 px-6 max-[720px]:gap-2 max-[720px]:px-4 max-[720px]:py-3">
        <NuxtLink to="/admin" class="shrink-0 text-base font-bold text-[#0e7f8f] no-underline">{{ $t('admin.brand') }}</NuxtLink>
        <div class="flex min-w-0 flex-wrap items-center justify-end gap-2 max-[720px]:gap-1">
          <template v-if="isReady">
            <NuxtLink to="/admin/products" class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f] max-[720px]:px-2 max-[720px]:py-1.5">{{ $t('admin.nav.products') }}</NuxtLink>
            <NuxtLink to="/admin/news-categories" class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f] max-[720px]:px-2 max-[720px]:py-1.5">{{ $t('admin.nav.newsCategories') }}</NuxtLink>
            <NuxtLink to="/admin/news" class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f] max-[720px]:px-2 max-[720px]:py-1.5">{{ $t('admin.nav.news') }}</NuxtLink>
            <NuxtLink to="/admin/inquiries" class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline [&.router-link-active]:bg-[#e8f7f9] [&.router-link-active]:text-[#0e7f8f] max-[720px]:px-2 max-[720px]:py-1.5">{{ $t('admin.nav.inquiries') }}</NuxtLink>
            <NuxtLink to="/" class="cursor-pointer rounded-[10px] px-3 py-2 text-sm font-semibold text-gray-600 no-underline max-[720px]:px-2 max-[720px]:py-1.5" target="_blank">{{ $t('admin.nav.viewSite') }}</NuxtLink>
            <button type="button" class="cursor-pointer rounded-[10px] bg-[#eef1f4] px-3 py-2 text-sm font-semibold text-gray-600 max-[720px]:px-2 max-[720px]:py-1.5" @click="logout">{{ $t('admin.nav.logout') }}</button>
          </template>
          <button type="button" class="cursor-pointer rounded-[10px] bg-[#eef1f4] px-3 py-2 text-sm font-semibold text-gray-600 max-[720px]:px-2 max-[720px]:py-1.5" @click="toggleLocale">
            {{ locale === 'en' ? '中文' : 'EN' }}
          </button>
        </div>
      </div>
    </div>
    <div class="py-7 pb-12 max-[720px]:pt-5">
      <div class="mx-auto w-full max-w-[1180px] px-6 max-[720px]:px-4">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale, setLocale } = useI18n()
const { clearToken, isReady } = useAdminAuth()

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
