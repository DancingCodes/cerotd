<template>
  <div>
    <div class="mb-4.5 flex items-start justify-between gap-4">
      <div>
        <div class="text-7 font-semibold">{{ $t('admin.inquiries.title') }}</div>
        <div class="mt-1.5 text-sm text-gray-500">
          {{ $t('admin.inquiries.subtitle') }}
          <span v-if="!pending"> · {{ $t('admin.common.totalCount', { count: total }) }}</span>
          <span v-if="unreadCount"> · {{ $t('admin.inquiries.unreadCount', { count: unreadCount }) }}</span>
        </div>
      </div>
      <div class="inline-flex h-10 cursor-pointer items-center justify-center rounded-xl bg-[#eef1f4] px-4 text-sm font-semibold whitespace-nowrap text-gray-700" @click="load">{{ $t('admin.inquiries.refresh') }}</div>
    </div>

    <div class="mb-4 grid gap-2.5">
      <div class="flex flex-wrap gap-2" role="tablist" :aria-label="$t('admin.inquiries.filterStatus')">
        <button
          v-for="item in statusFilters"
          :key="item.value"
          type="button"
          class="h-8.5 cursor-pointer rounded-full border border-[#e5eaf0] bg-white px-3 text-3.25 font-semibold text-gray-600"
          :class="{ 'border-[#0e7f8f] bg-[#e8f7f9] text-[#0e7f8f]': status === item.value }"
          @click="setStatus(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
      <div class="flex flex-wrap gap-2" role="tablist" :aria-label="$t('admin.inquiries.filterRange')">
        <button
          v-for="item in rangeFilters"
          :key="item.value"
          type="button"
          class="h-8.5 cursor-pointer rounded-full border border-[#e5eaf0] bg-white px-3 text-3.25 font-semibold text-gray-600"
          :class="{ 'border-[#0e7f8f] bg-[#e8f7f9] text-[#0e7f8f]': range === item.value }"
          @click="setRange(item.value)"
        >
          {{ item.label }}
        </button>
      </div>
    </div>

    <div class="mb-4.5 rounded-xl border border-[#e5eaf0] bg-white p-5">
      <div v-if="pending" class="text-sm text-gray-500">{{ $t('admin.common.loading') }}</div>
      <div v-else-if="!items.length" class="text-sm text-gray-500">{{ $t('admin.inquiries.empty') }}</div>
      <div v-else class="grid gap-3.5">
        <article
          v-for="item in items"
          :key="item.id"
          class="rounded-3.5 border border-[#eef1f4] bg-[#fbfcfd] p-4"
          :class="{ 'border-[#cfeef2] bg-[#f3fbfd]': !item.isRead }"
        >
          <div class="mb-3 flex items-start justify-between gap-3">
            <div>
              <div class="font-semibold">
                <span v-if="!item.isRead" class="mr-2 inline-block size-2 rounded-full bg-[#0e7f8f] align-middle" aria-hidden="true"></span>
                {{ item.name }}
                <span class="ml-2 rounded-full bg-[#eef1f4] px-2 py-0.5 text-2.75 font-bold text-gray-500 align-middle">{{ item.isRead ? $t('admin.inquiries.read') : $t('admin.inquiries.unread') }}</span>
              </div>
              <div class="mt-0.5 text-xs text-gray-500">{{ item.company || $t('admin.inquiries.noCompany') }} · {{ formatDate(item.createdAt) }}</div>
            </div>
            <div class="flex flex-wrap gap-3">
              <div class="cursor-pointer font-semibold text-[#0e7f8f]" @click="toggle(item)">
                {{ openId === item.id ? $t('admin.inquiries.hide') : $t('admin.inquiries.view') }}
              </div>
              <div class="cursor-pointer font-semibold text-[#0e7f8f]" @click="setRead(item, !item.isRead)">
                {{ item.isRead ? $t('admin.inquiries.markUnread') : $t('admin.inquiries.markRead') }}
              </div>
              <div class="cursor-pointer font-semibold text-[#b42318]" @click="remove(item)">{{ $t('admin.common.delete') }}</div>
            </div>
          </div>

          <div class="grid grid-cols-1 gap-2 text-3.25 text-gray-700 md:grid-cols-2 [&>div]:break-words [&_span]:mr-2 [&_span]:inline-block [&_span]:min-w-18 [&_span]:font-semibold [&_span]:text-gray-500">
            <div><span>{{ $t('admin.inquiries.email') }}</span>{{ item.email || '-' }}</div>
            <div><span>{{ $t('admin.inquiries.phone') }}</span>{{ item.phone || '-' }}</div>
            <div><span>{{ $t('admin.inquiries.country') }}</span>{{ item.country || '-' }}</div>
            <div><span>{{ $t('admin.inquiries.product') }}</span>{{ item.productSlug || '-' }}</div>
          </div>

          <div v-if="openId === item.id" class="mt-3.5 border-t border-[#eef1f4] pt-3.5">
            <div class="mb-2 break-words text-3.25 text-gray-700 [&_span]:mr-2 [&_span]:inline-block [&_span]:min-w-18 [&_span]:font-semibold [&_span]:text-gray-500"><span>{{ $t('admin.inquiries.im') }}</span>{{ item.im || '-' }}</div>
            <div class="mb-2 break-words text-3.25 text-gray-700 [&_span]:mr-2 [&_span]:inline-block [&_span]:min-w-18 [&_span]:font-semibold [&_span]:text-gray-500"><span>{{ $t('admin.inquiries.bulk') }}</span>{{ formatBulk(item.bulkIntent) }}</div>
            <div class="mb-2 break-words text-3.25 text-gray-700 [&_span]:mr-2 [&_span]:inline-block [&_span]:min-w-18 [&_span]:font-semibold [&_span]:text-gray-500"><span>{{ $t('admin.inquiries.locale') }}</span>{{ item.locale }}</div>
            <div class="mt-3 rounded-xl border border-[#e5eaf0] bg-white p-3">
              <div class="mb-1.5 text-xs font-bold tracking-[.04em] text-gray-500 uppercase">{{ $t('admin.inquiries.message') }}</div>
              <p class="break-words text-sm leading-[1.7] whitespace-pre-wrap text-gray-900">{{ item.message || $t('admin.inquiries.noMessage') }}</p>
            </div>
          </div>
        </article>
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

type InquiryItem = {
  id: number
  name: string
  company: string
  email: string
  phone: string
  country: string
  im: string
  bulkIntent: string
  productSlug: string
  message: string
  locale: string
  isRead: boolean
  createdAt: string
}

type StatusFilter = 'all' | 'unread' | 'read'
type RangeFilter = 'all' | 'today' | '7d' | '30d'

const { t } = useI18n()
const { authHeaders } = useAdminAuth()
const toast = useToast()

const items = ref<InquiryItem[]>([])
const unreadCount = ref(0)
const pending = ref(true)
const page = ref(1)
const pageSize = ref(20)
const total = ref(0)
const totalPages = computed(() => Math.max(1, Math.ceil(total.value / pageSize.value)))
const openId = ref<number | null>(null)
const status = ref<StatusFilter>('all')
const range = ref<RangeFilter>('all')

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

function formatDate(value: string) {
  return value ? value.slice(0, 16).replace('T', ' ') : ''
}

function formatBulk(value: string) {
  if (value === 'yes') return t('admin.inquiries.bulkYes')
  if (value === 'no') return t('admin.inquiries.bulkNo')
  return '-'
}

function setStatus(value: StatusFilter) {
  status.value = value
  page.value = 1
  load()
}

function setRange(value: RangeFilter) {
  range.value = value
  page.value = 1
  load()
}

async function toggle(item: InquiryItem) {
  openId.value = openId.value === item.id ? null : item.id
  if (openId.value === item.id && !item.isRead) {
    await setRead(item, true, false)
  }
}

async function load() {
  pending.value = true
  try {
    const data = await apiFetch<{ items: InquiryItem[]; unreadCount: number; total?: number }>('/api/inquiries', {
      headers: authHeaders(),
      query: {
        status: status.value,
        range: range.value,
        page: page.value,
        pageSize: pageSize.value
      }
    })
    items.value = data.items
    total.value = Number(data.total || data.items.length)
    unreadCount.value = data.unreadCount || 0
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

async function setRead(item: InquiryItem, isRead: boolean, reload = true) {
  try {
    await apiFetch('/api/inquiries/' + item.id, {
      method: 'PATCH',
      headers: authHeaders(),
      body: { isRead }
    })
    item.isRead = isRead
    if (isRead) unreadCount.value = Math.max(0, unreadCount.value - 1)
    else unreadCount.value += 1
    if (reload && (status.value === 'unread' || status.value === 'read')) {
      await load()
    }
  } catch (err: any) {
    toast.add({ title: t('admin.common.saveFailed'), description: err?.msg || t('admin.common.saveFailed'), color: 'error' })
  }
}

async function remove(item: InquiryItem) {
  if (!window.confirm(t('admin.inquiries.deleteConfirm', { name: item.name }))) return
  try {
    await apiFetch('/api/inquiries/' + item.id, {
      method: 'DELETE',
      headers: authHeaders()
    })
    if (openId.value === item.id) openId.value = null
    await load()
  } catch (err: any) {
    toast.add({ title: t('admin.common.deleteFailed'), description: err?.msg || t('admin.common.deleteFailed'), color: 'error' })
  }
}

onMounted(load)
</script>
