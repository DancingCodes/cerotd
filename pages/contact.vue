<template>
  <div>
    <section class="bg-[radial-gradient(circle_at_30%_10%,rgba(95,208,220,.14),transparent_28%),linear-gradient(180deg,var(--ui-color-neutral-950)_0%,var(--ui-color-neutral-900)_100%)] py-18 text-white md:py-22">
      <UContainer>
        <h1 class="mb-4.5 text-14 leading-[1.08]">{{ $t('contact.hero.title') }}</h1>
        <p class="max-w-[30ch] text-lg leading-[1.7] text-[#c8ced6] md:text-xl">{{ $t('contact.hero.subtitle') }}</p>
      </UContainer>
    </section>

    <section class="bg-muted py-24 md:py-30">
      <UContainer class="grid grid-cols-1 gap-6 min-[980px]:grid-cols-[.85fr_1.15fr] min-[980px]:gap-7">
        <aside class="rounded-3.5 bg-neutral-950 px-7 py-8 text-white">
          <h2 class="mb-7 text-7">{{ $t('contact.info.title') }}</h2>
          <ul class="grid gap-5.5">
            <li>
              <p class="mb-1.5 text-3.25 font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.addressLabel') }}</p>
              <p class="text-base leading-[1.6] text-white">{{ $t('contact.info.addressValue') }}</p>
            </li>
            <li>
              <p class="mb-1.5 text-3.25 font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.phoneLabel') }}</p>
              <p class="text-base leading-[1.6] text-white">{{ $t('contact.info.phoneValue') }}</p>
            </li>
            <li>
              <p class="mb-1.5 text-3.25 font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.whatsappLabel') }}</p>
              <a class="text-base leading-[1.6] text-white no-underline transition-colors hover:text-[#5fd0dc]" href="https://wa.me/8615263792384" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.whatsappValue') }}
              </a>
            </li>
            <li>
              <p class="mb-1.5 text-3.25 font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.telegramLabel') }}</p>
              <a class="text-base leading-[1.6] text-white no-underline transition-colors hover:text-[#5fd0dc]" href="https://t.me/cerotdshand" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.telegramValue') }}
              </a>
            </li>
            <li>
              <p class="mb-1.5 text-3.25 font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.facebookLabel') }}</p>
              <a class="text-base leading-[1.6] text-white no-underline transition-colors hover:text-[#5fd0dc]" href="https://www.facebook.com/profile.php?id=61575320303094&sk=reels_tab" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.facebookValue') }}
              </a>
            </li>
            <li>
              <p class="mb-1.5 text-3.25 font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.instagramLabel') }}</p>
              <a class="text-base leading-[1.6] text-white no-underline transition-colors hover:text-[#5fd0dc]" href="https://www.instagram.com/hanxiansheng889/reels/" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.instagramValue') }}
              </a>
            </li>
            <li>
              <p class="mb-1.5 text-3.25 font-semibold tracking-[.04em] text-[#9aa3af] uppercase">{{ $t('contact.info.wechatLabel') }}</p>
              <p class="text-base leading-[1.6] text-white">{{ $t('contact.info.wechatValue') }}</p>
            </li>
          </ul>

          <div class="mt-7 border-t border-white/8 pt-6">
            <p class="mb-3.5 text-3.25 text-[#9aa3af]">{{ $t('contact.social.wechatTip') }}</p>
            <img src="/images/wechat.webp" :alt="$t('contact.info.wechatLabel')" class="size-30 rounded-3.5 bg-white object-cover" />
          </div>
        </aside>

        <div class="rounded-3.5 border border-default bg-white px-7 py-8 shadow-[0_10px_30px_rgba(15,23,42,.08)]">
          <h2 class="mb-4 text-7 text-gray-900">{{ $t('contact.form.title') }}</h2>
          <p class="mb-6 rounded-2.5 border border-[#1aa6b8]/20 bg-[#1aa6b8]/8 px-4 py-3.5 text-sm leading-[1.7] text-[#0f4c56]">{{ $t('contact.form.notice') }}</p>
          <form class="grid grid-cols-1 gap-4 min-[720px]:grid-cols-2" @submit.prevent="onSubmit">
            <label class="flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-3.25 font-semibold text-gray-700 after:text-[#b42318] after:content-['_*']">{{ $t('contact.form.name') }}</span>
              <input v-model="form.name" class="w-full rounded-3.5 border border-[#e2e6eb] bg-muted px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#1aa6b8]/55 focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" type="text" name="name" autocomplete="name" required :placeholder="$t('contact.form.name')" />
            </label>
            <label class="flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-3.25 font-semibold text-gray-700">{{ $t('contact.form.company') }}</span>
              <input v-model="form.company" class="w-full rounded-3.5 border border-[#e2e6eb] bg-muted px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#1aa6b8]/55 focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" type="text" name="company" autocomplete="organization" :placeholder="$t('contact.form.company')" />
            </label>
            <div class="col-span-full flex min-w-0 flex-col gap-2 border-0 p-0">
              <div class="grid grid-cols-1 gap-4 min-[720px]:grid-cols-2">
                <label class="flex min-w-0 flex-col gap-2 border-0 p-0">
                  <span class="text-3.25 font-semibold text-gray-700">{{ $t('contact.form.email') }}</span>
                  <input v-model="form.email" class="w-full rounded-3.5 border border-[#e2e6eb] bg-muted px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#1aa6b8]/55 focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" type="email" name="email" autocomplete="email" :placeholder="$t('contact.form.email')" />
                </label>
                <label class="flex min-w-0 flex-col gap-2 border-0 p-0">
                  <span class="text-3.25 font-semibold text-gray-700">{{ $t('contact.form.phone') }}</span>
                  <input v-model="form.phone" class="w-full rounded-3.5 border border-[#e2e6eb] bg-muted px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#1aa6b8]/55 focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" type="tel" name="phone" autocomplete="tel" :placeholder="$t('contact.form.phone')" />
                </label>
              </div>
              <p class="text-xs text-gray-500">{{ $t('contact.form.emailOrPhoneHint') }}</p>
            </div>
            <label class="flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-3.25 font-semibold text-gray-700">{{ $t('contact.form.country') }}</span>
              <input v-model="form.country" class="w-full rounded-3.5 border border-[#e2e6eb] bg-muted px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#1aa6b8]/55 focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" type="text" name="country" autocomplete="country-name" :placeholder="$t('contact.form.country')" />
            </label>
            <label class="flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-3.25 font-semibold text-gray-700">{{ $t('contact.form.im') }}</span>
              <input v-model="form.im" class="w-full rounded-3.5 border border-[#e2e6eb] bg-muted px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#1aa6b8]/55 focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" type="text" name="im" :placeholder="$t('contact.form.im')" />
            </label>
            <fieldset class="col-span-full flex min-w-0 flex-col gap-2 border-0 p-0">
              <legend class="text-3.25 font-semibold text-gray-700">{{ $t('contact.form.bulk') }}</legend>
              <div class="flex flex-wrap gap-3">
                <label class="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-[#e2e6eb] bg-muted px-3.5 text-sm text-gray-900">
                  <input v-model="form.bulk" type="radio" name="bulk" value="yes" />
                  <span>{{ $t('contact.form.bulkYes') }}</span>
                </label>
                <label class="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border border-[#e2e6eb] bg-muted px-3.5 text-sm text-gray-900">
                  <input v-model="form.bulk" type="radio" name="bulk" value="no" />
                  <span>{{ $t('contact.form.bulkNo') }}</span>
                </label>
              </div>
            </fieldset>
            <label class="col-span-full flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-3.25 font-semibold text-gray-700">{{ $t('contact.form.product') }}</span>
              <select v-model="form.product" class="w-full rounded-3.5 border border-[#e2e6eb] bg-muted px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#1aa6b8]/55 focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" name="product">
                <option value="">{{ $t('contact.form.productPlaceholder') }}</option>
                <option v-for="category in productOptions" :key="category.slug" :value="category.slug">
                  {{ t(category.name) }}
                </option>
              </select>
            </label>
            <label class="col-span-full flex min-w-0 flex-col gap-2 border-0 p-0">
              <span class="text-3.25 font-semibold text-gray-700">{{ $t('contact.form.message') }}</span>
              <textarea v-model="form.message" class="min-h-35 w-full resize-y rounded-3.5 border border-[#e2e6eb] bg-muted px-4 py-3.5 text-gray-900 outline-none transition focus:border-[#1aa6b8]/55 focus:bg-white focus:ring-4 focus:ring-[#1aa6b8]/12" name="message" rows="5" :placeholder="$t('contact.form.message')"></textarea>
            </label>
            <button type="submit" class="col-span-full mt-1 inline-flex min-h-13 w-full cursor-pointer items-center justify-center rounded-full bg-linear-to-br from-[#0f9aa8] to-[#3dd6e0] px-7 text-3.75 font-semibold text-white transition hover:-translate-y-px hover:shadow-[0_12px_28px_rgba(26,166,184,.24)] disabled:cursor-wait disabled:opacity-70" :disabled="submitting">
              {{ submitting ? $t('contact.form.submitting') : $t('contact.form.submit') }}
            </button>
          </form>
          <p v-if="submitStatus === 'success'" class="mt-3.5 text-3.25 leading-[1.6] text-teal-700">{{ $t('contact.form.success') }}</p>
          <p v-else-if="submitStatus === 'error'" class="mt-3.5 text-3.25 leading-[1.6] text-[#b42318]">{{ submitError || $t('contact.form.error') }}</p>
          <p v-else class="mt-3.5 text-3.25 leading-[1.6] text-gray-500">{{ $t('contact.form.tip') }}</p>
        </div>
      </UContainer>
    </section>
  </div>
</template>


<script setup lang="ts">
import { PRODUCT_CATEGORIES } from '#shared/product-categories'

const t = useLocalized()
const { locale, t: i18nT } = useI18n()

usePageSeo({
  title: i18nT('seo.contact.title'),
  description: i18nT('seo.contact.description'),
  path: '/contact'
})

const productOptions = PRODUCT_CATEGORIES

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  country: '',
  im: '',
  bulk: '',
  product: '',
  message: ''
})

const submitting = ref(false)
const submitStatus = ref('idle')
const submitError = ref('')

function resetForm() {
  form.name = ''
  form.company = ''
  form.email = ''
  form.phone = ''
  form.country = ''
  form.im = ''
  form.bulk = ''
  form.product = ''
  form.message = ''
}

async function onSubmit() {
  submitStatus.value = 'idle'
  submitError.value = ''

  if (!form.name.trim()) {
    submitStatus.value = 'error'
    submitError.value = i18nT('contact.form.requiredName')
    return
  }
  if (!form.email.trim() && !form.phone.trim()) {
    submitStatus.value = 'error'
    submitError.value = i18nT('contact.form.requiredContact')
    return
  }
  if (form.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    submitStatus.value = 'error'
    submitError.value = i18nT('contact.form.invalidEmail')
    return
  }

  submitting.value = true
  try {
    await apiFetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        country: form.country,
        im: form.im,
        bulk: form.bulk,
        product: form.product,
        message: form.message,
        locale: locale.value
      }
    })
    submitStatus.value = 'success'
    resetForm()
  } catch (error) {
    submitStatus.value = 'error'
    const err = error as { msg?: string } | null
    submitError.value = err?.msg || i18nT('contact.form.error')
  } finally {
    submitting.value = false
  }
}
</script>
