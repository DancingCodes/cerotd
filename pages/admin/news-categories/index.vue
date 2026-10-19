<template>
  <div>
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <div class="mb-1.5 text-7 font-bold">{{ $t('admin.newsCategories.title') }}</div>
        <div class="text-sm text-gray-500">
          {{ $t('admin.newsCategories.subtitle') }}
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
        <div class="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-[#0e7f8f] px-4 text-sm font-semibold whitespace-nowrap text-white" @click="startCreate">{{ $t('admin.newsCategories.new') }}</div>
      </div>
    </div>

    <div v-if="formOpen" class="mb-4.5 rounded-xl border border-[#e5eaf0] bg-white p-5">
      <div class="mb-4 text-lg font-bold">
        {{ editingSlug ? $t('admin.newsCategories.editTitle') : $t('admin.newsCategories.createTitle') }}
      </div>
      <div class="grid grid-cols-1 gap-3.5 md:grid-cols-2">
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600 after:text-[#b42318] after:content-["_*"]">{{ $t('admin.common.nameEn') }}</div>
          <input v-model="form.nameEn" class="h-10.5 w-full rounded-xl border border-[#d7dee7] bg-white px-3 outline-none" />
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600 after:text-[#b42318] after:content-['_*']">{{ $t('admin.common.nameZh') }}</div>
          <input v-model="form.nameZh" class="h-10.5 w-full rounded-xl border border-[#d7dee7] bg-white px-3 outline-none" />
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.common.sort') }}</div>
          <input v-model.number="form.sortOrder" class="h-10.5 w-full rounded-xl border border-[#d7dee7] bg-white px-3 outline-none" type="number" />
        </label>
        <label class="block">
          <div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.common.published') }}</div>
          <select v-model="form.isPublished" class="h-10.5 w-full rounded-xl border border-[#d7dee7] bg-white px-3 outline-none">
            <option :value="true">{{ $t('admin.common.yes') }}</option>
            <option :value="false">{{ $t('admin.common.no') }}</option>
          </select>
        </label>
      </div>
      <div v-if="formError" class="mt-3 text-3.25 text-[#b42318]">{{ formError }}</div>
      <div class="mt-4 flex gap-2.5">
        <div class="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-[#0e7f8f] px-4 text-sm font-semibold whitespace-nowrap text-white" @click="save">{{ $t('admin.common.save') }}</div>
        <div class="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-[#eef1f4] px-4 text-sm font-semibold whitespace-nowrap text-gray-700" @click="closeForm">{{ $t('admin.common.cancel') }}</div>
      </div>
    </div>

    <div class="mb-4.5 rounded-xl border border-[#e5eaf0] bg-white p-5">
      <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="text-sm text-gray-500">{{ $t('admin.newsCategories.empty') }}</div>
      <div v-else class="overflow-x-auto">
        <div class="grid min-w-175 grid-cols-[36px_1.4fr_1fr_.5fr_.7fr_.9fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-xs font-bold tracking-[.04em] text-gray-500 uppercase">
          <div class="flex items-center justify-center [&_input]:size-4 [&_input]:cursor-pointer">
            <input
              type="checkbox"
              :checked="allSelected"
              :aria-label="$t('admin.common.batchDelete')"
              @change="onSelectAllChange($event)"
            />
          </div>
          <div>{{ $t('admin.common.name') }}</div>
          <div>{{ $t('admin.common.slug') }}</div>
          <div>{{ $t('admin.common.sort') }}</div>
          <div>{{ $t('admin.common.status') }}</div>
          <div>{{ $t('admin.common.actions') }}</div>
        </div>
        <div v-for="item in items" :key="item.id" class="grid min-w-175 grid-cols-[36px_1.4fr_1fr_.5fr_.7fr_.9fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-sm">
          <div class="flex items-center justify-center [&_input]:size-4 [&_input]:cursor-pointer">
            <input
              type="checkbox"
              :checked="selectedSlugs.includes(item.slug)"
              @change="onSelectChange(item.slug, $event)"
            />
          </div>
          <div>
            <div class="font-semibold">{{ lt(item.name) }}</div>
            <div class="mt-0.5 text-xs text-gray-500">{{ secondaryName(item.name) }}</div>
          </div>
          <div>{{ item.slug }}</div>
          <div>{{ item.sortOrder }}</div>
          <div>{{ item.isPublished ? $t('admin.common.published') : $t('admin.common.draft') }}</div>
          <div class="flex gap-3">
            <div class="cursor-pointer font-semibold text-[#0e7f8f]" @click="startEdit(item)">{{ $t('admin.common.edit') }}</div>
            <div class="cursor-pointer font-semibold text-[#b42318]" @click="remove(item)">{{ $t('admin.common.delete') }}</div>
          </div>
        </div>
      </div>

      <div v-if="totalPages > 1" class="mt-4 flex items-center justify-end gap-2.5">
        <button type="button" class="h-8.5 cursor-pointer rounded-2.5 border border-[#d7dee7] bg-white px-3 text-3.25 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-45" :disabled="page <= 1" @click="goPage(page - 1)">
          {{ $t('admin.common.prevPage') }}
        </button>
        <span class="text-3.25 text-gray-500">{{ $t('admin.common.pageStatus', { page, totalPages }) }}</span>
        <button type="button" class="h-8.5 cursor-pointer rounded-2.5 border border-[#d7dee7] bg-white px-3 text-3.25 font-semibold text-gray-700 disabled:cursor-not-allowed disabled:opacity-45" :disabled="page >= totalPages" @click="goPage(page + 1)">
          {{ $t('admin.common.nextPage') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['admin']
})

type Localized = { en: string; zh: string }

type CategoryItem = {
  id: number
  slug: string
  name: Localized
  sortOrder: number
  isPublished: boolean
}

const { t, locale } = useI18n()
const lt = useLocalized()
const { authHeaders } = useAdminAuth()
const toast = useToast()
const pending = ref(true)
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const selectedSlugs = ref<string[]>([])
const batchDeleting = ref(false)
const allSelected = computed(() => items.value.length > 0 && items.value.every((item) => selectedSlugs.value.includes(item.slug)))
const items = ref<CategoryItem[]>([])
const formOpen = ref(false)
const editingSlug = ref('')
const formError = ref('')

const emptyForm = () => ({
  slug: '',
  nameEn: '',
  nameZh: '',
  sortOrder: 0,
  isPublished: true
})

const form = reactive(emptyForm())

function secondaryName(name: Localized) {
  return locale.value === 'zh' ? name.en : name.zh
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
    const data = await apiFetch<{ items: CategoryItem[]; total?: number }>('/api/news-categories', {
      headers: authHeaders(),
      query: { all: 1, page: page.value, pageSize: pageSize.value }
    })
    items.value = data.items
    total.value = Number(data.total || data.items.length)
    if (items.value.length === 0 && page.value > 1) {
      page.value -= 1
      await load()
      return
    }
  } finally {
    pending.value = false
  }
}

function goPage(next: number) {
  page.value = Math.max(1, next)
  load()
}

function startCreate() {
  editingSlug.value = ''
  Object.assign(form, emptyForm())
  formError.value = ''
  formOpen.value = true
}

function startEdit(item: CategoryItem) {
  editingSlug.value = item.slug
  Object.assign(form, {
    slug: item.slug,
    nameEn: item.name.en,
    nameZh: item.name.zh,
    sortOrder: item.sortOrder,
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
  if (!form.nameEn.trim()) {
    formError.value = t('admin.common.requiredNameEn')
    return
  }
  if (!form.nameZh.trim()) {
    formError.value = t('admin.common.requiredNameZh')
    return
  }

  const payload = {
    nameEn: form.nameEn,
    nameZh: form.nameZh,
    sortOrder: Number(form.sortOrder) || 0,
    isPublished: form.isPublished
  }

  try {
    if (editingSlug.value) {
      await apiFetch(`/api/news-categories/${editingSlug.value}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: payload
      })
    } else {
      await apiFetch('/api/news-categories', {
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

async function remove(item: CategoryItem) {
  if (!window.confirm(t('admin.newsCategories.deleteConfirm', { name: lt(item.name) }))) return
  try {
    await apiFetch(`/api/news-categories/${item.slug}`, {
      method: 'DELETE',
      headers: authHeaders()
    })
    await load()
  } catch (err: any) {
    toast.add({
      title: isCategoryHasArticlesError(err) ? t('admin.newsCategories.deleteBlockedHasNews') : t('admin.common.deleteFailed'),
      description: err?.msg,
      color: 'error'
    })
  }
}

async function removeSelected() {
  if (!selectedSlugs.value.length || batchDeleting.value) return
  if (!window.confirm(t('admin.common.batchDeleteConfirm', { count: selectedSlugs.value.length }))) return
  batchDeleting.value = true
  try {
    const slugs = [...selectedSlugs.value]
    for (const slug of slugs) {
      await apiFetch(`/api/news-categories/${slug}`, {
        method: 'DELETE',
        headers: authHeaders()
      })
    }
    selectedSlugs.value = []
    await load()
  } catch (err: any) {
    toast.add({
      title: isCategoryHasArticlesError(err) ? t('admin.newsCategories.deleteBlockedHasNews') : t('admin.common.deleteFailed'),
      description: err?.msg,
      color: 'error'
    })
    await load()
  } finally {
    batchDeleting.value = false
  }
}

function isCategoryHasArticlesError(err: any) {
  return err?.code === 'NEWS_CATEGORY_HAS_ARTICLES'
}


onMounted(load)
</script>
