<template>
  <div class="flex min-h-[calc(100vh-140px)] items-center justify-center">
    <div class="w-full max-w-150 rounded-[12px] border border-[#e5eaf0] bg-white p-8 text-center shadow-[0_10px_30px_rgba(15,23,42,.04)]">
      <h1 class="mb-3 text-8 font-bold text-[#111827]">{{ $t('admin.dashboard.welcome') }}</h1>
      <p class="text-lg text-[#0e7f8f]">{{ currentTime }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin', middleware: ['admin'] })

const { t } = useI18n()
const now = ref(new Date())
const currentTime = computed(() => now.value.toLocaleString())
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
})

onBeforeUnmount(() => clearInterval(timer))
</script>
