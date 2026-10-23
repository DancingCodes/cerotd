<template>
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <div class="mb-1.5 text-7 font-bold">{{ $t('admin.news.title') }}</div>
        <div class="text-sm text-gray-500">
          {{ $t('admin.news.subtitle') }}
          <span v-if="!pending"> · {{ $t('admin.common.totalCount', { count: total }) }}</span>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <div
          v-if="selectedSlugs.length"
          class="flex h-10 cursor-pointer items-center justify-center rounded-[12px] bg-[#b42318] px-4 text-sm font-semibold whitespace-nowrap text-white"
          :class="{ 'pointer-events-none opacity-60': batchDeleting }"
          @click="removeSelected"
        >
          {{ $t('admin.common.batchDelete') }} · {{ selectedSlugs.length }}
        </div>
        <div
          class="flex h-10 cursor-pointer items-center justify-center rounded-[12px] bg-[#0e7f8f] px-4 text-sm font-semibold whitespace-nowrap text-white"
          :class="{ 'pointer-events-none opacity-60': !categories.length }"
          @click="startCreate"
        >{{ $t('admin.news.new') }}</div>
      </div>
    </div>

    <div class="mb-4 grid gap-2.5">
      <div class="grid grid-cols-1 gap-2.5 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
        <input
          v-model="searchInput"
          class="h-10 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none"
          type="search"
          :placeholder="$t('admin.news.searchPlaceholder')"
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
        <button type="button" class="flex h-10 cursor-pointer items-center justify-center rounded-[12px] bg-[#eef1f4] px-4 text-sm font-semibold whitespace-nowrap text-gray-700" @click="applyFilters">
          {{ $t('admin.common.search') }}
        </button>
      </div>
    </div>
    <div v-if="formOpen" class="mb-4.5 rounded-[12px] border border-[#e5eaf0] bg-white p-5">
      <div class="mb-4 text-lg font-bold">
        {{ editingSlug ? $t('admin.news.editTitle') : $t('admin.news.createTitle') }}
      </div>
      <div class="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600 after:text-[#b42318] after:content-['_*']">{{ $t('admin.news.titleEn') }}</div>
          <input v-model="form.titleEn" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" />
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600 after:text-[#b42318] after:content-['_*']">{{ $t('admin.news.titleZh') }}</div>
          <input v-model="form.titleZh" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" />
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600 after:text-[#b42318] after:content-['_*']">{{ $t('admin.news.category') }}</div>
          <select v-model="form.category" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none">
            <option v-for="item in categories" :key="item.slug" :value="item.slug">
              {{ lt(item.name) }}
            </option>
          </select>
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.news.publishedAt') }}</div>
          <input v-model="form.publishedAt" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" type="datetime-local" />
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.common.published') }}</div>
          <select v-model="form.isPublished" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none">
            <option :value="true">{{ $t('admin.common.yes') }}</option>
            <option :value="false">{{ $t('admin.common.no') }}</option>
          </select>
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
        <label class="col-span-full block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.news.summaryEn') }}</div>
          <textarea v-model="form.summaryEn" class="w-full resize-y rounded-[12px] border border-[#d7dee7] bg-white px-3 py-2.5 outline-none" rows="2" />
        </label>
        <label class="col-span-full block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.news.summaryZh') }}</div>
          <textarea v-model="form.summaryZh" class="w-full resize-y rounded-[12px] border border-[#d7dee7] bg-white px-3 py-2.5 outline-none" rows="2" />
        </label>
        <div class="col-span-full">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.news.contentEn') }}</div>
          <ClientOnly>
            <UEditor v-model="form.contentEn" content-type="html" :image="{ inline: false, allowBase64: false }">
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
        <div class="col-span-full">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.news.contentZh') }}</div>
          <ClientOnly>
            <UEditor v-model="form.contentZh" content-type="html" :image="{ inline: false, allowBase64: false }">
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
      </div>
      <div v-if="formError" class="mt-3 text-3.25 text-[#b42318]">{{ formError }}</div>
      <div class="mt-4 flex gap-2.5">
        <div class="flex h-10 cursor-pointer items-center justify-center rounded-[12px] bg-[#0e7f8f] px-4 text-sm font-semibold whitespace-nowrap text-white" @click="save">{{ $t('admin.common.save') }}</div>
        <div class="flex h-10 cursor-pointer items-center justify-center rounded-[12px] bg-[#eef1f4] px-4 text-sm font-semibold whitespace-nowrap text-gray-700" @click="closeForm">{{ $t('admin.common.cancel') }}</div>
      </div>
    </div>

    <div class="mb-4.5 rounded-[12px] border border-[#e5eaf0] bg-white p-5">
      <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="text-sm text-gray-500">{{ $t('admin.news.empty') }}</div>
      <div v-else class="overflow-x-auto">
        <div class="grid min-w-195 grid-cols-[36px_1.6fr_.8fr_.9fr_.7fr_1.1fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-xs font-bold tracking-[.04em] text-gray-500 uppercase">
          <div class="flex items-center justify-center [&_input]:size-4 [&_input]:cursor-pointer">
            <input
              type="checkbox"
              :checked="allSelected"
              @change="onSelectAllChange($event)"
            />
          </div>
          <div>{{ $t('admin.common.name') }}</div>
          <div>{{ $t('admin.news.category') }}</div>
          <div>{{ $t('admin.news.publishedAt') }}</div>
          <div>{{ $t('admin.common.status') }}</div>
          <div>{{ $t('admin.common.actions') }}</div>
        </div>
        <div v-for="item in items" :key="item.id" class="grid min-w-195 grid-cols-[36px_1.6fr_.8fr_.9fr_.7fr_1.1fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-sm">
          <div class="flex items-center justify-center [&_input]:size-4 [&_input]:cursor-pointer">
            <input
              type="checkbox"
              :checked="selectedSlugs.includes(item.slug)"
              @change="onSelectChange(item.slug, $event)"
            />
          </div>
          <div>
            <div class="font-semibold">{{ lt(item.title) }}</div>
            <div class="mt-0.5 text-xs text-gray-500">{{ item.slug }}</div>
          </div>
          <div>{{ categoryLabel(item.category) }}</div>
          <div>{{ formatDate(item.publishedAt) }}</div>
          <div>{{ item.isPublished ? $t('admin.common.published') : $t('admin.common.draft') }}</div>
          <div class="flex flex-wrap gap-3">
            <NuxtLink :to="`/news/${item.slug}`" class="cursor-pointer font-semibold text-[#0e7f8f] no-underline" target="_blank">{{ $t('admin.common.view') }}</NuxtLink>
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
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
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
const selectedSlugs = ref<string[]>([])
const batchDeleting = ref(false)
const allSelected = computed(() => items.value.length > 0 && items.value.every((item) => selectedSlugs.value.includes(item.slug)))
const items = ref<NewsItem[]>([])
const pending = ref(true)
const searchInput = ref('')
const search = ref('')
const filterCategory = ref('')
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

function onSelectAllChange(event: Event) {
  toggleSelectAll((event.target as HTMLInputElement).checked)
}

function onSelectChange(slug: string, event: Event) {
  toggleSelect(slug, (event.target as HTMLInputElement).checked)
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
          category: filterCategory.value || undefined,
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

function goPage(next: number) {
  page.value = Math.max(1, next)
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
