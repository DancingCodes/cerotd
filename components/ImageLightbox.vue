<template>
  <UModal v-model:open="open" :ui="{ content: 'w-auto max-w-none bg-transparent shadow-none ring-0', body: 'p-0' }">
    <template #body>
      <div v-if="currentItem" class="relative flex w-[min(90vw,1200px)] items-center justify-center">
        <UButton icon="i-lucide-x" color="neutral" variant="ghost" size="xl" class="absolute -top-12 right-0 z-20 text-white hover:bg-white/10 hover:text-white" @click="open = false" />
        <UButton v-if="items.length > 1" icon="i-lucide-chevron-left" color="primary" variant="solid" size="xl" class="absolute -left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#0f4c56] text-white hover:bg-[#0b3a42]" @click="previous" />
        <img class="relative z-10 max-h-[80vh] max-w-full rounded-xl bg-white object-contain shadow-[0_24px_64px_rgba(0,0,0,.45)]" :src="currentItem.src" :alt="currentItem.alt" loading="eager" decoding="async" />
        <UButton v-if="items.length > 1" icon="i-lucide-chevron-right" color="primary" variant="solid" size="xl" class="absolute -right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-[#0f4c56] text-white hover:bg-[#0b3a42]" @click="next" />
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
type ImageLightboxItem = {
  src: string
  alt: string
}

const props = defineProps<{
  items: ImageLightboxItem[]
}>()

const open = defineModel<boolean>('open', { default: false })
const index = defineModel<number>('index', { default: 0 })
const currentItem = computed(() => props.items[index.value] || null)

function previous() {
  index.value = (index.value - 1 + props.items.length) % props.items.length
}

function next() {
  index.value = (index.value + 1) % props.items.length
}
</script>
