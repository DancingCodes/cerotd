<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-grid">
        <div class="footer-col">
          <div class="footer-brand">
            <img src="/images/logo.webp" alt="Cerotd" class="footer-brand-image" loading="lazy" decoding="async" />
          </div>
          <p class="footer-desc">{{ $t('footer.tagline') }}</p>
          <div class="footer-social">
            <a class="footer-social-link" href="https://www.facebook.com/profile.php?id=61575320303094&sk=reels_tab" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a class="footer-social-link" href="https://www.instagram.com/hanxiansheng889/reels/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a class="footer-social-link" href="https://wa.me/8615263792384" target="_blank" rel="noopener noreferrer">WhatsApp</a>
            <a class="footer-social-link" href="https://t.me/cerotdshand" target="_blank" rel="noopener noreferrer">Telegram</a>
          </div>
        </div>

        <div class="footer-col">
          <h2 class="footer-title">{{ $t('footer.trustTitle') }}</h2>
          <ul class="footer-list">
            <li v-for="n in 4" :key="n" class="footer-item">{{ $t(`footer.trustItems.item${n}`) }}</li>
            <li class="footer-item">
              <NuxtLink to="/about#certificates" class="footer-link">{{ $t('footer.trustLink') }}</NuxtLink>
            </li>
          </ul>
        </div>

<div class="footer-col">
          <h2 class="footer-title">{{ $t('footer.companyTitle') }}</h2>
          <ul class="footer-list">
            <li class="footer-item">
              <NuxtLink to="/about" class="footer-link">{{ $t('footer.aboutUs') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/services" class="footer-link">{{ $t('footer.ourServices') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/advantages" class="footer-link">{{ $t('footer.ourAdvantages') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/news" class="footer-link">{{ $t('common.news') }}</NuxtLink>
            </li>
            <li class="footer-item">
              <NuxtLink to="/contact" class="footer-link">{{ $t('common.contact') }}</NuxtLink>
            </li>
          </ul>
        </div>

        <div class="footer-col">
          <h2 class="footer-title">{{ $t('footer.contactTitle') }}</h2>
          <ul class="footer-list">
            <li class="footer-item">{{ $t('footer.location') }}</li>
            <li class="footer-item">{{ $t('footer.phone') }}</li>
            <li v-if="locale === 'zh'" class="footer-item">{{ $t('footer.wechatTitle') }}: {{ $t('footer.wechatId') }}</li>
          </ul>
          <div v-if="locale === 'zh'" class="footer-wechat">
            <img src="/images/wechat.webp" :alt="$t('footer.wechatTitle')" class="footer-wechat-image" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="footer-copyright">&copy; {{ year }} {{ $t('footer.copyright') }}</p>
        <a v-if="locale === 'zh'" class="footer-beian" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">鲁ICP备2026051999号-1</a>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--color-ink);
  color: #ffffff;
  padding: 72px 0 36px;
}
.footer .footer-container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding-left: 24px;
  padding-right: 24px;
}
.footer .footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 36px;
  margin-bottom: 40px;
}
@media (min-width: 768px) {
  .footer .footer-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .footer .footer-grid {
    grid-template-columns: 1.35fr repeat(3, 1fr);
  }
}
.footer .footer-col .footer-brand {
  margin-bottom: 16px;
}
.footer .footer-col .footer-brand .footer-brand-image {
  height: 34px;
  width: auto;
}
.footer .footer-col .footer-desc {
  max-width: 280px;
  color: rgba(255, 255, 255, 0.58);
  font-size: 14px;
  line-height: 1.7;
}
.footer .footer-col .footer-social {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
}
.footer .footer-col .footer-social .footer-social-link {
  display: inline-flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.72);
  font-size: 13px;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.25s ease;
}
.footer .footer-col .footer-social .footer-social-link:hover {
  color: #ffffff;
  background: rgba(255, 255, 255, 0.12);
}
.footer .footer-col .footer-title {
  margin-bottom: 18px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 650;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.footer .footer-col .footer-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer .footer-col .footer-list .footer-item {
  color: rgba(255, 255, 255, 0.58);
  font-size: 14px;
}
.footer .footer-col .footer-list .footer-item .footer-link {
  color: rgba(255, 255, 255, 0.58);
  text-decoration: none;
  transition: all 0.25s ease;
}
.footer .footer-col .footer-list .footer-item .footer-link:hover {
  color: #ffffff;
}
.footer .footer-col .footer-wechat {
  margin-top: 16px;
}
.footer .footer-col .footer-wechat .footer-wechat-image {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 12px;
  background: #ffffff;
}
.footer .footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
}
.footer .footer-bottom .footer-copyright {
  color: #6b7280;
  font-size: 13px;
  text-align: center;
}
.footer .footer-bottom .footer-beian {
  display: block;
  margin-top: 8px;
  color: #6b7280;
  font-size: 13px;
  text-align: center;
  text-decoration: none;
}
.footer .footer-bottom .footer-beian:hover {
  color: rgba(255, 255, 255, 0.38);
}
</style>
