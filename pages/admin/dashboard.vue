<template>
  <div class="mb-6">
    <div>
      <h1 class="mb-1.5 text-7 font-bold text-[#111827]">{{ $t('admin.dashboard.welcome') }}</h1>
      <p class="text-sm text-[#0e7f8f]">{{ currentTime }}</p>
    </div>
  </div>

  <div class="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
    <NuxtLink v-for="item in metrics" :key="item.to" :to="item.to" class="rounded-[12px] border border-[#e5eaf0] bg-white p-4 text-inherit no-underline transition hover:-translate-y-px hover:border-[#cfd8e3]">
      <div class="text-7 font-bold text-[#111827]">{{ pending ? '—' : item.value }}</div>
      <div class="mt-1 text-3.25 text-gray-500">{{ item.label }}</div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

type DashboardData = {
  productCategories: number
  products: number
  news: number
  inquiries: number
}

const { t, locale } = useI18n()
const now = ref(new Date())
const currentTime = computed(() => now.value.toLocaleString(locale.value === 'zh' ? 'zh-CN' : 'en-US'))
const pending = ref(true)
const dashboard = reactive<DashboardData>({ productCategories: 0, products: 0, news: 0, inquiries: 0 })
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

</script>
