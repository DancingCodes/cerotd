<template>
  <div class="flex min-h-[calc(100vh-140px)] items-center justify-center">
    <div class="relative w-full max-w-105 rounded-[12px] border border-[#e5eaf0] bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,.04)]">
      <button type="button" class="absolute right-7 top-7 cursor-pointer rounded-[8px] bg-[#eef1f4] px-2.5 py-1.5 text-xs font-semibold text-gray-600 transition-colors duration-300 ease-out hover:bg-[#e1e7eb]" @click="toggleLocale">{{ locale === 'en' ? '中文' : 'EN' }}</button>
      <div class="mb-2 text-2xl font-bold tracking-normal">{{ $t('admin.login.title') }}</div>
      <div class="mb-5 text-sm leading-[1.6] text-gray-500">{{ $t('admin.login.desc') }}</div>
      <UInput
        v-model="input"
        type="password"
        :placeholder="$t('admin.login.placeholder')"
        class="w-full"
        :ui="{ base: 'h-11 rounded-[10px] border-[#d7dee7] bg-[#f8fafb] px-3 text-gray-900 focus:border-[#0e7f8f] focus:ring-2 focus:ring-[#0e7f8f]/15' }"
        @keyup.enter="login"
      />
      <div v-if="error" class="mt-2.5 text-3.25 text-[#b42318]">{{ error }}</div>
      <div class="mt-4">
        <button type="button" class="flex h-11 w-full cursor-pointer items-center justify-center rounded-[10px] bg-[#0e7f8f] px-4 text-sm font-semibold text-white transition-colors duration-300 ease-out hover:bg-[#0b6d7b]" @click="login">{{ $t('admin.login.enter') }}</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { t, locale, setLocale } = useI18n()
const { token, setToken, clearToken } = useAdminAuth()
const input = ref(token.value)
const error = ref('')

onMounted(() => {
  if (token.value) {
    navigateTo('/admin/dashboard')
  }
})

async function login() {
  error.value = ''
  const value = input.value.trim()
  if (!value) {
    error.value = t('admin.login.tokenRequired')
    return
  }

  setToken(value)

  try {
    await apiFetch('/api/admin/check')
    navigateTo('/admin/dashboard')
  } catch {
    clearToken()
  }
}

function toggleLocale() {
  setLocale(locale.value === 'en' ? 'zh' : 'en')
}
</script>
