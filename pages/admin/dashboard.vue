<template>
  <div class="mb-6 flex flex-wrap items-end justify-between gap-4">
    <div>
      <h1 class="mb-1.5 text-7 font-bold text-[#111827]">{{ $t('admin.dashboard.welcome') }}</h1>
      <p class="text-sm text-[#0e7f8f]">{{ currentTime }}</p>
    </div>
    <div class="flex gap-2">
      <NuxtLink to="/admin/products" class="flex h-10 items-center justify-center rounded-[10px] bg-[#0e7f8f] px-4 text-sm font-semibold text-white no-underline transition-colors duration-300 ease-out hover:bg-[#0b6d7b]">{{ $t('admin.dashboard.newProduct') }}</NuxtLink>
      <NuxtLink to="/admin/news" class="flex h-10 items-center justify-center rounded-[10px] bg-[#eef1f4] px-4 text-sm font-semibold text-gray-700 no-underline transition-colors duration-300 ease-out hover:bg-[#e1e7eb]">{{ $t('admin.dashboard.newNews') }}</NuxtLink>
    </div>
  </div>

  <div class="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
    <NuxtLink v-for="item in metrics" :key="item.to" :to="item.to" class="rounded-[12px] border border-[#e5eaf0] bg-white p-4 text-inherit no-underline transition hover:-translate-y-px hover:border-[#cfd8e3]">
      <div class="text-7 font-bold text-[#111827]">{{ pending ? '—' : item.value }}</div>
      <div class="mt-1 text-3.25 text-gray-500">{{ item.label }}</div>
    </NuxtLink>
  </div>

  <div class="rounded-[12px] border border-[#e5eaf0] bg-white p-5">
    <div class="mb-4 flex items-center justify-between gap-3">
      <div>
        <div class="text-lg font-bold text-[#111827]">{{ $t('admin.dashboard.recentInquiries') }}</div>
        <div class="mt-0.5 text-sm text-gray-500">{{ $t('admin.dashboard.unreadInquiries', { count: dashboard.unreadInquiries }) }}</div>
      </div>
      <NuxtLink to="/admin/inquiries" class="text-sm font-semibold text-[#0e7f8f] no-underline">{{ $t('admin.dashboard.viewInquiries') }}</NuxtLink>
    </div>
    <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
    <div v-else-if="!dashboard.recentInquiries.length" class="text-sm text-gray-500">{{ $t('admin.dashboard.noInquiries') }}</div>
    <div v-else class="divide-y divide-[#eef1f4]">
      <NuxtLink v-for="item in dashboard.recentInquiries" :key="item.id" to="/admin/inquiries" class="flex items-center justify-between gap-4 py-3 text-inherit no-underline">
        <div class="min-w-0"><div class="truncate font-semibold text-[#111827]">{{ item.name }}<span v-if="item.company" class="font-normal text-gray-500"> · {{ item.company }}</span></div><div class="mt-0.5 text-xs text-gray-500">{{ formatDate(item.createdAt) }}</div></div>
        <span v-if="!item.isRead" class="shrink-0 rounded-full bg-[#e8f7f9] px-2 py-1 text-xs font-semibold text-[#0e7f8f]">{{ $t('admin.dashboard.unread') }}</span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })

type DashboardData = {
  productCategories: number
  products: number
  news: number
  inquiries: number
  unreadInquiries: number
  recentInquiries: { id: number; name: string; company: string; createdAt: string; isRead: boolean }[]
}

const { t, locale } = useI18n()
const now = ref(new Date())
const currentTime = computed(() => now.value.toLocaleString(locale.value === 'zh' ? 'zh-CN' : 'en-US'))
const pending = ref(true)
const dashboard = reactive<DashboardData>({ productCategories: 0, products: 0, news: 0, inquiries: 0, unreadInquiries: 0, recentInquiries: [] })
const metrics = computed(() => [
  { to: '/admin/product-categories', value: dashboard.productCategories, label: t('admin.dashboard.productCategories') },
  { to: '/admin/products', value: dashboard.products, label: t('admin.dashboard.products') },
  { to: '/admin/news', value: dashboard.news, label: t('admin.dashboard.news') },
  { to: '/admin/inquiries', value: dashboard.inquiries, label: t('admin.dashboard.inquiries') }
])
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
  load()
})

onBeforeUnmount(() => clearInterval(timer))

async function load() {
  pending.value = true
  try { Object.assign(dashboard, await apiFetch<DashboardData>('/api/admin/dashboard')) }
  finally { pending.value = false }
}

function formatDate(value: string) {
  return value ? value.slice(0, 16).replace('T', ' ') : ''
}
</script>
