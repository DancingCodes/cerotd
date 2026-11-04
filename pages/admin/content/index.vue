<template>
  <div class="flex h-full min-h-0 flex-col gap-4">
    <div>
      <h1 class="text-2xl font-bold tracking-normal text-gray-900">{{ $t('admin.pageContent.title') }}</h1>
      <p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.subtitle') }}</p>
    </div>

    <div class="grid min-h-0 flex-1 grid-cols-[220px_minmax(0,1fr)] gap-5">
      <UCard class="h-fit">
        <div class="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">{{ $t('admin.pageContent.pages') }}</div>
        <UButton block class="justify-start" color="primary" variant="soft" icon="i-lucide-house">
          {{ $t('admin.pageContent.home') }}
        </UButton>

        <div class="mb-2 mt-6 text-xs font-semibold tracking-wide text-gray-500 uppercase">{{ $t('admin.pageContent.sections') }}</div>
        <UButton block class="justify-start" color="primary" variant="soft" icon="i-lucide-panels-top-left">
          {{ $t('admin.pageContent.hero') }}
        </UButton>
      </UCard>

      <UCard class="min-h-0 overflow-y-auto">
        <template #header>
          <div>
            <div class="text-lg font-semibold text-gray-900">{{ $t('admin.pageContent.hero') }}</div>
            <p class="mt-1 text-sm text-gray-500">{{ $t('admin.pageContent.heroDescription') }}</p>
          </div>
        </template>

        <UForm :state="form" :validate="validateForm" class="space-y-6" @submit="save">
          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.image') }}</h2>
            <div>
              <div>
                <UFileUpload :model-value="backgroundUploadItem" :accept="imageAccept"
                  :label="uploadingImage ? $t('admin.upload.uploading') : (form.backgroundImage ? $t('admin.upload.replace') : $t('admin.upload.button'))"
                  :disabled="uploadingImage || saving" @update:model-value="onBackgroundUpload" />
                <p class="mt-2 text-xs text-gray-500">{{ $t('admin.pageContent.imageHint') }}</p>
              </div>
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.text') }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.badgeEn')" name="badgeEn">
                <UInput v-model="form.badgeEn" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.badgeZh')" name="badgeZh">
                <UInput v-model="form.badgeZh" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.titleEn')" name="titleEn" required>
                <UInput v-model="form.titleEn" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.titleZh')" name="titleZh" required>
                <UInput v-model="form.titleZh" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.subtitleEn')" name="subtitleEn" required>
                <UTextarea v-model="form.subtitleEn" class="w-full" :rows="3" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.subtitleZh')" name="subtitleZh" required>
                <UTextarea v-model="form.subtitleZh" class="w-full" :rows="3" />
              </UFormField>
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.buttons') }}</h2>
            <div class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.primaryTextEn')" name="ctaPrimaryEn" required>
                <UInput v-model="form.ctaPrimaryEn" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.primaryTextZh')" name="ctaPrimaryZh" required>
                <UInput v-model="form.ctaPrimaryZh" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.primaryLink')" name="ctaPrimaryHref" required>
                <UInput v-model="form.ctaPrimaryHref" class="w-full" placeholder="/products" />
              </UFormField>
              <div />
              <UFormField :label="$t('admin.pageContent.secondaryTextEn')" name="ctaSecondaryEn" required>
                <UInput v-model="form.ctaSecondaryEn" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.secondaryTextZh')" name="ctaSecondaryZh" required>
                <UInput v-model="form.ctaSecondaryZh" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.secondaryLink')" name="ctaSecondaryHref" required>
                <UInput v-model="form.ctaSecondaryHref" class="w-full" placeholder="/contact" />
              </UFormField>
            </div>
          </section>

          <section class="space-y-4">
            <h2 class="border-b border-gray-200 pb-2 text-sm font-semibold text-gray-800">{{ $t('admin.pageContent.trustLabels') }}</h2>
            <div v-for="n in 3" :key="n" class="grid grid-cols-2 gap-4">
              <UFormField :label="$t('admin.pageContent.trustEn', { n })" :name="`trust${n}En`">
                <UInput v-model="form[`trust${n}En` as TrustField]" class="w-full" />
              </UFormField>
              <UFormField :label="$t('admin.pageContent.trustZh', { n })" :name="`trust${n}Zh`">
                <UInput v-model="form[`trust${n}Zh` as TrustField]" class="w-full" />
              </UFormField>
            </div>
          </section>

          <div class="flex justify-end border-t border-gray-200 pt-4">
            <UButton type="submit" :loading="saving" :disabled="uploadingImage">{{ $t('admin.common.save') }}</UButton>
          </div>
        </UForm>
      </UCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin' })

type LocalizedText = { en: string; zh: string }
type TrustField = 'trust1En' | 'trust1Zh' | 'trust2En' | 'trust2Zh' | 'trust3En' | 'trust3Zh'
type HeroForm = {
  backgroundImage: string
  badgeEn: string
  badgeZh: string
  titleEn: string
  titleZh: string
  subtitleEn: string
  subtitleZh: string
  ctaPrimaryEn: string
  ctaPrimaryZh: string
  ctaPrimaryHref: string
  ctaSecondaryEn: string
  ctaSecondaryZh: string
  ctaSecondaryHref: string
  trust1En: string
  trust1Zh: string
  trust2En: string
  trust2Zh: string
  trust3En: string
  trust3Zh: string
}
type HomeHeroContent = {
  backgroundImage: string
  badge: LocalizedText
  title: LocalizedText
  subtitle: LocalizedText
  ctaPrimary: { text: LocalizedText; href: string }
  ctaSecondary: { text: LocalizedText; href: string }
  trust1: LocalizedText
  trust2: LocalizedText
  trust3: LocalizedText
}
type HomeHeroResponse = { content: HomeHeroContent | null; updatedAt: string | null }
type UploadedImage = { name: string; avatar: { src: string } }

const { t } = useI18n()
const { add: toast } = useToast()
const saving = ref(false)
const uploadingImage = ref(false)
const imageAccept = 'image/jpeg,image/png,image/webp,image/gif,image/avif'

function emptyForm(): HeroForm {
  return {
    backgroundImage: '',
    badgeEn: '',
    badgeZh: '',
    titleEn: '',
    titleZh: '',
    subtitleEn: '',
    subtitleZh: '',
    ctaPrimaryEn: '',
    ctaPrimaryZh: '',
    ctaPrimaryHref: '',
    ctaSecondaryEn: '',
    ctaSecondaryZh: '',
    ctaSecondaryHref: '',
    trust1En: '',
    trust1Zh: '',
    trust2En: '',
    trust2Zh: '',
    trust3En: '',
    trust3Zh: ''
  }
}

const form = reactive<HeroForm>(emptyForm())
const backgroundUploadItem = computed<UploadedImage | null>(() => form.backgroundImage ? {
  name: form.backgroundImage.split('/').pop() || 'hero-image',
  avatar: { src: form.backgroundImage }
} : null)

function localizedPayload(en: string, zh: string) {
  return { en: en.trim(), zh: zh.trim() }
}

function readContent(content: HomeHeroContent) {
  Object.assign(form, {
    backgroundImage: content.backgroundImage || '',
    badgeEn: content.badge.en,
    badgeZh: content.badge.zh,
    titleEn: content.title.en,
    titleZh: content.title.zh,
    subtitleEn: content.subtitle.en,
    subtitleZh: content.subtitle.zh,
    ctaPrimaryEn: content.ctaPrimary.text.en,
    ctaPrimaryZh: content.ctaPrimary.text.zh,
    ctaPrimaryHref: content.ctaPrimary.href,
    ctaSecondaryEn: content.ctaSecondary.text.en,
    ctaSecondaryZh: content.ctaSecondary.text.zh,
    ctaSecondaryHref: content.ctaSecondary.href,
    trust1En: content.trust1.en,
    trust1Zh: content.trust1.zh,
    trust2En: content.trust2.en,
    trust2Zh: content.trust2.zh,
    trust3En: content.trust3.en,
    trust3Zh: content.trust3.zh
  })
}

async function load() {
  const result = await apiFetch<HomeHeroResponse>('/api/page-content/home/hero')
  if (result.content) readContent(result.content)
}

async function onBackgroundUpload(value: File | UploadedImage | null | undefined) {
  if (uploadingImage.value || saving.value) return
  if (!value) {
    form.backgroundImage = ''
    return
  }
  if (!(value instanceof File)) {
    form.backgroundImage = value.avatar.src
    return
  }

  uploadingImage.value = true
  try {
    const body = new FormData()
    body.append('file', value)
    body.append('folder', 'pages/home/hero')
    const result = await apiFetch<{ url: string }>('/api/upload', { method: 'POST', body })
    form.backgroundImage = result.url
  } catch {
  } finally {
    uploadingImage.value = false
  }
}

function validateForm() {
  const errors = []
  const required: Array<[keyof HeroForm, string]> = [
    ['titleEn', 'titleEn'], ['titleZh', 'titleZh'], ['subtitleEn', 'subtitleEn'], ['subtitleZh', 'subtitleZh'],
    ['ctaPrimaryEn', 'ctaPrimaryEn'], ['ctaPrimaryZh', 'ctaPrimaryZh'], ['ctaSecondaryEn', 'ctaSecondaryEn'], ['ctaSecondaryZh', 'ctaSecondaryZh']
  ]
  for (const [name, key] of required) {
    if (!form[name].trim()) errors.push({ name, message: t('admin.pageContent.required', { field: t(`admin.pageContent.${key}`) }) })
  }
  if (!/^\/(?!\/)[^\s]*$/.test(form.ctaPrimaryHref.trim())) {
    errors.push({ name: 'ctaPrimaryHref', message: t('admin.pageContent.internalLinkRequired') })
  }
  if (!/^\/(?!\/)[^\s]*$/.test(form.ctaSecondaryHref.trim())) {
    errors.push({ name: 'ctaSecondaryHref', message: t('admin.pageContent.internalLinkRequired') })
  }
  return errors
}

async function save() {
  if (saving.value || uploadingImage.value) return
  saving.value = true
  const body = {
    backgroundImage: form.backgroundImage,
    badgeEn: form.badgeEn,
    badgeZh: form.badgeZh,
    titleEn: form.titleEn,
    titleZh: form.titleZh,
    subtitleEn: form.subtitleEn,
    subtitleZh: form.subtitleZh,
    ctaPrimaryEn: form.ctaPrimaryEn,
    ctaPrimaryZh: form.ctaPrimaryZh,
    ctaPrimaryHref: form.ctaPrimaryHref,
    ctaSecondaryEn: form.ctaSecondaryEn,
    ctaSecondaryZh: form.ctaSecondaryZh,
    ctaSecondaryHref: form.ctaSecondaryHref,
    trust1En: form.trust1En,
    trust1Zh: form.trust1Zh,
    trust2En: form.trust2En,
    trust2Zh: form.trust2Zh,
    trust3En: form.trust3En,
    trust3Zh: form.trust3Zh
  }
  try {
    const result = await apiFetch<HomeHeroResponse>('/api/page-content/home/hero', { method: 'PUT', body })
    if (result.content) readContent(result.content)
    toast({ title: t('admin.pageContent.saved'), color: 'success' })
  } catch {
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  try {
    await load()
  } catch {
  }
})
</script>
