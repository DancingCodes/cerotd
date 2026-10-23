<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-y-2 scale-95 opacity-0"
    enter-to-class="translate-y-0 scale-100 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 scale-100 opacity-100"
    leave-to-class="translate-y-2 scale-95 opacity-0"
  >
    <button v-if="visible" type="button"
      class="fixed right-4 bottom-[calc(88px+env(safe-area-inset-bottom,0px))] z-60 inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-[#d7dde5] bg-white/95 text-[#0f4c56] shadow-[0_8px_24px_rgba(15,23,42,.12)] transition hover:-translate-y-0.5 hover:border-[#3f7f88]/45 hover:bg-white md:right-7 md:bottom-8"
      @click="scrollTop">
      <UIcon name="i-lucide-arrow-up" class="size-5" />
    </button>
  </Transition>
</template>

<script setup lang="ts">
const visible = ref(false)
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
