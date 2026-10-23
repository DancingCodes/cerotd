<template>
  <div class="flex h-full min-h-0 flex-col">
    <div class="mb-4 grid grid-cols-1 gap-2.5 md:grid-cols-[1.4fr_1fr_1fr_auto_auto_auto] md:items-center">
        <UInput v-model="searchInput" type="search" class="w-full" :placeholder="$t('admin.news.searchPlaceholder')" @keyup.enter="applyFilters" />
        <USelect v-model="filterCategory" :items="categoryOptions" class="w-full" @update:model-value="applyFilters" />
        <USelect v-model="filterStatus" :items="statusOptions" class="w-full" @update:model-value="applyFilters" />
        <UButton color="neutral" variant="soft" @click="applyFilters">{{ $t('admin.common.search') }}</UButton>
        <UButton v-if="selectedSlugs.length" color="error" :loading="batchDeleting" @click="removeSelected">{{ $t('admin.common.batchDelete') }} · {{ selectedSlugs.length }}</UButton>
        <UButton :disabled="!categories.length" @click="startCreate">{{ $t('admin.news.new') }}</UButton>
    </div>
    <UModal v-model:open="formOpen" :title="editingSlug ? $t('admin.news.editTitle') : $t('admin.news.createTitle')" scrollable :ui="{ content: 'max-w-7xl' }">
      <template #body>
      <UForm :state="form" class="grid grid-cols-1 gap-4 md:grid-cols-4" @submit="save">
        <UFormField :label="$t('admin.news.titleEn')" name="titleEn" required><UInput v-model="form.titleEn" class="w-full" /></UFormField>
        <UFormField :label="$t('admin.news.titleZh')" name="titleZh" required><UInput v-model="form.titleZh" class="w-full" /></UFormField>
        <UFormField :label="$t('admin.news.category')" name="category" required><USelect v-model="form.category" :items="newsCategoryOptions" class="w-full" /></UFormField>
        <UFormField :label="$t('admin.common.published')" name="isPublished"><USelect v-model="form.isPublished" :items="publishOptions" class="w-full" /></UFormField>
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
        <UFormField class="md:col-span-2" :label="$t('admin.news.summaryEn')" name="summaryEn"><UTextarea v-model="form.summaryEn" class="w-full" :rows="2" /></UFormField>
        <UFormField class="md:col-span-2" :label="$t('admin.news.summaryZh')" name="summaryZh"><UTextarea v-model="form.summaryZh" class="w-full" :rows="2" /></UFormField>
        <div class="md:col-span-2">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.news.contentEn') }}</div>
          <ClientOnly>
            <UEditor v-model="form.contentEn" class="min-h-100" content-type="html" :image="{ inline: false, allowBase64: false }">
              <template #default="{ editor }">
                <div class="flex flex-wrap items-center gap-1 border-b border-[#e5eaf0] p-2">
                  <UEditorToolbar :editor="editor" :items="editorToolbarItems" />
                  <UButton icon="i-lucide-image-plus" color="neutral" variant="ghost" size="sm" @click="uploadEditorImage(editor)" />
                </div>
              </template>
            </UEditor>
            <p class="mt-2 text-xs text-gray-500">{{ $t('admin.news.imageHint') }}</p>
          </ClientOnly>
        </div>
        <div class="md:col-span-2">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.news.contentZh') }}</div>
          <ClientOnly>
            <UEditor v-model="form.contentZh" class="min-h-100" content-type="html" :image="{ inline: false, allowBase64: false }">
              <template #default="{ editor }">
                <div class="flex flex-wrap items-center gap-1 border-b border-[#e5eaf0] p-2">
                  <UEditorToolbar :editor="editor" :items="editorToolbarItems" />
                  <UButton icon="i-lucide-image-plus" color="neutral" variant="ghost" size="sm" @click="uploadEditorImage(editor)" />
                </div>
              </template>
            </UEditor>
            <p class="mt-2 text-xs text-gray-500">{{ $t('admin.news.imageHint') }}</p>
          </ClientOnly>
        </div>
        <p v-if="formError" class="col-span-full text-sm text-error">{{ formError }}</p>
        <div class="col-span-full flex justify-end gap-2"><UButton color="neutral" variant="ghost" @click="closeForm">{{ $t('admin.common.cancel') }}</UButton><UButton type="submit">{{ $t('admin.common.save') }}</UButton></div>
      </UForm>
      </template>
    </UModal>

    <UCard class="min-h-0 flex-1" :ui="{ body: 'flex h-full min-h-0 flex-col' }">
      <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="text-sm text-gray-500">{{ $t('admin.news.empty') }}</div>
      <div v-else class="min-h-0 flex-1 overflow-auto [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10 [&_thead]:bg-white"><UTable :data="items" :columns="columns">
        <template #select-header><UCheckbox :model-value="allSelected" @update:model-value="toggleSelectAll(Boolean($event))" /></template>
        <template #select-cell="{ row }"><UCheckbox :model-value="selectedSlugs.includes(row.original.slug)" @update:model-value="toggleSelect(row.original.slug, Boolean($event))" /></template>
        <template #title-cell="{ row }"><div class="font-semibold">{{ lt(row.original.title) }}</div><div class="text-xs text-gray-500">{{ row.original.slug }}</div></template>
        <template #category-cell="{ row }">{{ categoryLabel(row.original.category) }}</template>
        <template #publishedAt-cell="{ row }">{{ formatDate(row.original.publishedAt) }}</template>
        <template #status-cell="{ row }"><UBadge :color="row.original.isPublished ? 'success' : 'neutral'" variant="subtle">{{ row.original.isPublished ? $t('admin.common.published') : $t('admin.common.draft') }}</UBadge></template>
        <template #actions-cell="{ row }"><div class="flex justify-end gap-1"><UButton :to="`/news/${row.original.slug}`" target="_blank" color="primary" variant="ghost" size="xs">{{ $t('admin.common.view') }}</UButton><UButton color="neutral" variant="ghost" size="xs" @click="startEdit(row.original)">{{ $t('admin.common.edit') }}</UButton><UButton color="error" variant="ghost" size="xs" @click="remove(row.original)">{{ $t('admin.common.delete') }}</UButton></div></template>
      </UTable></div>

      <div v-if="totalPages > 1" class="mt-4 flex justify-end"><UPagination v-model:page="page" :total="total" :items-per-page="pageSize" @update:page="load" /></div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
definePageMeta({
  layout: 'admin'
})

type Localized = { en: string; zh: string }

type NewsItem = {
  id: number
  slug: string
  category: string
  title: Localized
  summary: Localized
  content: Localized
  coverUrl: string | null
  isPublished: boolean
  publishedAt: string
}

const { t } = useI18n()
const lt = useLocalized()

type CategoryItem = {
  slug: string
  name: Localized
}

const categories = ref<CategoryItem[]>([])
const newsCategoryOptions = computed(() => categories.value.map(category => ({ label: lt(category.name), value: category.slug })))
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
const columns = computed<TableColumn<NewsItem>[]>(() => [
  { id: 'select', header: '' },
  { accessorKey: 'title', header: t('admin.common.name') },
  { id: 'category', header: t('admin.news.category') },
  { accessorKey: 'publishedAt', header: t('admin.news.publishedAt') },
  { id: 'status', header: t('admin.common.status') },
  { id: 'actions', header: '' }
])
const selectedSlugs = ref<string[]>([])
const batchDeleting = ref(false)
const allSelected = computed(() => items.value.length > 0 && items.value.every((item) => selectedSlugs.value.includes(item.slug)))
const items = ref<NewsItem[]>([])
const pending = ref(true)
const searchInput = ref('')
const search = ref('')
const filterCategory = ref('all')
const filterStatus = ref<'all' | 'published' | 'draft'>('all')
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const formOpen = ref(false)
const editingSlug = ref('')
const formError = ref('')

const form = reactive({
  titleEn: '',
  titleZh: '',
  slug: '',
  category: 'company',
  summaryEn: '',
  summaryZh: '',
  contentEn: '',
  contentZh: '',
  coverUrl: '',
  publishedAt: '',
  isPublished: false
})

const imageAccept = 'image/jpeg,image/png,image/webp,image/gif,image/avif'
const uploadingCover = ref(false)
const editorToolbarItems = [[
  { icon: 'i-lucide-bold', kind: 'mark', mark: 'bold' },
  { icon: 'i-lucide-italic', kind: 'mark', mark: 'italic' },
  { icon: 'i-lucide-heading-2', kind: 'heading', level: 2 },
  { icon: 'i-lucide-heading-3', kind: 'heading', level: 3 },
  { icon: 'i-lucide-list', kind: 'bulletList' },
  { icon: 'i-lucide-list-ordered', kind: 'orderedList' },
  { icon: 'i-lucide-remove-formatting', kind: 'clearFormatting' }
]]

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

async function uploadImage(file: File) {
  const body = new FormData()
  body.append('file', file)
  body.append('folder', 'news')
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

function uploadEditorImage(editor: any) {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = imageAccept
  input.onchange = async () => {
    const file = input.files?.[0]
    if (!file) return
    try {
      const url = await uploadImage(file)
      editor.chain().focus().setImage({ src: url }).run()
    } catch {}
  }
  input.click()
}

function categoryLabel(slug: string) {
  const found = categories.value.find((item) => item.slug === slug)
  return found ? lt(found.name) : slug
}

function toLocalInput(value: string) {
  if (!value) return ''
  return value.slice(0, 16).replace(' ', 'T')
}

function fromLocalInput(value: string) {
  if (!value) return ''
  return value.length === 16 ? `${value.replace('T', ' ')}:00` : value.replace('T', ' ')
}

function formatDate(value: string) {
  return value ? value.slice(0, 16).replace('T', ' ') : ''
}

function resetForm() {
  Object.assign(form, {
    titleEn: '',
    titleZh: '',
    slug: '',
    category: '',
    summaryEn: '',
    summaryZh: '',
    contentEn: '',
    contentZh: '',
    coverUrl: '',
    publishedAt: toLocalInput(new Date().toISOString()),
    isPublished: false
  })
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
    const [newsData, categoryData] = await Promise.all([
      apiFetch<{ items: NewsItem[]; total?: number }>('/api/news', {
        query: {
          all: 1,
          page: page.value,
          pageSize: pageSize.value,
          q: search.value || undefined,
          category: filterCategory.value === 'all' ? undefined : filterCategory.value,
          status: filterStatus.value
        }
      }),
      apiFetch<{ items: CategoryItem[] }>('/api/news-categories?all=1')
    ])
    items.value = newsData.items
    total.value = Number(newsData.total || newsData.items.length)
    categories.value = categoryData.items
    if (!form.category && categories.value[0]) {
      form.category = categories.value[0].slug
    }
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

async function startCreate() {
  if (!categories.value.length) {
    toast.add({ title: t('admin.news.needCategoryFirst'), color: 'warning' })
    return
  }
  editingSlug.value = ''
  resetForm()
  if (categories.value[0]) form.category = categories.value[0].slug
  formError.value = ''
  formOpen.value = true
}

function startEdit(item: NewsItem) {
  editingSlug.value = item.slug
  Object.assign(form, {
    titleEn: item.title.en,
    titleZh: item.title.zh,
    slug: item.slug,
    category: item.category,
    summaryEn: item.summary.en,
    summaryZh: item.summary.zh,
    contentEn: item.content.en,
    contentZh: item.content.zh,
    coverUrl: item.coverUrl || '',
    publishedAt: toLocalInput(item.publishedAt),
    isPublished: item.isPublished
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
  if (!form.titleEn.trim()) {
    formError.value = t('admin.news.requiredTitleEn')
    return
  }
  if (!form.titleZh.trim()) {
    formError.value = t('admin.news.requiredTitleZh')
    return
  }
  if (!form.category.trim()) {
    formError.value = t('admin.common.requiredCategory')
    return
  }

  const payload = {
    category: form.category,
    titleEn: form.titleEn,
    titleZh: form.titleZh,
    summaryEn: form.summaryEn,
    summaryZh: form.summaryZh,
    contentEn: form.contentEn,
    contentZh: form.contentZh,
    coverUrl: form.coverUrl || null,
    publishedAt: fromLocalInput(form.publishedAt),
    isPublished: form.isPublished
  }

  try {
    if (editingSlug.value) {
      await apiFetch(`/api/news/${editingSlug.value}`, {
        method: 'PUT',
        body: payload
      })
    } else {
      await apiFetch('/api/news', {
        method: 'POST',
        body: payload
      })
    }
    closeForm()
    await load()
  } catch {}
}

async function remove(item: NewsItem) {
  if (!window.confirm(t('admin.news.deleteConfirm', { name: lt(item.title) }))) return
  try {
    await apiFetch(`/api/news/${item.slug}`, {
      method: 'DELETE'
    })
    await load()
  } catch {}
}

async function removeSelected() {
  if (!selectedSlugs.value.length || batchDeleting.value) return
  if (!window.confirm(t('admin.common.batchDeleteConfirm', { count: selectedSlugs.value.length }))) return
  batchDeleting.value = true
  try {
    const slugs = [...selectedSlugs.value]
    for (const slug of slugs) {
      await apiFetch(`/api/news/${slug}`, {
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
