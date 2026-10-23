<template>
  <div class="mb-5 flex items-start justify-between gap-4">
    <div>
      <div class="mb-1.5 text-7 font-bold">{{ $t('admin.productCategories.title') }}</div>
      <div class="text-sm text-gray-500">{{ $t('admin.productCategories.subtitle') }}</div>
    </div>
    <button type="button" class="h-10 cursor-pointer rounded-[12px] bg-[#0e7f8f] px-4 text-sm font-semibold text-white" @click="startCreate">{{ $t('admin.productCategories.new') }}</button>
  </div>

  <div v-if="formOpen" class="mb-4.5 rounded-[12px] border border-[#e5eaf0] bg-white p-5">
    <div class="mb-4 text-lg font-bold">{{ editingSlug ? $t('admin.productCategories.editTitle') : $t('admin.productCategories.createTitle') }}</div>
    <div class="grid grid-cols-1 gap-3.5 md:grid-cols-3">
      <label class="block"><div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.common.nameEn') }}</div><input v-model="form.nameEn" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" /></label>
      <label class="block"><div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.common.nameZh') }}</div><input v-model="form.nameZh" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" /></label>
      <label class="block"><div class="mb-1.5 text-3.25 font-semibold text-gray-600">{{ $t('admin.common.sort') }}</div><input v-model.number="form.sortOrder" class="h-10.5 w-full rounded-[12px] border border-[#d7dee7] bg-white px-3 outline-none" type="number" /></label>
    </div>
    <div v-if="formError" class="mt-3 text-3.25 text-[#b42318]">{{ formError }}</div>
    <div class="mt-4 flex gap-2.5"><button type="button" class="h-10 cursor-pointer rounded-[12px] bg-[#0e7f8f] px-4 text-sm font-semibold text-white" @click="save">{{ $t('admin.common.save') }}</button><button type="button" class="h-10 cursor-pointer rounded-[12px] bg-[#eef1f4] px-4 text-sm font-semibold text-gray-700" @click="closeForm">{{ $t('admin.common.cancel') }}</button></div>
  </div>

  <div class="rounded-[12px] border border-[#e5eaf0] bg-white p-5">
    <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
    <div v-else-if="!items.length" class="text-sm text-gray-500">{{ $t('admin.productCategories.empty') }}</div>
    <div v-else class="overflow-x-auto">
      <div class="grid min-w-150 grid-cols-[1.4fr_1fr_.6fr_.8fr] gap-3 border-b border-[#eef1f4] py-3.5 text-xs font-bold tracking-[.04em] text-gray-500 uppercase"><div>{{ $t('admin.common.name') }}</div><div>{{ $t('admin.common.slug') }}</div><div>{{ $t('admin.common.sort') }}</div><div>{{ $t('admin.common.actions') }}</div></div>
      <div v-for="item in items" :key="item.id" class="grid min-w-150 grid-cols-[1.4fr_1fr_.6fr_.8fr] items-center gap-3 border-b border-[#eef1f4] py-3.5 text-sm">
        <div><div class="font-semibold">{{ lt(item.name) }}</div><div class="mt-0.5 text-xs text-gray-500">{{ secondaryName(item.name) }}</div></div><div>{{ item.slug }}</div><div>{{ item.sortOrder }}</div><div class="flex gap-3"><button type="button" class="cursor-pointer font-semibold text-[#0e7f8f]" @click="startEdit(item)">{{ $t('admin.common.edit') }}</button><button type="button" class="cursor-pointer font-semibold text-[#b42318]" @click="remove(item)">{{ $t('admin.common.delete') }}</button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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
