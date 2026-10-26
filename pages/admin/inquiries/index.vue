<template>
  <div class="flex h-full min-h-0 flex-col">
    <div class="mb-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto]">
      <USelect v-model="status" :items="statusFilters" class="w-full" />
      <USelect v-model="range" :items="rangeFilters" class="w-full" />
      <UButton class="w-full justify-center lg:w-auto" color="neutral" variant="soft" @click="applyFilters">{{ $t('admin.common.search') }}</UButton>
    </div>

    <UCard class="lg:min-h-0 lg:flex-1" :ui="{ body: 'flex flex-col lg:h-full lg:min-h-0' }">
      <div class="overflow-x-auto lg:min-h-0 lg:flex-1">
        <UTable v-model:expanded="expandedRows" :data="items" :columns="columns" :loading="pending"
        :empty="$t('admin.inquiries.empty')" sticky="header" :expanded-options="{ getRowCanExpand: () => true }"
          :ui="{ base: 'w-full min-w-200 table-fixed' }" class="lg:min-h-0 lg:flex-1">
        <template #name-cell="{ row }">
          <div class="font-semibold">
            <span v-if="!row.original.isRead" class="mr-2 inline-block size-2 rounded-full bg-primary"></span>
            {{ row.original.name }}
          </div>
          <div class="text-xs text-gray-500">{{ row.original.company }}</div>
        </template>
        <template #contact-cell="{ row }">
          <div>{{ row.original.email }}</div>
          <div class="text-xs text-gray-500">{{ row.original.phone }}</div>
        </template>
        <template #createdAt-cell="{ row }">{{ formatDateTime(row.original.createdAt) }}</template>
        <template #status-cell="{ row }">
          <UBadge :color="row.original.isRead ? 'neutral' : 'primary'" variant="subtle">
            {{ row.original.isRead ? $t('admin.inquiries.read') : $t('admin.inquiries.unread') }}
          </UBadge>
        </template>
        <template #actions-cell="{ row }">
          <div class="flex justify-end gap-1">
            <UButton color="primary" variant="ghost" size="xs" @click="toggle(row)">
              {{ row.getIsExpanded() ? $t('admin.inquiries.hide') : $t('admin.inquiries.view') }}
            </UButton>
            <UButton color="neutral" variant="ghost" size="xs" @click="setRead(row.original, !row.original.isRead)">
              {{ row.original.isRead ? $t('admin.inquiries.markUnread') : $t('admin.inquiries.markRead') }}
            </UButton>
            <UButton color="error" variant="ghost" size="xs" @click="remove(row.original)">
              {{ $t('admin.common.delete') }}
            </UButton>
          </div>
        </template>
        <template #expanded="{ row }">
          <div class="rounded-lg border border-default bg-muted/30 p-4">
            <div class="grid grid-cols-1 gap-2 text-sm text-gray-700 sm:grid-cols-2">
              <div>
                <span class="font-semibold text-gray-500"> {{ $t('admin.inquiries.country') }}:</span>
                {{ row.original.country }}
              </div>
              <div>
                <span class="font-semibold text-gray-500">{{ $t('admin.inquiries.im') }}:</span>
                {{ row.original.im }}
              </div>
              <div>
                <span class="font-semibold text-gray-500">{{ $t('admin.inquiries.bulk') }}:</span>
                {{ row.original.bulkIntent === 'yes' ? $t('admin.inquiries.bulkYes') : row.original.bulkIntent === 'no'
                  ? $t('admin.inquiries.bulkNo') : '' }}
              </div>
              <div>
                <span class="font-semibold text-gray-500">{{ $t('admin.inquiries.locale') }}:</span>
                {{ row.original.locale }}
              </div>
            </div>
            <div class="mt-3 rounded-md bg-default p-3">
              <div class="mb-1 text-xs font-semibold text-gray-500 uppercase">{{ $t('admin.inquiries.message') }}</div>
              <p class="whitespace-pre-wrap text-sm text-gray-900">
                {{ row.original.message }}</p>
            </div>
          </div>
        </template>
        </UTable>
      </div>

      <div v-if="totalPages > 1" class="mt-4 flex justify-end">
        <UPagination v-model:page="page" :total="total" :items-per-page="pageSize" @update:page="load" />
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'

definePageMeta({ layout: 'admin' })

type InquiryItem = { id: number; name: string; company: string; email: string; phone: string; country: string; im: string; bulkIntent: string; message: string; locale: string; isRead: boolean; createdAt: string }
type StatusFilter = 'all' | 'unread' | 'read'
type RangeFilter = 'all' | 'today' | '7d' | '30d'

const { t } = useI18n()
const items = ref<InquiryItem[]>([])
const pending = ref(true)
const page = ref(1)
const pageSize = 10
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize)))
const expandedRows = ref<Record<string, boolean>>({})
const status = ref<StatusFilter>('all')
const range = ref<RangeFilter>('all')

const columns = computed<TableColumn<InquiryItem>[]>(() => [
  { accessorKey: 'name', header: t('admin.inquiries.name') },
  { id: 'contact', header: t('admin.inquiries.email') },
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

function applyFilters() { page.value = 1; load() }

async function toggle(row: any) {
  const isExpanded = row.getIsExpanded()
  expandedRows.value = isExpanded ? {} : { [row.id]: true }
  if (!isExpanded && !row.original.isRead) await setRead(row.original, true, false)
}

async function load() {
  pending.value = true
  try {
    const data = await apiFetch<{ items: InquiryItem[]; total?: number }>('/api/inquiries', { query: { status: status.value, range: range.value, page: page.value, pageSize } })
    items.value = data.items
    total.value = Number(data.total || data.items.length)
    if (!items.value.length && page.value > 1) { page.value -= 1; await load() }
  } finally { pending.value = false }
}

async function setRead(item: InquiryItem, isRead: boolean, reload = true) {
  try {
    await apiFetch('/api/inquiries/' + item.id, { method: 'PATCH', body: { isRead } })
    item.isRead = isRead
    if (reload && (status.value === 'unread' || status.value === 'read')) await load()
  } catch { }
}

async function remove(item: InquiryItem) {
  if (!window.confirm(t('admin.inquiries.deleteConfirm', { name: item.name }))) return
  try {
    await apiFetch('/api/inquiries/' + item.id, { method: 'DELETE' })
    expandedRows.value = {}
    await load()
  } catch { }
}

onMounted(load)
</script>
