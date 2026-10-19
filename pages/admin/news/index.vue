<template>
  <div>
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <div class="mb-1.5 text-[28px] font-bold">{{ $t('admin.news.title') }}</div>
        <div class="text-sm text-gray-500">
          {{ $t('admin.news.subtitle') }}
          <span v-if="!pending"> · {{ $t('admin.common.totalCount', { count: total }) }}</span>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <div
          v-if="selectedSlugs.length"
          class="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-[#b42318] px-4 text-sm font-semibold whitespace-nowrap text-white"
          :class="{ 'pointer-events-none opacity-60': batchDeleting }"
          @click="removeSelected"
        >
          {{ $t('admin.common.batchDelete') }} · {{ selectedSlugs.length }}
        </div>
        <div
          class="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-[#0e7f8f] px-4 text-sm font-semibold whitespace-nowrap text-white"
          :class="{ 'pointer-events-none opacity-60': !categories.length }"
          @click="startCreate"
        >{{ $t('admin.news.new') }}</div>
      </div>
    </div>

    <div class="mb-4 grid gap-2.5">
      <div class="grid grid-cols-1 gap-2.5 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
        <input
          v-model="searchInput"
          class="h-10 w-full rounded-xl border border-[#d7dee7] bg-white px-3 outline-none"
          type="search"
          :placeholder="$t('admin.news.searchPlaceholder')"
          @keyup.enter="applyFilters"
        />
        <select v-model="filterCategory" class="h-10 w-full rounded-xl border border-[#d7dee7] bg-white px-3 outline-none" @change="applyFilters">
          <option value="">{{ $t('admin.common.allCategories') }}</option>
          <option v-for="category in categories" :key="category.slug" :value="category.slug">
            {{ lt(category.name) }}
          </option>
        </select>
        <select v-model="filterStatus" class="admin-filter-select" @change="applyFilters">
          <option value="all">{{ $t('admin.common.allStatuses') }}</option>
          <option value="published">{{ $t('admin.common.filterPublished') }}</option>
          <option value="draft">{{ $t('admin.common.filterDraft') }}</option>
        </select>
        <button type="button" class="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-[#eef1f4] px-4 text-sm font-semibold whitespace-nowrap text-gray-700" @click="applyFilters">
          {{ $t('admin.common.search') }}
        </button>
      </div>
    </div>
    <div v-if="formOpen" class="mb-[18px] rounded-xl border border-[#e5eaf0] bg-white p-5">
      <div class="mb-4 text-lg font-bold">
        {{ editingSlug ? $t('admin.news.editTitle') : $t('admin.news.createTitle') }}
      </div>
      <div class="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <label class="block">
          <div class="mb-1.5 text-[13px] font-semibold text-gray-600 after:text-[#b42318] after:content-["_*"]">{{ $t('admin.news.titleEn') }}</div>
          <input v-model="form.titleEn" class="h-[42px] w-full rounded-xl border border-[#d7dee7] bg-white px-3 outline-none" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label is-required">{{ $t('admin.news.titleZh') }}</div>
          <input v-model="form.titleZh" class="admin-field-input" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label is-required">{{ $t('admin.news.category') }}</div>
          <select v-model="form.category" class="admin-field-input">
            <option v-for="item in categories" :key="item.slug" :value="item.slug">
              {{ lt(item.name) }}
            </option>
          </select>
        </label>
        <label class="admin-field">
          <div class="mb-1.5 text-[13px] font-semibold text-gray-600">{{ $t('admin.news.publishedAt') }}</div>
          <input v-model="form.publishedAt" class="admin-field-input" type="datetime-local" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.common.published') }}</div>
          <select v-model="form.isPublished" class="admin-field-input">
            <option :value="true">{{ $t('admin.common.yes') }}</option>
            <option :value="false">{{ $t('admin.common.no') }}</option>
          </select>
        </label>
        <div class="col-span-full block">
          <div class="admin-field-label">{{ $t('admin.common.coverUrl') }}</div>
          <AdminImageUpload v-model="form.coverUrl" folder="news" />
        </div>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.news.summaryEn') }}</div>
          <textarea v-model="form.summaryEn" class="w-full resize-y rounded-xl border border-[#d7dee7] bg-white px-3 py-2.5 outline-none" rows="2" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.news.summaryZh') }}</div>
          <textarea v-model="form.summaryZh" class="admin-field-textarea" rows="2" />
        </label>
        <div class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.news.contentEn') }}</div>
          <ClientOnly>
            <AdminRichEditor v-model="form.contentEn" folder="news" :hint="$t('admin.news.imageHint')" />
          </ClientOnly>
        </div>
        <div class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.news.contentZh') }}</div>
          <ClientOnly>
            <AdminRichEditor v-model="form.contentZh" :hint="$t('admin.news.imageHint')" />
          </ClientOnly>
        </div>
      </div>
      <div v-if="formError" class="mt-3 text-[13px] text-[#b42318]">{{ formError }}</div>
      <div class="mt-4 flex gap-2.5">
        <div class="admin-page-btn" @click="save">{{ $t('admin.common.save') }}</div>
        <div class="admin-page-btn admin-page-btn-muted" @click="closeForm">{{ $t('admin.common.cancel') }}</div>
      </div>
    </div>

    <div class="mb-[18px] rounded-xl border border-[#e5eaf0] bg-white p-5">
      <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="admin-empty">{{ $t('admin.news.empty') }}</div>
      <div v-else class="overflow-x-auto">
        <div class="grid min-w-[780px] grid-cols-[36px_1.6fr_.8fr_.9fr_.7fr_1.1fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-xs font-bold tracking-[.04em] text-gray-500 uppercase">
          <div class="flex items-center justify-center [&_input]:size-4 [&_input]:cursor-pointer">
            <input
              type="checkbox"
              :checked="allSelected"
              :aria-label="$t('admin.common.batchDelete')"
              @change="onSelectAllChange($event)"
            />
          </div>
          <div>{{ $t('admin.common.name') }}</div>
          <div>{{ $t('admin.news.category') }}</div>
          <div>{{ $t('admin.news.publishedAt') }}</div>
          <div>{{ $t('admin.common.status') }}</div>
          <div>{{ $t('admin.common.actions') }}</div>
        </div>
        <div v-for="item in items" :key="item.id" class="grid min-w-[780px] grid-cols-[36px_1.6fr_.8fr_.9fr_.7fr_1.1fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-sm">
          <div class="admin-table-check">
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
            <div class="admin-link" @click="startEdit(item)">{{ $t('admin.common.edit') }}</div>
            <div class="cursor-pointer font-semibold text-[#b42318] no-underline" @click="remove(item)">{{ $t('admin.common.delete') }}</div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="mt-4 flex items-center justify-end gap-2.5">
        <button type="button" class="h-[34px] cursor-pointer rounded-[10px] border border-[#d7dee7] bg-white px-3 text-[13px] font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-45" :disabled="page <= 1" @click="goPage(page - 1)">
          {{ $t('admin.common.prevPage') }}
        </button>
        <span class="text-[13px] text-gray-500">{{ $t('admin.common.pageStatus', { page, totalPages }) }}</span>
        <button type="button" class="admin-pagination-btn" :disabled="page >= totalPages" @click="goPage(page + 1)">
          {{ $t('admin.common.nextPage') }}
        </button>
      </div>
    </div>
    <AdminDialog
      :state="dialog"
      @confirm="close(true)"
      @cancel="close(false)"
    />
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
const { authHeaders } = useAdminAuth()
const { dialog, confirm, alert, close } = useAdminDialog()

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
        headers: authHeaders(),
        query: {
          all: 1,
          page: page.value,
          pageSize: pageSize.value,
          q: search.value || undefined,
          category: filterCategory.value || undefined,
          status: filterStatus.value
        }
      }),
      apiFetch<{ items: CategoryItem[] }>('/api/news-categories?all=1', { headers: authHeaders() })
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
    await alert(t('admin.news.needCategoryFirst'))
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
        headers: authHeaders(),
        body: payload
      })
    } else {
      await apiFetch('/api/news', {
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

async function remove(item: NewsItem) {
  if (!(await confirm(t('admin.news.deleteConfirm', { name: lt(item.title) })))) return
  try {
    await apiFetch(`/api/news/${item.slug}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    await load()
  } catch (err: any) {
    await alert(err?.msg || t('admin.common.deleteFailed'))
  }
}

async function removeSelected() {
  if (!selectedSlugs.value.length || batchDeleting.value) return
  if (!(await confirm(t('admin.common.batchDeleteConfirm', { count: selectedSlugs.value.length })))) return
  batchDeleting.value = true
  try {
    const slugs = [...selectedSlugs.value]
    for (const slug of slugs) {
      await apiFetch(`/api/news/${slug}`, {
        method: 'DELETE',
        headers: authHeaders()
      })
    }
    selectedSlugs.value = []
    await load()
  } catch (err: any) {
    await alert(err?.msg || t('admin.common.deleteFailed'))
    await load()
  } finally {
    batchDeleting.value = false
  }
}


onMounted(load)
</script>
