<template>
  <div>
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <div class="mb-1.5 text-7 font-bold">{{ $t('admin.products.title') }}</div>
        <div class="text-sm text-gray-500">
          {{ $t('admin.products.subtitle') }}
          <span v-if="!pending"> · {{ $t('admin.common.totalCount', { count: total }) }}</span>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <div
          v-if="selectedSlugs.length"
          class="inline-flex h-10 cursor-pointer items-center justify-center rounded-[12px] bg-[#b42318] px-4 text-sm font-semibold whitespace-nowrap text-white"
          :class="{ 'pointer-events-none opacity-60': batchDeleting }"
          @click="removeSelected"
        >
          {{ $t('admin.common.batchDelete') }} · {{ selectedSlugs.length }}
        </div>
        <div
          class="inline-flex h-10 cursor-pointer items-center justify-center rounded-[12px] bg-[#0e7f8f] px-4 text-sm font-semibold whitespace-nowrap text-white"
          :class="{ 'pointer-events-none opacity-60': !categories.length }"
          @click="startCreate"
        >{{ $t('admin.products.new') }}</div>
      </div>
    </div>

    <div class="mb-4 grid gap-2.5">
      <div class="grid grid-cols-1 gap-2.5 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
        <input
          v-model="searchInput"
          class="h-10 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none"
          type="search"
          :placeholder="$t('admin.common.searchPlaceholder')"
          @keyup.enter="applyFilters"
        />
        <select v-model="filterCategory" class="h-10 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" @change="applyFilters">
          <option value="">{{ $t('admin.common.allCategories') }}</option>
          <option v-for="category in categories" :key="category.slug" :value="category.slug">
            {{ lt(category.name) }}
          </option>
        </select>
        <select v-model="filterStatus" class="h-10 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" @change="applyFilters">
          <option value="all">{{ $t('admin.common.allStatuses') }}</option>
          <option value="published">{{ $t('admin.common.filterPublished') }}</option>
          <option value="draft">{{ $t('admin.common.filterDraft') }}</option>
        </select>
        <button type="button" class="inline-flex h-10 cursor-pointer items-center justify-center rounded-[12px] bg-[#eef1f4] px-4 text-sm font-semibold whitespace-nowrap text-gray-700" @click="applyFilters">
          {{ $t('admin.common.search') }}
        </button>
      </div>
    </div>
    <div v-if="formOpen" class="mb-4.5 rounded-[12px] border border-[#e5eaf0] bg-white p-5">
      <div class="mb-4 text-lg font-bold">
        {{ editingSlug ? $t('admin.products.editTitle') : $t('admin.products.createTitle') }}
      </div>
      <div class="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600 after:text-[#b42318] after:content-['_*']">{{ $t('admin.common.nameEn') }}</div>
          <input v-model="form.nameEn" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" />
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600 after:text-[#b42318] after:content-['_*']">{{ $t('admin.common.nameZh') }}</div>
          <input v-model="form.nameZh" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" />
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600 after:text-[#b42318] after:content-['_*']">{{ $t('admin.products.category') }}</div>
          <select v-model="form.categorySlug" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none">
            <option value="">{{ $t('admin.products.selectCategory') }}</option>
            <option v-for="category in categories" :key="category.slug" :value="category.slug">
              {{ lt(category.name) }}
            </option>
          </select>
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.common.sort') }}</div>
          <input v-model.number="form.sortOrder" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" type="number" />
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.common.published') }}</div>
          <select v-model="form.isPublished" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none">
            <option :value="true">{{ $t('admin.common.yes') }}</option>
            <option :value="false">{{ $t('admin.common.no') }}</option>
          </select>
        </label>
        <label class="col-span-full block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.products.summaryEn') }}</div>
          <textarea v-model="form.summaryEn" class="w-full resize-y rounded-[12px] border border-[#d7dee7] bg-white px-3 py-2.5 outline-none" rows="2" />
        </label>
        <label class="col-span-full block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.products.summaryZh') }}</div>
          <textarea v-model="form.summaryZh" class="w-full resize-y rounded-[12px] border border-[#d7dee7] bg-white px-3 py-2.5 outline-none" rows="2" />
        </label>
        <label class="col-span-full block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.products.descriptionEn') }}</div>
          <textarea v-model="form.descriptionEn" class="w-full resize-y rounded-[12px] border border-[#d7dee7] bg-white px-3 py-2.5 outline-none" rows="4" />
        </label>
        <label class="col-span-full block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.products.descriptionZh') }}</div>
          <textarea v-model="form.descriptionZh" class="w-full resize-y rounded-[12px] border border-[#d7dee7] bg-white px-3 py-2.5 outline-none" rows="4" />
        </label>
        <div class="col-span-full">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.common.coverUrl') }}</div>
          <UFileUpload
            :model-value="coverUploadItem"
            :accept="imageAccept"
            :label="uploadingCover ? $t('admin.upload.uploading') : (form.coverUrl ? $t('admin.upload.replace') : $t('admin.upload.button'))"
            :disabled="uploadingCover"
            @update:model-value="onCoverUpload"
          />
        </div>
        <div class="col-span-full">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.products.images') }}</div>
          <UFileUpload
            :model-value="imageUploadItems"
            :accept="imageAccept"
            :label="uploadingImages ? $t('admin.upload.uploading') : $t('admin.upload.addImage')"
            multiple
            :disabled="uploadingImages"
            @update:model-value="onImageUpload"
          />
        </div>
        <label class="col-span-full block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.products.specsEn') }}</div>
          <textarea v-model="form.specsEnText" class="w-full resize-y rounded-[12px] border border-[#d7dee7] bg-white px-3 py-2.5 outline-none" rows="3" />
        </label>
        <label class="col-span-full block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.products.specsZh') }}</div>
          <textarea v-model="form.specsZhText" class="w-full resize-y rounded-[12px] border border-[#d7dee7] bg-white px-3 py-2.5 outline-none" rows="3" />
        </label>
      </div>
      <div v-if="formError" class="mt-3 text-3.25 text-[#b42318]">{{ formError }}</div>
      <div class="mt-4 flex gap-2.5">
        <div class="inline-flex h-10 cursor-pointer items-center justify-center rounded-[12px] bg-[#0e7f8f] px-4 text-sm font-semibold whitespace-nowrap text-white" @click="save">{{ $t('admin.common.save') }}</div>
        <div class="inline-flex h-10 cursor-pointer items-center justify-center rounded-[12px] bg-[#eef1f4] px-4 text-sm font-semibold whitespace-nowrap text-gray-700" @click="closeForm">{{ $t('admin.common.cancel') }}</div>
      </div>
    </div>

    <div class="mb-4.5 rounded-[12px] border border-[#e5eaf0] bg-white p-5">
      <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="text-sm text-gray-500">{{ $t('admin.products.empty') }}</div>
      <div v-else class="overflow-x-auto">
        <div class="grid min-w-195 grid-cols-[36px_1.5fr_1fr_.5fr_.7fr_1.1fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-xs font-bold tracking-[.04em] text-gray-500 uppercase">
          <div class="flex items-center justify-center [&_input]:size-4 [&_input]:cursor-pointer">
            <input
              type="checkbox"
              :checked="allSelected"
              :aria-label="$t('admin.common.batchDelete')"
              @change="onSelectAllChange($event)"
            />
          </div>
          <div>{{ $t('admin.common.name') }}</div>
          <div>{{ $t('admin.products.category') }}</div>
          <div>{{ $t('admin.common.sort') }}</div>
          <div>{{ $t('admin.common.status') }}</div>
          <div>{{ $t('admin.common.actions') }}</div>
        </div>
        <div v-for="item in items" :key="item.id" class="grid min-w-195 grid-cols-[36px_1.5fr_1fr_.5fr_.7fr_1.1fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-sm">
          <div class="flex items-center justify-center [&_input]:size-4 [&_input]:cursor-pointer">
            <input
              type="checkbox"
              :checked="selectedSlugs.includes(item.slug)"
              @change="onSelectChange(item.slug, $event)"
            />
          </div>
          <div>
            <div class="font-semibold">{{ lt(item.name) }}</div>
            <div class="mt-0.5 text-xs text-gray-500">{{ item.slug }}</div>
          </div>
          <div>{{ item.category ? lt(item.category.name) : '-' }}</div>
          <div>{{ item.sortOrder }}</div>
          <div>{{ item.isPublished ? $t('admin.common.published') : $t('admin.common.draft') }}</div>
          <div class="flex flex-wrap gap-3">
            <NuxtLink :to="`/products/${item.slug}`" class="cursor-pointer font-semibold text-[#0e7f8f] no-underline" target="_blank">{{ $t('admin.common.view') }}</NuxtLink>
            <div class="cursor-pointer font-semibold text-[#0e7f8f]" @click="startEdit(item)">{{ $t('admin.common.edit') }}</div>
            <div class="cursor-pointer font-semibold text-[#b42318]" @click="remove(item)">{{ $t('admin.common.delete') }}</div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="mt-4 flex items-center justify-end gap-2.5">
        <button type="button" class="h-8.5 cursor-pointer rounded-[10px] border border-[#d7dee7] bg-white px-3 text-3.25 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-45" :disabled="page <= 1" @click="goPage(page - 1)">
          {{ $t('admin.common.prevPage') }}
        </button>
        <span class="text-3.25 text-gray-500">{{ $t('admin.common.pageStatus', { page, totalPages }) }}</span>
        <button type="button" class="h-8.5 cursor-pointer rounded-[10px] border border-[#d7dee7] bg-white px-3 text-3.25 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-45" :disabled="page >= totalPages" @click="goPage(page + 1)">
          {{ $t('admin.common.nextPage') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PRODUCT_CATEGORIES } from '#shared/product-categories'

definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

type Localized = { en: string; zh: string }

type CategoryItem = {
  slug: string
  name: Localized
}

type ProductItem = {
  id: number
  slug: string
  category: { slug: string; name: Localized } | null
  name: Localized
  summary: Localized
  description: Localized
  coverUrl: string | null
  images: string[]
  specs: { en: string[]; zh: string[] }
  sortOrder: number
  isPublished: boolean
}

const { t } = useI18n()
const lt = useLocalized()
const { authHeaders } = useAdminAuth()
const toast = useToast()
const pending = ref(true)
const searchInput = ref('')
const search = ref('')
const filterCategory = ref('')
const filterStatus = ref<'all' | 'published' | 'draft'>('all')
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const selectedSlugs = ref<string[]>([])
const batchDeleting = ref(false)
const allSelected = computed(() => items.value.length > 0 && items.value.every((item) => selectedSlugs.value.includes(item.slug)))
const items = ref<ProductItem[]>([])
const categories = computed(() => PRODUCT_CATEGORIES.map((item) => ({ slug: item.slug, name: item.name })))
const formOpen = ref(false)
const editingSlug = ref('')
const formError = ref('')

type ProductForm = {
  slug: string
  categorySlug: string
  nameEn: string
  nameZh: string
  summaryEn: string
  summaryZh: string
  descriptionEn: string
  descriptionZh: string
  coverUrl: string
  images: string[]
  specsEnText: string
  specsZhText: string
  sortOrder: number
  isPublished: boolean
}

const emptyForm = (): ProductForm => ({
  slug: '',
  categorySlug: '',
  nameEn: '',
  nameZh: '',
  summaryEn: '',
  summaryZh: '',
  descriptionEn: '',
  descriptionZh: '',
  coverUrl: '',
  images: [],
  specsEnText: '',
  specsZhText: '',
  sortOrder: 0,
  isPublished: true,
})

const form = reactive(emptyForm())
const imageAccept = 'image/jpeg,image/png,image/webp,image/gif,image/avif'
const uploadingCover = ref(false)
const uploadingImages = ref(false)

type UploadedImage = {
  name: string
  avatar: { src: string }
}

function uploadedImage(url: string): UploadedImage {
  return {
    name: url.split('/').pop() || 'image',
    avatar: { src: url }
  }
}

const coverUploadItem = computed(() => form.coverUrl ? uploadedImage(form.coverUrl) : null)
const imageUploadItems = computed(() => form.images.map(uploadedImage))

async function uploadImage(file: File) {
  const body = new FormData()
  body.append('file', file)
  body.append('folder', 'products')
  const result = await apiFetch<{ url: string }>('/api/upload', {
    method: 'POST',
    headers: authHeaders(),
    body
  })
  return result.url
}

async function onCoverUpload(value: File | UploadedImage | null | undefined) {
  if (!value) {
    form.coverUrl = ''
    return
  }
  if (!(value instanceof File)) {
    form.coverUrl = value.avatar.src
    return
  }

  uploadingCover.value = true
  try {
    form.coverUrl = await uploadImage(value)
  } catch (err: any) {
    toast.add({
      title: t('admin.upload.failed'),
      description: err?.msg || t('admin.upload.failed'),
      color: 'error'
    })
  } finally {
    uploadingCover.value = false
  }
}

async function onImageUpload(value: Array<File | UploadedImage> | null | undefined) {
  const entries = value || []
  const retained = entries
    .filter((item): item is UploadedImage => !(item instanceof File))
    .map((item) => item.avatar.src)
  const newFiles = entries.filter((item): item is File => item instanceof File)

  if (!newFiles.length) {
    form.images = retained
    return
  }

  uploadingImages.value = true
  try {
    const uploaded = await Promise.all(newFiles.map(uploadImage))
    form.images = [...retained, ...uploaded]
  } catch (err: any) {
    form.images = retained
    toast.add({
      title: t('admin.upload.failed'),
      description: err?.msg || t('admin.upload.failed'),
      color: 'error'
    })
  } finally {
    uploadingImages.value = false
  }
}

function linesToArray(text: string) {
  return text
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean)
}

function toggleSelect(slug: string, checked: boolean) {
  if (checked) {
    if (!selectedSlugs.value.includes(slug)) selectedSlugs.value = [...selectedSlugs.value, slug]
  } else {
    selectedSlugs.value = selectedSlugs.value.filter((item) => item !== slug)
  }
}

function toggleSelectAll(checked: boolean) {
  selectedSlugs.value = checked ? items.value.map((item) => item.slug) : []
}

function onSelectAllChange(event: Event) {
  toggleSelectAll((event.target as HTMLInputElement).checked)
}

function onSelectChange(slug: string, event: Event) {
  toggleSelect(slug, (event.target as HTMLInputElement).checked)
}

async function load() {
  pending.value = true
  try {
    const productData = await apiFetch<{ items: ProductItem[]; total?: number }>('/api/products', {
      headers: authHeaders(),
      query: {
        all: 1,
        page: page.value,
        pageSize: pageSize.value,
        q: search.value || undefined,
        category: filterCategory.value || undefined,
        status: filterStatus.value
      }
    })
    items.value = productData.items
    total.value = Number(productData.total || productData.items.length)
    if (items.value.length === 0 && page.value > 1) {
      page.value -= 1
      await load()
      return
    }
  } finally {
    pending.value = false
  }
}

function applyFilters() {
  search.value = searchInput.value.trim()
  page.value = 1
  load()
}

function goPage(next: number) {
  page.value = Math.max(1, next)
  load()
}

function startCreate() {
  editingSlug.value = ''
  Object.assign(form, emptyForm())
  form.categorySlug = categories.value[0]?.slug || ''
  formError.value = ''
  formOpen.value = true
}

function startEdit(item: ProductItem) {
  editingSlug.value = item.slug
  Object.assign(form, {
    slug: item.slug,
    categorySlug: item.category?.slug || '',
    nameEn: item.name.en,
    nameZh: item.name.zh,
    summaryEn: item.summary.en,
    summaryZh: item.summary.zh,
    descriptionEn: item.description.en,
    descriptionZh: item.description.zh,
    coverUrl: item.coverUrl || '',
    images: [...item.images],
    specsEnText: item.specs.en.join('\n'),
    specsZhText: item.specs.zh.join('\n'),
    sortOrder: item.sortOrder,
    isPublished: item.isPublished,
  })
  formError.value = ''
  formOpen.value = true
}

function closeForm() {
  formOpen.value = false
  formError.value = ''
}

async function save() {
  formError.value = ''
  if (!form.nameEn.trim()) {
    formError.value = t('admin.common.requiredNameEn')
    return
  }
  if (!form.nameZh.trim()) {
    formError.value = t('admin.common.requiredNameZh')
    return
  }
  if (!form.categorySlug.trim()) {
    formError.value = t('admin.common.requiredCategory')
    return
  }

  const payload = {
    categorySlug: form.categorySlug,
    nameEn: form.nameEn,
    nameZh: form.nameZh,
    summaryEn: form.summaryEn,
    summaryZh: form.summaryZh,
    descriptionEn: form.descriptionEn,
    descriptionZh: form.descriptionZh,
    coverUrl: form.coverUrl || null,
    images: form.images,
    specsEn: linesToArray(form.specsEnText),
    specsZh: linesToArray(form.specsZhText),
    sortOrder: Number(form.sortOrder) || 0,
    isPublished: form.isPublished,
  }

  try {
    if (editingSlug.value) {
      await apiFetch(`/api/products/${editingSlug.value}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: payload
      })
    } else {
      await apiFetch('/api/products', {
        method: 'POST',
        headers: authHeaders(),
        body: payload
      })
    }
    closeForm()
    await load()
  } catch (err: any) {
    formError.value = err?.msg || t('admin.common.saveFailed')
  }
}

async function remove(item: ProductItem) {
  if (!window.confirm(t('admin.products.deleteConfirm', { name: lt(item.name) }))) return
  try {
    await apiFetch(`/api/products/${item.slug}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    await load()
  } catch (err: any) {
    toast.add({ title: t('admin.common.deleteFailed'), description: err?.msg || t('admin.common.deleteFailed'), color: 'error' })
  }
}

async function removeSelected() {
  if (!selectedSlugs.value.length || batchDeleting.value) return
  if (!window.confirm(t('admin.common.batchDeleteConfirm', { count: selectedSlugs.value.length }))) return
  batchDeleting.value = true
  try {
    const slugs = [...selectedSlugs.value]
    for (const slug of slugs) {
      await apiFetch(`/api/products/${slug}`, {
        method: 'DELETE',
        headers: authHeaders()
      })
    }
    selectedSlugs.value = []
    await load()
  } catch (err: any) {
    toast.add({ title: t('admin.common.deleteFailed'), description: err?.msg || t('admin.common.deleteFailed'), color: 'error' })
    await load()
  } finally {
    batchDeleting.value = false
  }
}


onMounted(load)
</script>
