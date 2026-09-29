<template>
  <div class="home-page">
    <section class="hero">
      <div class="hero-media" aria-hidden="true">
        <img class="hero-media-image" src="/images/hero-bg.webp" alt="" fetchpriority="high" decoding="async" />
      </div>
      <div class="hero-overlay" aria-hidden="true"></div>
      <div class="container hero-content hero-rise">
        <p class="hero-badge">{{ $t('home.badge') }}</p>
        <h1 class="hero-title">{{ $t('home.hero.title') }}</h1>
        <p class="hero-subtitle">{{ $t('home.hero.subtitle') }}</p>
        <div class="hero-actions">
          <NuxtLink to="/products" class="btn btn-primary">{{ $t('home.hero.ctaPrimary') }}</NuxtLink>
          <NuxtLink to="/contact" class="btn btn-secondary">{{ $t('home.hero.ctaSecondary') }}</NuxtLink>
        </div>
        <ul class="hero-trust">
          <li class="hero-trust-item">{{ $t('home.hero.trust1') }}</li>
          <li class="hero-trust-item">{{ $t('home.hero.trust2') }}</li>
          <li class="hero-trust-item">{{ $t('home.hero.trust3') }}</li>
        </ul>
      </div>
    </section>

    <section class="proof" aria-label="Company stats">
      <div class="container proof-grid">
        <div v-for="n in 4" :key="n" class="proof-item">
          <p class="proof-value">{{ $t(`home.stats.item${n}.value`) }}</p>
          <p class="proof-label">{{ $t(`home.stats.item${n}.label`) }}</p>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section lab">
      <div class="container">
        <div class="lab-grid">
          <div class="lab-copy">
            <h2 class="section-title">{{ $t('home.lab.title') }}</h2>
            <p class="section-subtitle">{{ $t('home.lab.subtitle') }}</p>
            <ul class="lab-points">
              <li v-for="n in 3" :key="n" class="lab-point">{{ $t(`home.lab.point${n}`) }}</li>
            </ul>
            <NuxtLink to="/about" class="section-link">{{ $t('home.lab.link') }}</NuxtLink>
          </div>
          <div class="lab-panel">
            <article v-for="(item, index) in labItems" :key="item.name" class="lab-card">
              <p class="lab-card-index">0{{ index + 1 }}</p>
              <div class="lab-card-body">
                <h3 class="lab-card-title">{{ item.name }}</h3>
                <p class="lab-card-desc">{{ item.desc }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section lines">
      <div class="container">
        <div class="section-copy">
          <h2 class="section-title">{{ $t('home.lines.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.lines.subtitle') }}</p>
        </div>
        <div class="lines-grid">
          <NuxtLink
            v-for="item in productLines"
            :key="item.slug"
            :to="`/products?category=${item.slug}`"
            class="line-card"
          >
            <h3 class="line-card-title">{{ item.name }}</h3>
            <p class="line-card-desc">{{ item.desc }}</p>
          </NuxtLink>
        </div>
        <div class="lines-actions">
          <NuxtLink to="/products" class="section-link">{{ $t('common.viewProducts') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section advantages">
      <div class="container">
        <div class="section-copy">
          <h2 class="section-title">{{ $t('home.advantages.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.advantages.subtitle') }}</p>
        </div>
        <div class="advantages-grid">
          <article v-for="(item, index) in advantages" :key="item.name" class="advantage-card">
            <div class="advantage-media">
              <img
                v-if="advantageImages[index]"
                class="advantage-media-image"
                :src="advantageImages[index]"
                :alt="item.name"
                loading="lazy"
                decoding="async"
              />
              <div v-else class="advantage-media-blank">{{ $t('common.mediaBlank') }}</div>
            </div>
            <div class="advantage-card-body">
              <h3 class="advantage-card-title">{{ item.name }}</h3>
              <p class="advantage-card-desc">{{ item.desc }}</p>
            </div>
          </article>
        </div>
        <div class="section-actions">
          <NuxtLink to="/advantages" class="section-link">{{ $t('home.advantages.link') }}</NuxtLink>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section partners">
      <div class="container">
        <div class="section-copy">
          <h2 class="section-title">{{ $t('home.partners.title') }}</h2>
          <p class="section-subtitle">{{ $t('home.partners.subtitle') }}</p>
        </div>
        <div class="partners-grid">
          <a
            v-for="partner in partnerLogos"
            :key="partner.name"
            class="partner-slot"
            :href="partner.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="partner.name"
          >
            <img class="partner-logo" :src="partner.logo" :alt="partner.name" loading="lazy" decoding="async" />
          </a>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="cta">
      <div class="container">
        <div class="cta-panel">
          <div class="cta-copy">
            <h2 class="cta-title">{{ $t('home.cta.title') }}</h2>
            <p class="cta-subtitle">{{ $t('home.cta.subtitle') }}</p>
          </div>
          <NuxtLink to="/contact" class="btn btn-light">{{ $t('home.cta.button') }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>


<script setup lang="ts">
import { PRODUCT_CATEGORIES } from '../shared/product-categories'

const { t, locale } = useI18n()
const tLocal = useLocalized()

usePageSeo({
  title: t('seo.home.title'),
  description: t('seo.home.description'),
  path: '/'
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Cerotd',
        url: useSiteUrl(),
        logo: `${useSiteUrl()}/images/logo.png`
      })
    }
  ]
})

const partnerLogos = [
  { name: 'SK', logo: '/images/partners/sk.png', href: 'https://eng.sk.com/' },
  { name: 'ExxonMobil', logo: '/images/partners/exxonmobil.png', href: 'https://corporate.exxonmobil.com/' },
  { name: 'PetroChina', logo: '/images/partners/petrochina.png', href: 'https://www.petrochina.com.cn/' },
  { name: 'Sinopec', logo: '/images/partners/sinopec.png', href: 'https://www.sinopec.com/' },
  { name: 'Infineum', logo: '/images/partners/infineum.jpg', href: 'https://www.infineum.com/' },
  { name: 'Afton Chemical', logo: '/images/partners/afton-chemical.png', href: 'https://www.aftonchemical.com/' },
  { name: 'Chevron', logo: '/images/partners/chevron.png', href: 'https://www.chevron.com/' },
  { name: 'Lubrizol', logo: '/images/partners/lubrizol.png', href: 'https://www.lubrizol.com/' }
]

const advantageImages = [
  '/images/factory/8.jpg',
  '/images/factory/9.jpg',
  '/images/factory/10.jpg',
  '/images/factory/11.jpg'
]

const productLines = computed(() => {
  locale.value
  return PRODUCT_CATEGORIES.map((item) => ({
    slug: item.slug,
    name: tLocal(item.name),
    desc: t(`home.lines.items.${item.slug}.desc`)
  }))
})

const advantages = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`home.advantages.items.item${n}.name`),
    desc: t(`home.advantages.items.item${n}.desc`)
  }))
})

const labItems = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`home.lab.items.item${n}.name`),
    desc: t(`home.lab.items.item${n}.desc`)
  }))
})

</script>

<style lang="scss" scoped>
.home-page {
  .hero {
    position: relative;
    min-height: 78vh;
    display: flex;
    align-items: center;
    padding: 120px 0 96px;
    overflow: hidden;
    color: #ffffff;
    background: var(--color-ink);

    .hero-media {
      position: absolute;
      inset: 0;

      .hero-media-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 40%;
        transform: scale(1.04);
        filter: saturate(0.78) contrast(1.05);
      }
    }

    .hero-overlay {
      position: absolute;
      inset: 0;
      background:
        linear-gradient(90deg, rgba(7, 11, 18, 0.88) 0%, rgba(7, 11, 18, 0.72) 42%, rgba(7, 11, 18, 0.34) 100%),
        linear-gradient(180deg, rgba(7, 11, 18, 0.28) 0%, rgba(7, 11, 18, 0.78) 100%);
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 820px;
    }

    .hero-badge {
      margin-bottom: 20px;
      color: var(--color-metal);
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }

    .hero-title {
      margin-bottom: 18px;
      max-width: 18ch;
      font-size: 64px;
      font-weight: 600;
      line-height: 1.06;
      letter-spacing: -0.045em;
    }

    .hero-subtitle {
      max-width: 44ch;
      margin-bottom: 28px;
      color: rgba(#ffffff, 0.78);
      font-size: 18px;
      line-height: 1.7;
      font-weight: 400;
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-bottom: 28px;
    }

    .hero-trust {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .hero-trust-item {
        padding: 8px 12px;
        border: 1px solid rgba(#ffffff, 0.16);
        border-radius: 999px;
        background: rgba(#ffffff, 0.04);
        color: rgba(#ffffff, 0.82);
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.04em;
      }
    }
  }

  .hero-rise {
    .hero-badge,
    .hero-title,
    .hero-subtitle,
    .hero-actions,
    .hero-trust {
      opacity: 0;
      transform: translateY(16px);
      animation: hero-rise 0.7s ease forwards;
    }

    .hero-title { animation-delay: 0.06s; }
    .hero-subtitle { animation-delay: 0.12s; }
    .hero-actions { animation-delay: 0.18s; }
    .hero-trust { animation-delay: 0.24s; }
  }

  @keyframes hero-rise {
    to {
      opacity: 1;
      transform: none;
    }
  }

  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 22px;
    border-radius: 999px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.01em;
    text-decoration: none;
    transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
  }

  .btn.btn-primary {
    background: #ffffff;
    color: var(--color-ink);

    &:hover { background: #e8eef3; }
  }

  .btn.btn-secondary {
    background: transparent;
    border: 1px solid rgba(#ffffff, 0.28);
    color: #ffffff;

    &:hover { border-color: rgba(#ffffff, 0.55); background: rgba(#ffffff, 0.04); }
  }

  .btn.btn-light {
    background: #ffffff;
    color: var(--color-ink);

    &:hover { background: #e8eef3; }
  }

  .proof {
    background: #ffffff;
    border-bottom: 1px solid var(--color-line);

    .proof-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);

      @media (min-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .proof-item {
      padding: 28px 0;

      &:nth-child(odd) {
        padding-right: 24px;
        border-right: 1px solid var(--color-line);
      }

      &:nth-child(even) {
        padding-left: 24px;
      }

      &:nth-child(-n + 2) {
        border-bottom: 1px solid var(--color-line);
      }

      @media (min-width: 900px) {
        padding: 34px 24px 34px 0;
        border-right: 1px solid var(--color-line);
        border-bottom: 0;

        &:nth-child(odd) {
          padding-right: 24px;
        }

        &:not(:first-child) {
          padding-left: 24px;
        }

        &:last-child {
          border-right: 0;
        }
      }

      .proof-value {
        margin-bottom: 6px;
        color: var(--color-text);
        font-size: 28px;
        font-weight: 600;
        letter-spacing: -0.03em;
      }

      .proof-label {
        color: var(--color-muted);
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0.02em;
      }
    }
  }

  .section {
    padding: 96px 0;

    @media (min-width: 768px) { padding: 112px 0; }
  }

  .section-top {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: flex-end;
      justify-content: space-between;
    }
  }

  .section-copy {
    max-width: 620px;

    .section-title {
      margin-bottom: 14px;
      color: var(--color-text);
      font-size: 40px;
      font-weight: 600;
      line-height: 1.12;
      letter-spacing: -0.035em;
    }

    .section-subtitle {
      color: var(--color-muted);
      font-size: 17px;
      line-height: 1.7;
    }
  }

  .section-copy.section-copy-light {
    margin-bottom: 40px;

    .section-title { color: #ffffff; }
    .section-subtitle { color: rgba(#ffffff, 0.62); }
  }

  .section-actions {
    margin-top: 28px;
  }

  .section-actions.section-actions-light {
    margin-top: 8px;
    padding-top: 8px;
  }

  .section-link {
    color: var(--color-accent);
    font-size: 14px;
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 0.02em;
  }

  .section-link.section-link-light {
    color: rgba(#ffffff, 0.88);
  }

  .lab {
    background: var(--color-surface);

    .lab-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 28px;
      align-items: start;

      @media (min-width: 960px) {
        grid-template-columns: 0.95fr 1.05fr;
        gap: 48px;
      }
    }

    .section-title {
      margin-bottom: 14px;
      color: var(--color-text);
      font-size: 40px;
      font-weight: 600;
      line-height: 1.12;
      letter-spacing: -0.035em;
    }

    .section-subtitle {
      color: var(--color-muted);
      font-size: 17px;
      line-height: 1.7;
    }

    .lab-points {
      margin: 28px 0 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }

    .lab-point {
      padding-top: 14px;
      border-top: 1px solid var(--color-line);
      color: #3d4654;
      font-size: 16px;
      line-height: 1.7;
    }

    .lab-panel {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;

      @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .lab-card {
      display: grid;
      grid-template-columns: 42px 1fr;
      gap: 14px;
      min-height: 100%;
      padding: 22px 20px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid var(--color-line);
    }

    .lab-card-index {
      color: var(--color-metal);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.08em;
    }

    .lab-card-title {
      margin-bottom: 8px;
      color: var(--color-text);
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.02em;
    }

    .lab-card-desc {
      color: var(--color-muted);
      font-size: 15px;
      line-height: 1.7;
    }
  }

  .lines {
    background: #ffffff;

    .lines-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;

      @media (min-width: 768px) {
        grid-template-columns: 1fr 1fr;
      }

      @media (min-width: 1100px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .line-card {
      display: block;
      padding: 22px 20px;
      text-decoration: none;
      color: inherit;
      cursor: pointer;
      border-radius: 20px;
      background: var(--color-surface);
      border: 1px solid #e8edf2;
      transition: transform 0.25s ease, border-color 0.25s ease;

      &:hover {
        transform: translateY(-3px);
        border-color: #cfd8e3;
      }

      .line-card-title {
        margin-bottom: 10px;
        color: #0f4c56;
        font-size: 18px;
        font-weight: 700;
        letter-spacing: -0.01em;
      }

      .line-card-desc {
        color: #4b5563;
        font-size: 14px;
        line-height: 1.7;
      }
    }

    .lines-actions {
      margin-top: 28px;
    }
  }


  .advantages {
    background: #ffffff;

    .advantages-grid {
      margin-top: 40px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
    }

    .advantage-card {
      overflow: hidden;
      border-radius: 18px;
      background: var(--color-surface);
      border: 1px solid var(--color-line);

      .advantage-media {
        aspect-ratio: 16 / 9;
        overflow: hidden;
        background: #dfe3e8;

        .advantage-media-blank {
        width: 100%;
        height: 100%;
        min-height: 160px;
        display: flex;
        align-items: center;
        justify-content: center;
        background:
          linear-gradient(135deg, rgba(#8b9aab, 0.12), transparent 42%),
          #121a28;
        color: #8b95a5;
        font-size: 12px;
        font-weight: 650;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .advantage-media-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.8) contrast(1.05);
        }
      }

      .advantage-card-body {
        padding: 22px;
      }

      .advantage-card-title {
        margin-bottom: 8px;
        color: var(--color-text);
        font-size: 22px;
        font-weight: 600;
        letter-spacing: -0.02em;
      }

      .advantage-card-desc {
        color: var(--color-muted);
        font-size: 15px;
        line-height: 1.7;
      }
    }
  }

  .partners {
    background: var(--color-surface);

    .partners-grid {
      margin-top: 40px;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 14px;

      @media (min-width: 768px) { grid-template-columns: repeat(4, 1fr); }
    }

    .partner-slot {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 120px;
      padding: 20px 22px;
      border-radius: 18px;
      background: #ffffff;
      border: 1px solid #e1e4e8;
      text-decoration: none;
      cursor: pointer;
      transition: border-color 0.25s ease, transform 0.25s ease;

      &:hover {
        border-color: #cfd8e3;
        transform: translateY(-2px);
      }

      .partner-logo {
        width: 100%;
        max-width: 160px;
        height: 56px;
        object-fit: contain;
        object-position: center;
        display: block;
        opacity: 0.92;
      }
    }
  }

  .cta {
    padding: 0 0 96px;
    background: var(--color-surface);

    .cta-panel {
      display: flex;
      flex-direction: column;
      gap: 24px;
      padding: 40px 28px;
      border-radius: 18px;
      background: var(--color-ink);
      color: #ffffff;
      border: 1px solid rgba(#ffffff, 0.06);

      @media (min-width: 800px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 48px 40px;
      }

      .cta-title {
        margin-bottom: 10px;
        font-size: 32px;
        font-weight: 600;
        letter-spacing: -0.03em;
      }

      .cta-subtitle {
        max-width: 560px;
        color: rgba(#ffffff, 0.62);
        font-size: 16px;
        line-height: 1.7;
      }
    }
  }

  @media (max-width: 767px) {
    .hero {
      min-height: 86vh;
      padding: 110px 0 88px;
      align-items: center;

      .hero-title {
        max-width: none;
        font-size: 42px;
      }

      .hero-subtitle { font-size: 16px; }
    }

    .section-copy .section-title,
    .lab .section-title { font-size: 32px; }
  }
}
</style>




