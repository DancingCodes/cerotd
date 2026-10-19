<template>
  <div class="contact-page">
    <section class="page-hero">
      <div v-motion-slide-visible-once-bottom class="container">
        <h1 class="page-hero-title">{{ $t('contact.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('contact.hero.subtitle') }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section content">
      <div class="container content-grid">
        <aside class="info-panel">
          <h2 class="info-title">{{ $t('contact.info.title') }}</h2>
          <ul class="info-list">
            <li class="info-item">
              <p class="info-item-label">{{ $t('contact.info.addressLabel') }}</p>
              <p class="info-item-value">{{ $t('contact.info.addressValue') }}</p>
            </li>
            <li class="info-item">
              <p class="info-item-label">{{ $t('contact.info.phoneLabel') }}</p>
              <p class="info-item-value">{{ $t('contact.info.phoneValue') }}</p>
            </li>
            <li class="info-item">
              <p class="info-item-label">{{ $t('contact.info.whatsappLabel') }}</p>
              <a class="info-item-link" href="https://wa.me/8615263792384" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.whatsappValue') }}
              </a>
            </li>
            <li class="info-item">
              <p class="info-item-label">{{ $t('contact.info.telegramLabel') }}</p>
              <a class="info-item-link" href="https://t.me/cerotdshand" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.telegramValue') }}
              </a>
            </li>
            <li class="info-item">
              <p class="info-item-label">{{ $t('contact.info.facebookLabel') }}</p>
              <a class="info-item-link" href="https://www.facebook.com/profile.php?id=61575320303094&sk=reels_tab" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.facebookValue') }}
              </a>
            </li>
            <li class="info-item">
              <p class="info-item-label">{{ $t('contact.info.instagramLabel') }}</p>
              <a class="info-item-link" href="https://www.instagram.com/hanxiansheng889/reels/" target="_blank" rel="noopener noreferrer">
                {{ $t('contact.info.instagramValue') }}
              </a>
            </li>
            <li class="info-item">
              <p class="info-item-label">{{ $t('contact.info.wechatLabel') }}</p>
              <p class="info-item-value">{{ $t('contact.info.wechatValue') }}</p>
            </li>
          </ul>

          <div class="wechat-box">
            <p class="wechat-box-title">{{ $t('contact.social.wechatTip') }}</p>
            <img src="/images/wechat.webp" :alt="$t('contact.info.wechatLabel')" class="wechat-box-image" />
          </div>
        </aside>

        <div class="form-panel">
          <h2 class="form-title">{{ $t('contact.form.title') }}</h2>
          <p class="form-notice">{{ $t('contact.form.notice') }}</p>
          <form class="form-grid" @submit.prevent="onSubmit">
            <label class="form-field">
              <span class="form-field-label is-required">{{ $t('contact.form.name') }}</span>
              <input v-model="form.name" class="form-field-input" type="text" name="name" autocomplete="name" required :placeholder="$t('contact.form.name')" />
            </label>
            <label class="form-field">
              <span class="form-field-label">{{ $t('contact.form.company') }}</span>
              <input v-model="form.company" class="form-field-input" type="text" name="company" autocomplete="organization" :placeholder="$t('contact.form.company')" />
            </label>
            <div class="form-field form-field-full form-contact-group">
              <div class="form-contact-group-grid">
                <label class="form-field">
                  <span class="form-field-label">{{ $t('contact.form.email') }}</span>
                  <input v-model="form.email" class="form-field-input" type="email" name="email" autocomplete="email" :placeholder="$t('contact.form.email')" />
                </label>
                <label class="form-field">
                  <span class="form-field-label">{{ $t('contact.form.phone') }}</span>
                  <input v-model="form.phone" class="form-field-input" type="tel" name="phone" autocomplete="tel" :placeholder="$t('contact.form.phone')" />
                </label>
              </div>
              <p class="form-field-help">{{ $t('contact.form.emailOrPhoneHint') }}</p>
            </div>
            <label class="form-field">
              <span class="form-field-label">{{ $t('contact.form.country') }}</span>
              <input v-model="form.country" class="form-field-input" type="text" name="country" autocomplete="country-name" :placeholder="$t('contact.form.country')" />
            </label>
            <label class="form-field">
              <span class="form-field-label">{{ $t('contact.form.im') }}</span>
              <input v-model="form.im" class="form-field-input" type="text" name="im" :placeholder="$t('contact.form.im')" />
            </label>
            <fieldset class="form-field form-field-full">
              <legend class="form-field-label">{{ $t('contact.form.bulk') }}</legend>
              <div class="form-radio-list">
                <label class="form-radio-item">
                  <input v-model="form.bulk" type="radio" name="bulk" value="yes" />
                  <span>{{ $t('contact.form.bulkYes') }}</span>
                </label>
                <label class="form-radio-item">
                  <input v-model="form.bulk" type="radio" name="bulk" value="no" />
                  <span>{{ $t('contact.form.bulkNo') }}</span>
                </label>
              </div>
            </fieldset>
            <label class="form-field form-field-full">
              <span class="form-field-label">{{ $t('contact.form.product') }}</span>
              <select v-model="form.product" class="form-field-input" name="product">
                <option value="">{{ $t('contact.form.productPlaceholder') }}</option>
                <option v-for="category in productOptions" :key="category.slug" :value="category.slug">
                  {{ t(category.name) }}
                </option>
              </select>
            </label>
            <label class="form-field form-field-full">
              <span class="form-field-label">{{ $t('contact.form.message') }}</span>
              <textarea v-model="form.message" class="form-field-textarea" name="message" rows="5" :placeholder="$t('contact.form.message')"></textarea>
            </label>
            <button type="submit" class="form-submit" :disabled="submitting">
              {{ submitting ? $t('contact.form.submitting') : $t('contact.form.submit') }}
            </button>
          </form>
          <p v-if="submitStatus === 'success'" class="form-tip form-tip-success">{{ $t('contact.form.success') }}</p>
          <p v-else-if="submitStatus === 'error'" class="form-tip form-tip-error">{{ submitError || $t('contact.form.error') }}</p>
          <p v-else class="form-tip">{{ $t('contact.form.tip') }}</p>
        </div>
      </div>
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

<style scoped>
.contact-page .page-hero {
  padding: 88px 0 72px;
  background: radial-gradient(circle at 30% 10%, rgba(95, 208, 220, 0.14), transparent 28%), linear-gradient(180deg, var(--color-ink) 0%, var(--color-ink-soft) 100%);
  color: #ffffff;
}
.contact-page .page-hero .page-hero-title {
  margin-bottom: 18px;
  font-size: 56px;
  line-height: 1.08;
  letter-spacing: 0;
}
.contact-page .page-hero .page-hero-subtitle {
  max-width: 30ch;
  color: #c8ced6;
  font-size: 20px;
  line-height: 1.7;
}
.contact-page .section {
  padding: 96px 0;
}
@media (min-width: 768px) {
  .contact-page .section {
    padding: 120px 0;
  }
}
.contact-page .content {
  background: var(--color-surface);
}
.contact-page .content .content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}
@media (min-width: 980px) {
  .contact-page .content .content-grid {
    grid-template-columns: 0.85fr 1.15fr;
    gap: 28px;
  }
}
.contact-page .content .info-panel {
  padding: 32px 28px;
  border-radius: 14px;
  background: var(--color-ink);
  color: #ffffff;
  transition: transform 0.25s ease;
}
.contact-page .content .info-panel .info-title {
  margin-bottom: 28px;
  font-size: 28px;
  letter-spacing: 0;
}
.contact-page .content .info-panel .info-list {
  display: grid;
  gap: 22px;
}
.contact-page .content .info-panel .info-item .info-item-label {
  margin-bottom: 6px;
  color: #9aa3af;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.contact-page .content .info-panel .info-item .info-item-value,
.contact-page .content .info-panel .info-item .info-item-link {
  color: #ffffff;
  font-size: 16px;
  line-height: 1.6;
  text-decoration: none;
}
.contact-page .content .info-panel .info-item .info-item-link:hover {
  color: #5fd0dc;
}
.contact-page .content .info-panel .wechat-box {
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}
.contact-page .content .info-panel .wechat-box .wechat-box-title {
  margin-bottom: 14px;
  color: #9aa3af;
  font-size: 13px;
}
.contact-page .content .info-panel .wechat-box .wechat-box-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 14px;
  background: #ffffff;
}
.contact-page .content .form-panel {
  padding: 32px 28px;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid var(--color-line);
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.contact-page .content .form-panel .form-title {
  margin-bottom: 16px;
  font-size: 28px;
  letter-spacing: 0;
  color: #111827;
}
.contact-page .content .form-panel .form-notice {
  margin-bottom: 24px;
  padding: 14px 16px;
  border-radius: 10px;
  background: rgba(26, 166, 184, 0.08);
  border: 1px solid rgba(26, 166, 184, 0.18);
  color: #0f4c56;
  font-size: 14px;
  line-height: 1.7;
}
.contact-page .content .form-panel .form-radio-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
.contact-page .content .form-panel label.form-radio-item {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 44px;
  padding: 0 14px;
  border-radius: 999px;
  background: var(--color-surface);
  border: 1px solid #e2e6eb;
  color: #111827;
  font-size: 14px;
  cursor: pointer;
}
.contact-page .content .form-panel .form-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 720px) {
  .contact-page .content .form-panel .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.contact-page .content .form-panel .form-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0;
  padding: 0;
  border: none;
  min-width: 0;
}
.contact-page .content .form-panel .form-field .form-field-label.is-required::after {
  content: " *";
  color: #b42318;
}
.contact-page .content .form-panel .form-field .form-field-label {
  color: #374151;
  font-size: 13px;
  font-weight: 650;
  padding: 0;
}
.contact-page .content .form-panel .form-field .form-field-input,
.contact-page .content .form-panel .form-field .form-field-textarea {
  width: 100%;
  border: 1px solid #e2e6eb;
  border-radius: 14px;
  background-color: var(--color-surface);
  color: #111827;
  font: inherit;
  padding: 14px 16px;
  outline: none;
  transition: all 0.25s ease;
}
.contact-page .content .form-panel .form-field .form-field-input:focus,
.contact-page .content .form-panel .form-field .form-field-textarea:focus {
  border-color: rgba(26, 166, 184, 0.55);
  background-color: #ffffff;
  box-shadow: 0 0 0 4px rgba(26, 166, 184, 0.12);
}
.contact-page .content .form-panel .form-field .form-field-textarea {
  resize: vertical;
  min-height: 140px;
}
@media (min-width: 720px) {
  .contact-page .content .form-panel .form-field-full {
    grid-column: 1/-1;
  }
}
.contact-page .content .form-panel .form-contact-group {
  gap: 8px;
}
.contact-page .content .form-panel .form-contact-group .form-contact-group-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 720px) {
  .contact-page .content .form-panel .form-contact-group .form-contact-group-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
.contact-page .content .form-panel .form-contact-group .form-field-help {
  margin: 0;
  color: #6b7280;
  font-size: 12px;
  line-height: 1.5;
}
.contact-page .content .form-panel fieldset.form-field .form-field-label {
  float: left;
  width: 100%;
}
.contact-page .content .form-panel .form-submit {
  grid-column: 1/-1;
  width: 100%;
  margin-top: 4px;
  min-height: 52px;
  padding: 0 28px;
  border-radius: 999px;
  background: linear-gradient(135deg, #0f9aa8 0%, #3dd6e0 100%);
  color: #ffffff;
  font-size: 15px;
  font-weight: 650;
  transition: all 0.25s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.contact-page .content .form-panel .form-submit:disabled {
  opacity: 0.7;
  cursor: wait;
}
.contact-page .content .form-panel .form-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px rgba(26, 166, 184, 0.24);
}
.contact-page .content .form-panel .form-tip {
  margin-top: 14px;
  color: #6b7280;
  font-size: 13px;
  line-height: 1.6;
}
.contact-page .content .form-panel .form-tip.form-tip-success {
  color: #0f766e;
}
.contact-page .content .form-panel .form-tip.form-tip-error {
  color: #b42318;
}
</style>
