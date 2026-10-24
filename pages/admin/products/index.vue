<template>
  <div class="flex h-full min-h-0 flex-col">
    <div class="mb-4 grid grid-cols-[1.4fr_1fr_1fr_auto_auto_auto] items-center gap-2.5">
      <UInput v-model="searchInput" type="search" class="w-full" :placeholder="$t('admin.products.searchPlaceholder')"
        @keyup.enter="applyFilters" />
      <USelect v-model="filterCategory" :items="categoryOptions" class="w-full" />
      <USelect v-model="filterStatus" :items="statusOptions" class="w-full" />
      <UButton color="neutral" variant="soft" @click="applyFilters">{{ $t('admin.common.search') }}</UButton>
      <UButton v-if="selectedSlugs.length" color="error" :loading="batchDeleting" @click="removeSelected">{{
        $t('admin.common.batchDelete') }} · {{ selectedSlugs.length }}</UButton>
      <UButton :disabled="!categories.length" @click="startCreate">{{ $t('admin.products.new') }}</UButton>
    </div>
    <UModal v-model:open="formOpen"
      :title="editingSlug ? $t('admin.products.editTitle') : $t('admin.products.createTitle')" scrollable
      :ui="{ content: 'max-w-7xl' }">
      <template #body>
        <UForm :state="form" class="grid grid-cols-4 gap-4" @submit="save">
          <UFormField :label="$t('admin.common.nameEn')" name="nameEn" required>
            <UInput v-model="form.nameEn" class="w-full" />
          </UFormField>
          <UFormField :label="$t('admin.common.nameZh')" name="nameZh" required>
            <UInput v-model="form.nameZh" class="w-full" />
          </UFormField>
          <UFormField :label="$t('admin.products.category')" name="categorySlug" required>
            <USelect v-model="form.categorySlug" :items="productCategoryOptions" class="w-full" />
          </UFormField>
          <UFormField :label="$t('admin.common.published')" name="isPublished">
            <USelect v-model="form.isPublished" :items="publishOptions" class="w-full" />
          </UFormField>
          <UFormField class="col-span-2" :label="$t('admin.products.summaryEn')" name="summaryEn">
            <UTextarea v-model="form.summaryEn" class="w-full" :rows="2" />
          </UFormField>
          <UFormField class="col-span-2" :label="$t('admin.products.summaryZh')" name="summaryZh">
            <UTextarea v-model="form.summaryZh" class="w-full" :rows="2" />
          </UFormField>
          <UFormField class="col-span-2" :label="$t('admin.products.descriptionEn')" name="descriptionEn">
            <UTextarea v-model="form.descriptionEn" class="w-full" :rows="4" />
          </UFormField>
          <UFormField class="col-span-2" :label="$t('admin.products.descriptionZh')" name="descriptionZh">
            <UTextarea v-model="form.descriptionZh" class="w-full" :rows="4" />
          </UFormField>
          <div class="col-span-2">
            <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.common.coverUrl') }}</div>
            <UFileUpload :model-value="coverUploadItem" :accept="imageAccept"
              :label="uploadingCover ? $t('admin.upload.uploading') : (form.coverUrl ? $t('admin.upload.replace') : $t('admin.upload.button'))"
              :disabled="uploadingCover" @update:model-value="onCoverUpload" />
          </div>
          <div class="col-span-2">
            <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.products.images') }}</div>
            <UFileUpload :model-value="imageUploadItems" :accept="imageAccept"
              :label="uploadingImages ? $t('admin.upload.uploading') : $t('admin.upload.addImage')" multiple
              :disabled="uploadingImages" @update:model-value="onImageUpload" />
          </div>
          <UFormField class="col-span-2" :label="$t('admin.products.specsEn')" name="specsEnText">
            <UTextarea v-model="form.specsEnText" class="w-full" :rows="3" />
          </UFormField>
          <UFormField class="col-span-2" :label="$t('admin.products.specsZh')" name="specsZhText">
            <UTextarea v-model="form.specsZhText" class="w-full" :rows="3" />
          </UFormField>
          <p v-if="formError" class="col-span-full text-sm text-error">{{ formError }}</p>
          <div class="col-span-full flex justify-end gap-2">
            <UButton color="neutral" variant="ghost" @click="closeForm">{{ $t('admin.common.cancel') }}</UButton>
            <UButton type="submit">{{ $t('admin.common.save') }}</UButton>
          </div>
        </UForm>
      </template>
    </UModal>

    <UCard class="min-h-0 flex-1" :ui="{ body: 'flex h-full min-h-0 flex-col' }">
      <UTable :data="items" :columns="columns" :loading="pending" :empty="$t('admin.products.empty')" sticky="header"
        :ui="{ base: 'w-full table-fixed' }" class="min-h-0 flex-1">
        <template #select-header>
          <UCheckbox :model-value="allSelected" @update:model-value="toggleSelectAll(Boolean($event))" />
        </template>
        <template #select-cell="{ row }">
          <UCheckbox :model-value="selectedSlugs.includes(row.original.slug)"
            @update:model-value="toggleSelect(row.original.slug, Boolean($event))" />
        </template>
        <template #name-cell="{ row }">
          <div class="font-semibold">{{ lt(row.original.name) }}</div>
        </template>
        <template #category-cell="{ row }">{{ row.original.category ? lt(row.original.category.name) : '-' }}</template>
        <template #status-cell="{ row }">
          <UBadge :color="row.original.isPublished ? 'success' : 'neutral'" variant="subtle">{{ row.original.isPublished
            ? $t('admin.common.published') : $t('admin.common.draft') }}</UBadge>
        </template>
        <template #actions-cell="{ row }">
          <div class="flex justify-end gap-1">
            <UButton :to="`/products/${row.original.slug}`" target="_blank" color="primary" variant="ghost" size="xs">{{
              $t('admin.common.view') }}</UButton>
            <UButton color="neutral" variant="ghost" size="xs" @click="startEdit(row.original)">{{
              $t('admin.common.edit') }}</UButton>
            <UButton color="error" variant="ghost" size="xs" @click="remove(row.original)">{{ $t('admin.common.delete')
              }}</UButton>
          </div>
        </template>
      </UTable>

      <div v-if="totalPages > 1" class="mt-4 flex justify-end">
        <UPagination v-model:page="page" :total="total" :items-per-page="pageSize" @update:page="load" />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
definePageMeta({
  layout: 'admin'
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
  isPublished: boolean
}

const { t } = useI18n()
const lt = useLocalized()
const pending = ref(true)
const searchInput = ref('')
const search = ref('')
const filterCategory = ref('all')
const filterStatus = ref<'all' | 'published' | 'draft'>('all')
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const selectedSlugs = ref<string[]>([])
const batchDeleting = ref(false)
const allSelected = computed(() => items.value.length > 0 && items.value.every((item) => selectedSlugs.value.includes(item.slug)))
const items = ref<ProductItem[]>([])
const categories = ref<CategoryItem[]>([])
const productCategoryOptions = computed(() => [
  ...categories.value.map(category => ({ label: lt(category.name), value: category.slug }))
])
const publishOptions = computed(() => [
  { label: t('admin.common.yes'), value: true },
  { label: t('admin.common.no'), value: false }
])
const categoryOptions = computed(() => [
  { label: t('admin.common.allCategories'), value: 'all' },
  ...categories.value.map(category => ({ label: lt(category.name), value: category.slug }))
])
const statusOptions = computed(() => [
  { label: t('admin.common.allStatuses'), value: 'all' },
  { label: t('admin.common.filterPublished'), value: 'published' },
  { label: t('admin.common.filterDraft'), value: 'draft' }
])
const columns = computed<TableColumn<ProductItem>[]>(() => [
  { id: 'select', header: '', meta: { style: { th: { width: '3rem' }, td: { width: '3rem' } } } },
  { accessorKey: 'name', header: t('admin.common.name'), meta: { style: { th: { width: 'calc((100% - 15rem) / 3)' }, td: { width: 'calc((100% - 15rem) / 3)' } } } },
  { id: 'category', header: t('admin.products.category'), meta: { style: { th: { width: 'calc((100% - 15rem) / 3)' }, td: { width: 'calc((100% - 15rem) / 3)' } } } },
  { id: 'status', header: t('admin.common.status'), meta: { style: { th: { width: 'calc((100% - 15rem) / 3)' }, td: { width: 'calc((100% - 15rem) / 3)' } } } },
  { id: 'actions', header: '', meta: { style: { th: { width: '12rem' }, td: { width: '12rem' } } } }
])
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
  } catch {
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
  } catch {
    form.images = retained
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

async function load() {
  pending.value = true
  try {
    const [productData, categoryData] = await Promise.all([
      apiFetch<{ items: ProductItem[]; total?: number }>('/api/products', {
        query: {
          all: 1,
          page: page.value,
          pageSize: pageSize.value,
          q: search.value || undefined,
          category: filterCategory.value === 'all' ? undefined : filterCategory.value,
          status: filterStatus.value
        }
      }),
      apiFetch<{ items: CategoryItem[] }>('/api/product-categories')
    ])
    items.value = productData.items
    categories.value = categoryData.items
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
    isPublished: form.isPublished,
  }

  try {
    if (editingSlug.value) {
      await apiFetch(`/api/products/${editingSlug.value}`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await apiFetch('/api/products', {
        method: 'POST',
        body: payload
      })
    }
    closeForm()
    await load()
  } catch { }
}

async function remove(item: ProductItem) {
  if (!window.confirm(t('admin.products.deleteConfirm', { name: lt(item.name) }))) return
  try {
    await apiFetch(`/api/products/${item.slug}`, {
      method: 'DELETE'
    })
    await load()
  } catch { }
}

async function removeSelected() {
  if (!selectedSlugs.value.length || batchDeleting.value) return
  if (!window.confirm(t('admin.common.batchDeleteConfirm', { count: selectedSlugs.value.length }))) return
  batchDeleting.value = true
  try {
    const slugs = [...selectedSlugs.value]
    for (const slug of slugs) {
      await apiFetch(`/api/products/${slug}`, {
        method: 'DELETE'
      })
    }
    selectedSlugs.value = []
    await load()
  } catch {
    await load()
  } finally {
    batchDeleting.value = false
  }
}


onMounted(load)
</script>
