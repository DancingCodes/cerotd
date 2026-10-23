<template>
  <div class="flex h-full min-h-0 flex-col">
  <div class="mb-4 grid grid-cols-1 gap-2.5 md:grid-cols-[1fr_1fr_auto]">
    <USelect v-model="status" :items="statusFilters" @update:model-value="applyFilters" />
    <USelect v-model="range" :items="rangeFilters" @update:model-value="applyFilters" />
    <UButton color="neutral" variant="soft" @click="load">{{ $t('admin.inquiries.refresh') }}</UButton>
  </div>

  <UCard class="min-h-0 flex-1" :ui="{ body: 'flex h-full min-h-0 flex-col' }">
    <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
    <div v-else-if="!items.length" class="text-sm text-gray-500">{{ $t('admin.inquiries.empty') }}</div>
    <template v-else>
      <div class="min-h-0 flex-1 overflow-auto [&_thead]:sticky [&_thead]:top-0 [&_thead]:z-10 [&_thead]:bg-white"><UTable :data="items" :columns="columns">
        <template #name-cell="{ row }">
          <div class="font-semibold"><span v-if="!row.original.isRead" class="mr-2 inline-block size-2 rounded-full bg-primary"></span>{{ row.original.name }}</div>
          <div class="text-xs text-gray-500">{{ row.original.company || $t('admin.inquiries.noCompany') }}</div>
        </template>
        <template #contact-cell="{ row }"><div>{{ row.original.email || '-' }}</div><div class="text-xs text-gray-500">{{ row.original.phone || '-' }}</div></template>
        <template #product-cell="{ row }">{{ row.original.productSlug || '-' }}</template>
        <template #createdAt-cell="{ row }">{{ formatDate(row.original.createdAt) }}</template>
        <template #status-cell="{ row }"><UBadge :color="row.original.isRead ? 'neutral' : 'primary'" variant="subtle">{{ row.original.isRead ? $t('admin.inquiries.read') : $t('admin.inquiries.unread') }}</UBadge></template>
        <template #actions-cell="{ row }">
          <div class="flex justify-end gap-1">
            <UButton color="primary" variant="ghost" size="xs" @click="toggle(row.original)">{{ openId === row.original.id ? $t('admin.inquiries.hide') : $t('admin.inquiries.view') }}</UButton>
            <UButton color="neutral" variant="ghost" size="xs" @click="setRead(row.original, !row.original.isRead)">{{ row.original.isRead ? $t('admin.inquiries.markUnread') : $t('admin.inquiries.markRead') }}</UButton>
            <UButton color="error" variant="ghost" size="xs" @click="remove(row.original)">{{ $t('admin.common.delete') }}</UButton>
          </div>
        </template>
      </UTable></div>

      <div v-if="selectedItem" class="mt-4 rounded-lg border border-default p-4">
        <div class="mb-3 flex items-center justify-between"><div class="font-semibold">{{ selectedItem.name }}</div><UButton color="neutral" variant="ghost" size="xs" @click="openId = null">{{ $t('admin.inquiries.hide') }}</UButton></div>
        <div class="grid gap-2 text-sm text-gray-700 md:grid-cols-2">
          <div><span class="font-semibold text-gray-500">{{ $t('admin.inquiries.country') }}:</span> {{ selectedItem.country || '-' }}</div>
          <div><span class="font-semibold text-gray-500">{{ $t('admin.inquiries.im') }}:</span> {{ selectedItem.im || '-' }}</div>
          <div><span class="font-semibold text-gray-500">{{ $t('admin.inquiries.bulk') }}:</span> {{ formatBulk(selectedItem.bulkIntent) }}</div>
          <div><span class="font-semibold text-gray-500">{{ $t('admin.inquiries.locale') }}:</span> {{ selectedItem.locale }}</div>
        </div>
        <div class="mt-3 rounded-md bg-muted p-3"><div class="mb-1 text-xs font-semibold text-gray-500 uppercase">{{ $t('admin.inquiries.message') }}</div><p class="whitespace-pre-wrap text-sm text-gray-900">{{ selectedItem.message || $t('admin.inquiries.noMessage') }}</p></div>
      </div>

      <div v-if="totalPages > 1" class="mt-4 flex justify-end"><UPagination v-model:page="page" :total="total" :items-per-page="pageSize" @update:page="load" /></div>
    </template>
  </UCard>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({ layout: 'admin' })

type InquiryItem = { id: number; name: string; company: string; email: string; phone: string; country: string; im: string; bulkIntent: string; productSlug: string; message: string; locale: string; isRead: boolean; createdAt: string }
type StatusFilter = 'all' | 'unread' | 'read'
type RangeFilter = 'all' | 'today' | '7d' | '30d'

const { t } = useI18n()
const items = ref<InquiryItem[]>([])
const unreadCount = ref(0)
const pending = ref(true)
const page = ref(1)
const pageSize = 10
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
const openId = ref<number | null>(null)
const selectedItem = computed(() => items.value.find(item => item.id === openId.value))
const status = ref<StatusFilter>('all')
const range = ref<RangeFilter>('all')

const columns = computed<TableColumn<InquiryItem>[]>(() => [
  { accessorKey: 'name', header: t('admin.inquiries.name') },
  { id: 'contact', header: t('admin.inquiries.email') },
  { accessorKey: 'productSlug', id: 'product', header: t('admin.inquiries.product') },
  { accessorKey: 'createdAt', header: t('admin.inquiries.createdAt') },
  { id: 'status', header: t('admin.inquiries.status') },
  { id: 'actions', header: '' }
])
const statusFilters = computed(() => [
  { value: 'all' as const, label: t('admin.inquiries.filterAll') },
  { value: 'unread' as const, label: t('admin.inquiries.filterUnread') },
  { value: 'read' as const, label: t('admin.inquiries.filterRead') }
])
const rangeFilters = computed(() => [
  { value: 'all' as const, label: t('admin.inquiries.rangeAll') },
  { value: 'today' as const, label: t('admin.inquiries.rangeToday') },
  { value: '7d' as const, label: t('admin.inquiries.range7d') },
  { value: '30d' as const, label: t('admin.inquiries.range30d') }
])

function formatDate(value: string) { return value ? value.slice(0, 16).replace('T', ' ') : '' }
function formatBulk(value: string) { return value === 'yes' ? t('admin.inquiries.bulkYes') : value === 'no' ? t('admin.inquiries.bulkNo') : '-' }
function applyFilters() { page.value = 1; load() }

async function toggle(item: InquiryItem) {
  openId.value = openId.value === item.id ? null : item.id
  if (openId.value === item.id && !item.isRead) await setRead(item, true, false)
}

async function load() {
  pending.value = true
  try {
    const data = await apiFetch<{ items: InquiryItem[]; unreadCount: number; total?: number }>('/api/inquiries', { query: { status: status.value, range: range.value, page: page.value, pageSize } })
    items.value = data.items
    total.value = Number(data.total || data.items.length)
    unreadCount.value = data.unreadCount || 0
    if (!items.value.length && page.value > 1) { page.value -= 1; await load() }
  } finally { pending.value = false }
}

async function setRead(item: InquiryItem, isRead: boolean, reload = true) {
  try {
    await apiFetch('/api/inquiries/' + item.id, { method: 'PATCH', body: { isRead } })
    item.isRead = isRead
    unreadCount.value = Math.max(0, unreadCount.value + (isRead ? -1 : 1))
    if (reload && (status.value === 'unread' || status.value === 'read')) await load()
  } catch {}
}

async function remove(item: InquiryItem) {
  if (!window.confirm(t('admin.inquiries.deleteConfirm', { name: item.name }))) return
  try {
    await apiFetch('/api/inquiries/' + item.id, { method: 'DELETE' })
    if (openId.value === item.id) openId.value = null
    await load()
  } catch {}
}

onMounted(load)
</script>
