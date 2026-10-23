<template>
    <div class="mb-5 flex items-start justify-between gap-4">
      <div>
        <div class="mb-1.5 text-7 font-bold">{{ $t('admin.newsCategories.title') }}</div>
        <div class="text-sm text-gray-500">
          {{ $t('admin.newsCategories.subtitle') }}
          <span v-if="!pending"> · {{ $t('admin.common.totalCount', { count: total }) }}</span>
        </div>
      </div>
      <div class="flex flex-wrap items-center gap-3">
        <UButton v-if="selectedSlugs.length" color="error" :loading="batchDeleting" @click="removeSelected">{{ $t('admin.common.batchDelete') }} · {{ selectedSlugs.length }}</UButton>
        <UButton @click="startCreate">{{ $t('admin.newsCategories.new') }}</UButton>
      </div>
    </div>

    <UModal v-model:open="formOpen" :title="editingSlug ? $t('admin.newsCategories.editTitle') : $t('admin.newsCategories.createTitle')">
      <template #body>
        <UForm :state="form" class="grid grid-cols-1 gap-4 md:grid-cols-2" @submit="save">
          <UFormField :label="$t('admin.common.nameEn')" name="nameEn" required><UInput v-model="form.nameEn" /></UFormField>
          <UFormField :label="$t('admin.common.nameZh')" name="nameZh" required><UInput v-model="form.nameZh" /></UFormField>
          <UFormField :label="$t('admin.common.sort')" name="sortOrder"><UInput v-model.number="form.sortOrder" type="number" /></UFormField>
          <UFormField :label="$t('admin.common.published')" name="isPublished"><USelect v-model="form.isPublished" :items="publishOptions" /></UFormField>
          <p v-if="formError" class="col-span-full text-sm text-error">{{ formError }}</p>
          <div class="col-span-full flex justify-end gap-2"><UButton color="neutral" variant="ghost" @click="closeForm">{{ $t('admin.common.cancel') }}</UButton><UButton type="submit">{{ $t('admin.common.save') }}</UButton></div>
        </UForm>
      </template>
    </UModal>

    <UCard class="mb-4.5">
      <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="text-sm text-gray-500">{{ $t('admin.newsCategories.empty') }}</div>
      <UTable v-else :data="items" :columns="columns">
        <template #select-header><UCheckbox :model-value="allSelected" @update:model-value="toggleSelectAll(Boolean($event))" /></template>
        <template #select-cell="{ row }"><UCheckbox :model-value="selectedSlugs.includes(row.original.slug)" @update:model-value="toggleSelect(row.original.slug, Boolean($event))" /></template>
        <template #name-cell="{ row }"><div class="font-semibold">{{ lt(row.original.name) }}</div><div class="text-xs text-gray-500">{{ secondaryName(row.original.name) }}</div></template>
        <template #status-cell="{ row }"><UBadge :color="row.original.isPublished ? 'success' : 'neutral'" variant="subtle">{{ row.original.isPublished ? $t('admin.common.published') : $t('admin.common.draft') }}</UBadge></template>
        <template #actions-cell="{ row }"><div class="flex justify-end gap-1"><UButton color="neutral" variant="ghost" size="xs" @click="startEdit(row.original)">{{ $t('admin.common.edit') }}</UButton><UButton color="error" variant="ghost" size="xs" @click="remove(row.original)">{{ $t('admin.common.delete') }}</UButton></div></template>
      </UTable>

      <div v-if="totalPages > 1" class="mt-4 flex justify-end"><UPagination v-model:page="page" :total="total" :items-per-page="pageSize" @update:page="load" /></div>
    </UCard>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
definePageMeta({
  layout: 'admin'
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
const publishOptions = computed(() => [
  { label: t('admin.common.yes'), value: true },
  { label: t('admin.common.no'), value: false }
])
const columns = computed<TableColumn<CategoryItem>[]>(() => [
  { id: 'select', header: '' },
  { accessorKey: 'name', header: t('admin.common.name') },
  { accessorKey: 'slug', header: t('admin.common.slug') },
  { accessorKey: 'sortOrder', header: t('admin.common.sort') },
  { id: 'status', header: t('admin.common.status') },
  { id: 'actions', header: '' }
])

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

async function load() {
  pending.value = true
  try {
    const data = await apiFetch<{ items: CategoryItem[]; total?: number }>('/api/news-categories', {
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
        body: payload
      })
    } else {
      await apiFetch('/api/news-categories', {
        method: 'POST',
        body: payload
      })
    }
    closeForm()
    await load()
  } catch {}
}

async function remove(item: CategoryItem) {
  if (!window.confirm(t('admin.newsCategories.deleteConfirm', { name: lt(item.name) }))) return
  try {
    await apiFetch(`/api/news-categories/${item.slug}`, {
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
      await apiFetch(`/api/news-categories/${slug}`, {
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
