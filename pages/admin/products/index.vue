<template>
  <div>
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <div class="mb-1.5 text-[28px] font-bold">{{ $t('admin.products.title') }}</div>
        <div class="text-sm text-gray-500">
          {{ $t('admin.products.subtitle') }}
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
        >{{ $t('admin.products.new') }}</div>
      </div>
    </div>

    <div class="mb-4 grid gap-2.5">
      <div class="grid grid-cols-1 gap-2.5 md:grid-cols-[1.4fr_1fr_1fr_auto] md:items-center">
        <input
          v-model="searchInput"
          class="h-10 w-full rounded-xl border border-[#d7dee7] bg-white px-3 outline-none"
          type="search"
          :placeholder="$t('admin.common.searchPlaceholder')"
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
        {{ editingSlug ? $t('admin.products.editTitle') : $t('admin.products.createTitle') }}
      </div>
      <div class="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <label class="block">
          <div class="mb-1.5 text-[13px] font-semibold text-gray-600 after:text-[#b42318] after:content-["_*"]">{{ $t('admin.common.nameEn') }}</div>
          <input v-model="form.nameEn" class="h-[42px] w-full rounded-xl border border-[#d7dee7] bg-white px-3 outline-none" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label is-required">{{ $t('admin.common.nameZh') }}</div>
          <input v-model="form.nameZh" class="admin-field-input" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label is-required">{{ $t('admin.products.category') }}</div>
          <select v-model="form.categorySlug" class="admin-field-input">
            <option value="">{{ $t('admin.products.selectCategory') }}</option>
            <option v-for="category in categories" :key="category.slug" :value="category.slug">
              {{ lt(category.name) }}
            </option>
          </select>
        </label>
        <label class="admin-field">
          <div class="mb-1.5 text-[13px] font-semibold text-gray-600">{{ $t('admin.common.sort') }}</div>
          <input v-model.number="form.sortOrder" class="admin-field-input" type="number" />
        </label>
        <label class="admin-field">
          <div class="admin-field-label">{{ $t('admin.common.published') }}</div>
          <select v-model="form.isPublished" class="admin-field-input">
            <option :value="true">{{ $t('admin.common.yes') }}</option>
            <option :value="false">{{ $t('admin.common.no') }}</option>
          </select>
        </label>
        <label class="col-span-full block">
          <div class="admin-field-label">{{ $t('admin.products.summaryEn') }}</div>
          <textarea v-model="form.summaryEn" class="w-full resize-y rounded-xl border border-[#d7dee7] bg-white px-3 py-2.5 outline-none" rows="2" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.summaryZh') }}</div>
          <textarea v-model="form.summaryZh" class="admin-field-textarea" rows="2" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.descriptionEn') }}</div>
          <textarea v-model="form.descriptionEn" class="admin-field-textarea" rows="4" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.descriptionZh') }}</div>
          <textarea v-model="form.descriptionZh" class="admin-field-textarea" rows="4" />
        </label>
        <div class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.common.coverUrl') }}</div>
          <AdminImageUpload v-model="form.coverUrl" folder="products" />
        </div>
        <div class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.images') }}</div>
          <AdminImageListUpload v-model="form.images" folder="products" />
        </div>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.specsEn') }}</div>
          <textarea v-model="form.specsEnText" class="admin-field-textarea" rows="3" />
        </label>
        <label class="admin-field admin-field-full">
          <div class="admin-field-label">{{ $t('admin.products.specsZh') }}</div>
          <textarea v-model="form.specsZhText" class="admin-field-textarea" rows="3" />
        </label>
      </div>
      <div v-if="formError" class="mt-3 text-[13px] text-[#b42318]">{{ formError }}</div>
      <div class="mt-4 flex gap-2.5">
        <div class="admin-page-btn" @click="save">{{ $t('admin.common.save') }}</div>
        <div class="admin-page-btn admin-page-btn-muted" @click="closeForm">{{ $t('admin.common.cancel') }}</div>
      </div>
    </div>

    <div class="mb-[18px] rounded-xl border border-[#e5eaf0] bg-white p-5">
      <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="admin-empty">{{ $t('admin.products.empty') }}</div>
      <div v-else class="overflow-x-auto">
        <div class="grid min-w-[780px] grid-cols-[36px_1.5fr_1fr_.5fr_.7fr_1.1fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-xs font-bold tracking-[.04em] text-gray-500 uppercase">
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
        <div v-for="item in items" :key="item.id" class="grid min-w-[780px] grid-cols-[36px_1.5fr_1fr_.5fr_.7fr_1.1fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-sm">
          <div class="admin-table-check">
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
const { dialog, confirm, alert, close } = useAdminDialog()
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

const emptyForm = () => ({
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
  if (!(await confirm(t('admin.products.deleteConfirm', { name: lt(item.name) })))) return
  try {
    await apiFetch(`/api/products/${item.slug}`, {
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
      await apiFetch(`/api/products/${slug}`, {
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
