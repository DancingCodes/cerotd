<template>
  <div class="flex h-full min-h-0 flex-col">
  <div class="mb-4 flex justify-end"><UButton @click="startCreate">{{ $t('admin.productCategories.new') }}</UButton></div>

  <UModal v-model:open="formOpen" :title="editingSlug ? $t('admin.productCategories.editTitle') : $t('admin.productCategories.createTitle')">
    <template #body>
      <UForm :state="form" class="grid grid-cols-1 gap-4 md:grid-cols-3" @submit="save">
        <UFormField :label="$t('admin.common.nameEn')" name="nameEn" required><UInput v-model="form.nameEn" /></UFormField>
        <UFormField :label="$t('admin.common.nameZh')" name="nameZh" required><UInput v-model="form.nameZh" /></UFormField>
        <UFormField :label="$t('admin.common.sort')" name="sortOrder"><UInput v-model.number="form.sortOrder" type="number" /></UFormField>
        <p v-if="formError" class="col-span-full text-sm text-error">{{ formError }}</p>
        <div class="col-span-full flex justify-end gap-2"><UButton color="neutral" variant="ghost" @click="closeForm">{{ $t('admin.common.cancel') }}</UButton><UButton type="submit">{{ $t('admin.common.save') }}</UButton></div>
      </UForm>
    </template>
  </UModal>

  <UCard class="min-h-0 flex-1" :ui="{ body: 'flex h-full min-h-0 flex-col' }">
    <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
    <div v-else-if="!items.length" class="text-sm text-gray-500">{{ $t('admin.productCategories.empty') }}</div>
    <div v-else class="min-h-0 flex-1 overflow-auto"><UTable :data="items" :columns="columns">
      <template #name-cell="{ row }"><div class="font-semibold">{{ lt(row.original.name) }}</div><div class="text-xs text-gray-500">{{ secondaryName(row.original.name) }}</div></template>
      <template #actions-cell="{ row }"><div class="flex justify-end gap-1"><UButton color="neutral" variant="ghost" size="xs" @click="startEdit(row.original)">{{ $t('admin.common.edit') }}</UButton><UButton color="error" variant="ghost" size="xs" @click="remove(row.original)">{{ $t('admin.common.delete') }}</UButton></div></template>
    </UTable></div>
  </UCard>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
definePageMeta({ layout: 'admin' })

type Localized = { en: string; zh: string }
type CategoryItem = { id: number; slug: string; name: Localized; sortOrder: number }

const { t, locale } = useI18n()
const lt = useLocalized()
const items = ref<CategoryItem[]>([])
const pending = ref(true)
const formOpen = ref(false)
const editingSlug = ref('')
const formError = ref('')
const form = reactive({ nameEn: '', nameZh: '', sortOrder: 0 })
const columns = computed<TableColumn<CategoryItem>[]>(() => [
  { accessorKey: 'name', header: t('admin.common.name') },
  { accessorKey: 'slug', header: t('admin.common.slug') },
  { accessorKey: 'sortOrder', header: t('admin.common.sort') },
  { id: 'actions', header: '' }
])

function secondaryName(name: Localized) { return locale.value === 'zh' ? name.en : name.zh }
function resetForm() { Object.assign(form, { nameEn: '', nameZh: '', sortOrder: 0 }) }
async function load() { pending.value = true; try { items.value = (await apiFetch<{ items: CategoryItem[] }>('/api/product-categories')).items } finally { pending.value = false } }
function startCreate() { editingSlug.value = ''; resetForm(); formError.value = ''; formOpen.value = true }
function startEdit(item: CategoryItem) { editingSlug.value = item.slug; Object.assign(form, { nameEn: item.name.en, nameZh: item.name.zh, sortOrder: item.sortOrder }); formError.value = ''; formOpen.value = true }
function closeForm() { formOpen.value = false; formError.value = '' }

async function save() {
  formError.value = ''
  if (!form.nameEn.trim()) { formError.value = t('admin.common.requiredNameEn'); return }
  if (!form.nameZh.trim()) { formError.value = t('admin.common.requiredNameZh'); return }
  const body = { nameEn: form.nameEn, nameZh: form.nameZh, sortOrder: Number(form.sortOrder) || 0 }
  try {
    if (editingSlug.value) await apiFetch(`/api/product-categories/${editingSlug.value}`, { method: 'PUT', body })
    else await apiFetch('/api/product-categories', { method: 'POST', body })
    closeForm(); await load()
  } catch {}
}

async function remove(item: CategoryItem) {
  if (!window.confirm(t('admin.productCategories.deleteConfirm', { name: lt(item.name) }))) return
  try { await apiFetch(`/api/product-categories/${item.slug}`, { method: 'DELETE' }); await load() } catch {}
}

onMounted(load)
</script>
