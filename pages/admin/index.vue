<template>
  <div class="flex min-h-[calc(100vh-140px)] items-center justify-center">
    <div class="w-full max-w-105 rounded-[12px] border border-[#e5eaf0] bg-white p-7 shadow-[0_10px_30px_rgba(15,23,42,.04)]">
      <div class="mb-2 text-2xl font-bold tracking-normal">{{ $t('admin.login.title') }}</div>
      <div class="mb-5 text-sm leading-[1.6] text-gray-500">{{ $t('admin.login.desc') }}</div>
      <UInput
        v-model="input"
        type="password"
        :placeholder="$t('admin.login.placeholder')"
        @keyup.enter="login"
      />
      <div v-if="error" class="mt-2.5 text-3.25 text-[#b42318]">{{ error }}</div>
      <div class="mt-4">
        <UButton color="primary" @click="login">{{ $t('admin.login.enter') }}</UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const { t } = useI18n()
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
</script>
