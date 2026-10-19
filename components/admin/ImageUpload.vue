<template>
  <div>
    <div class="flex items-center gap-2.5">
      <label class="relative inline-flex h-[42px] cursor-pointer items-center justify-center rounded-xl bg-[#e8f7f9] px-3.5 text-[13px] font-bold whitespace-nowrap text-[#0e7f8f]">
        {{ uploading ? $t('admin.upload.uploading') : inner ? $t('admin.upload.replace') : $t('admin.upload.button') }}
        <input
          class="absolute inset-0 cursor-pointer opacity-0"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif,image/avif"
          :disabled="uploading"
          @change="onFile"
        />
      </label>
      <button
        v-if="inner"
        type="button"
        class="h-[42px] cursor-pointer rounded-xl border border-[#f0d0cc] bg-[#fff5f4] px-3.5 text-[13px] font-bold text-[#b42318] disabled:cursor-not-allowed disabled:opacity-60"
        :disabled="uploading"
        @click="clearImage"
      >
        {{ $t('admin.common.delete') }}
      </button>
    </div>
    <p v-if="error" class="mt-2 text-xs text-[#b42318]">{{ error }}</p>
    <img v-if="inner" class="mt-2.5 block max-h-[140px] max-w-[220px] rounded-xl border border-[#e5eaf0] object-cover" :src="inner" alt="" />
    <p v-else class="mt-2.5 text-[13px] text-gray-500">{{ $t('admin.upload.empty') }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: string | null
    folder?: string
  }>(),
  {
    modelValue: '',
    folder: 'uploads'
  }
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const { t } = useI18n()
const { authHeaders } = useAdminAuth()

const inner = ref(props.modelValue || '')
const uploading = ref(false)
const error = ref('')

watch(
  () => props.modelValue,
  (value) => {
    inner.value = value || ''
  }
)

function emitUrl(value = inner.value.trim()) {
  emit('update:modelValue', value)
}

function clearImage() {
  inner.value = ''
  error.value = ''
  emitUrl('')
}

async function onFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  input.value = ''
  if (!file) return

  uploading.value = true
  error.value = ''
  try {
    const body = new FormData()
    body.append('file', file)
    body.append('folder', props.folder)
    const result = await apiFetch<{ url: string }>('/api/upload', {
      method: 'POST',
      headers: authHeaders(),
      body
    })
    inner.value = result.url
    emitUrl()
  } catch (err: any) {
    error.value = err?.msg || t('admin.upload.failed')
  } finally {
    uploading.value = false
  }
}
</script>
