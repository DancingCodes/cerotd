<template>
  <div>
    <div class="flex items-center gap-2.5">
      <label class="relative inline-flex h-[42px] cursor-pointer items-center justify-center rounded-xl bg-[#e8f7f9] px-3.5 text-[13px] font-bold text-[#0e7f8f]">
        {{ uploading ? $t('admin.upload.uploading') : $t('admin.upload.addImage') }}
        <input
          class="absolute inset-0 cursor-pointer opacity-0"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          :disabled="uploading"
          multiple
          @change="onFiles"
        />
      </label>
    </div>
    <p v-if="error" class="mt-2 text-xs text-[#b42318]">{{ error }}</p>
    <div v-if="images.length" class="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3">
      <div v-for="(url, index) in images" :key="url + '-' + index" class="overflow-hidden rounded-xl border border-[#e5eaf0] bg-white">
        <img :src="url" alt="" class="block h-[120px] w-full object-cover" />
        <button type="button" class="h-[34px] w-full cursor-pointer bg-slate-50 text-xs font-bold text-[#b42318]" @click="removeAt(index)">
          {{ $t('admin.common.delete') }}
        </button>
      </div>
    </div>
    <p v-else class="mt-2.5 text-[13px] text-gray-500">{{ $t('admin.upload.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string[]
    folder?: string
    placeholder?: string
  }>(),
  {
    modelValue: () => [],
    folder: 'products',
    placeholder: ''
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const { t } = useI18n()
const { authHeaders } = useAdminAuth()
const images = ref<string[]>([...(props.modelValue || [])])
const uploading = ref(false)
const error = ref('')

watch(
  () => props.modelValue,
  (value) => {
    images.value = [...(value || [])]
  }
)

function emitImages() {
  emit('update:modelValue', [...images.value])
}

function removeAt(index: number) {
  images.value.splice(index, 1)
  emitImages()
}

async function onFiles(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  input.value = ''
  if (!files.length) return

  uploading.value = true
  error.value = ''
  try {
    for (const file of files) {
      const body = new FormData()
      body.append('file', file)
      body.append('folder', props.folder)
      const result = await apiFetch<{ url: string }>('/api/upload', {
        method: 'POST',
        headers: authHeaders(),
        body
      })
      if (result.url) images.value.push(result.url)
    }
    emitImages()
  } catch (err: any) {
    error.value = err?.msg || t('admin.upload.failed')
  } finally {
    uploading.value = false
  }
}
</script>
