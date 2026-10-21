<template>
  <button v-show="visible" type="button"
    class="fixed right-4 bottom-[calc(88px+env(safe-area-inset-bottom,0px))] z-60 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-[#d7dde5] bg-white/95 text-[#0f4c56] shadow-[0_8px_24px_rgba(15,23,42,.12)] transition hover:-translate-y-0.5 hover:border-[#3f7f88]/45 hover:bg-white md:right-7 md:bottom-8"
    :aria-label="label" @click="scrollTop">
    <span class="text-lg font-bold leading-none" aria-hidden="true">↑</span>
  </button>
</template>

<script setup lang="ts">
const { t } = useI18n()

const visible = ref(false)
const label = computed(() => t('common.backToTop'))

function onScroll() {
  visible.value = window.scrollY > 640
}

function scrollTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
})

</script>
