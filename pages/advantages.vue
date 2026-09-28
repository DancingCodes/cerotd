<template>
  <div class="advantages-page">
    <section class="page-hero page-hero-rise">
      <div class="container">
        <h1 class="page-hero-title">{{ $t('advantages.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('advantages.hero.subtitle') }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section outcomes">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('advantages.outcomes.title') }}</h2>
          <p class="section-subtitle">{{ $t('advantages.outcomes.subtitle') }}</p>
        </div>
        <div class="outcomes-grid">
          <article v-for="item in outcomes" :key="item.name" class="outcome-card">
            <h3 class="outcome-card-title">{{ item.name }}</h3>
            <p class="outcome-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section compare">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('advantages.compare.title') }}</h2>
          <p class="section-subtitle">{{ $t('advantages.compare.subtitle') }}</p>
        </div>
        <div class="compare-list">
          <article v-for="item in compare" :key="item.name" class="compare-item">
            <h3 class="compare-item-title">{{ item.name }}</h3>
            <p class="compare-item-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section pillars">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('advantages.pillars.title') }}</h2>
          <p class="section-subtitle">{{ $t('advantages.pillars.subtitle') }}</p>
        </div>
        <div class="pillars-grid">
          <article v-for="(item, index) in pillars" :key="item.name" class="pillar-card">
            <p class="pillar-card-index">0{{ index + 1 }}</p>
            <h3 class="pillar-card-title">{{ item.name }}</h3>
            <p class="pillar-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section assurance">
      <div class="container">
        <div class="section-header section-header-light">
          <h2 class="section-title">{{ $t('advantages.assurance.title') }}</h2>
          <p class="section-subtitle">{{ $t('advantages.assurance.subtitle') }}</p>
        </div>
        <div class="assurance-grid">
          <article v-for="(item, index) in assurance" :key="item.name" class="assurance-card">
            <p class="assurance-card-index">0{{ index + 1 }}</p>
            <h3 class="assurance-card-title">{{ item.name }}</h3>
            <p class="assurance-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="cta">
      <div class="container">
        <div class="cta-panel">
          <div class="cta-copy">
            <h2 class="cta-title">{{ $t('advantages.cta.title') }}</h2>
            <p class="cta-subtitle">{{ $t('advantages.cta.subtitle') }}</p>
          </div>
          <div class="cta-actions">
            <NuxtLink to="/contact" class="btn btn-light">{{ $t('advantages.cta.button') }}</NuxtLink>
            <NuxtLink to="/products" class="btn btn-ghost">{{ $t('advantages.cta.secondary') }}</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

usePageSeo({
  title: t('seo.advantages.title'),
  description: t('seo.advantages.description'),
  path: '/advantages'
})

const outcomes = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`advantages.outcomes.items.item${n}.name`),
    desc: t(`advantages.outcomes.items.item${n}.desc`)
  }))
})

const pillars = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`advantages.pillars.items.item${n}.name`),
    desc: t(`advantages.pillars.items.item${n}.desc`)
  }))
})

const compare = computed(() => {
  locale.value
  return [1, 2, 3].map((n) => ({
    name: t(`advantages.compare.items.item${n}.name`),
    desc: t(`advantages.compare.items.item${n}.desc`)
  }))
})

const assurance = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`advantages.assurance.items.item${n}.name`),
    desc: t(`advantages.assurance.items.item${n}.desc`)
  }))
})
</script>

<style lang="scss" scoped>
.advantages-page {
  .page-hero-rise {
    .page-hero-title,
    .page-hero-subtitle {
      opacity: 0;
      transform: translateY(18px);
      animation: page-hero-rise 0.7s ease forwards;
    }

    .page-hero-subtitle {
      animation-delay: 0.1s;
    }
  }

  @keyframes page-hero-rise {
    to {
      opacity: 1;
      transform: none;
    }
  }

  .page-hero {
    padding: 88px 0 72px;
    background:
      radial-gradient(circle at 70% 20%, rgba(#8b9aab, 0.14), transparent 28%),
      linear-gradient(180deg, var(--color-ink) 0%, var(--color-ink-soft) 100%);
    color: #ffffff;

    .page-hero-title {
      margin-bottom: 18px;
      font-size: 56px;
      line-height: 1.08;
      letter-spacing: -0.03em;
    }

    .page-hero-subtitle {
      max-width: 34ch;
      color: #c8ced6;
      font-size: 20px;
      line-height: 1.7;
    }
  }

  .section {
    padding: 96px 0;

    @media (min-width: 768px) {
      padding: 120px 0;
    }
  }

  .section-header {
    margin-bottom: 48px;

    .section-title {
      margin-bottom: 14px;
      font-size: 36px;
      letter-spacing: -0.03em;
      color: #111827;
    }

    .section-subtitle {
      max-width: 48ch;
      color: #4b5563;
      font-size: 17px;
      line-height: 1.7;
    }
  }

  .section-header.section-header-light {
    .section-title {
      color: #ffffff;
    }

    .section-subtitle {
      color: #c8ced6;
    }
  }

  .outcomes {
    background: #ffffff;

    .outcomes-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .outcome-card {
      padding: 26px 24px;
      border-radius: 22px;
      background: var(--color-surface);
      border: 1px solid var(--color-line);
    }

    .outcome-card-title {
      margin-bottom: 12px;
      color: #0f4c56;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    .outcome-card-desc {
      color: #4b5563;
      font-size: 15px;
      line-height: 1.7;
    }
  }

  .compare {
    background: var(--color-surface);

    .compare-list {
      display: grid;
      gap: 0;
    }

    .compare-item {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      padding: 28px 0;
      border-top: 1px solid #e2e6eb;

      &:last-child {
        border-bottom: 1px solid #e2e6eb;
      }

      @media (min-width: 800px) {
        grid-template-columns: 0.9fr 1.1fr;
        gap: 32px;
        align-items: start;
      }

      .compare-item-title {
        font-size: 22px;
        color: #111827;
        letter-spacing: -0.02em;
      }

      .compare-item-desc {
        color: #4b5563;
        font-size: 16px;
        line-height: 1.7;
      }
    }
  }

  .pillars {
    background: #ffffff;

    .pillars-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .pillar-card {
      padding: 28px;
      border-radius: 24px;
      background: var(--color-surface);
      border: 1px solid var(--color-line);
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
      }

      .pillar-card-index {
        margin-bottom: 24px;
        color: var(--color-accent);
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.08em;
      }

      .pillar-card-title {
        margin-bottom: 12px;
        font-size: 24px;
        color: #111827;
      }

      .pillar-card-desc {
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
      }
    }
  }

  .assurance {
    background: var(--color-ink);

    .assurance-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .assurance-card {
      padding: 26px 22px;
      border-radius: 22px;
      background: rgba(#ffffff, 0.04);
      border: 1px solid rgba(#ffffff, 0.1);
    }

    .assurance-card-index {
      margin-bottom: 22px;
      color: #5fd0dc;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
    }

    .assurance-card-title {
      margin-bottom: 10px;
      color: #ffffff;
      font-size: 22px;
      letter-spacing: -0.02em;
    }

    .assurance-card-desc {
      color: #9aa3af;
      font-size: 14px;
      line-height: 1.7;
    }
  }

  .cta {
    padding: 28px 0 96px;
    background: #ffffff;

    @media (min-width: 768px) {
      padding: 20px 0 120px;
    }

    .cta-panel {
      display: flex;
      flex-direction: column;
      gap: 22px;
      padding: 34px 28px;
      border-radius: 28px;
      background:
        radial-gradient(circle at 100% 0%, rgba(#5fd0dc, 0.18), transparent 34%),
        linear-gradient(135deg, #102033 0%, #0b1522 100%);
      border: 1px solid rgba(#ffffff, 0.08);

      @media (min-width: 800px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 40px 44px;
      }
    }

    .cta-title {
      margin-bottom: 10px;
      color: #ffffff;
      font-size: 30px;
      font-weight: 650;
      letter-spacing: -0.03em;
    }

    .cta-subtitle {
      max-width: 46ch;
      color: rgba(#ffffff, 0.7);
      font-size: 16px;
      line-height: 1.7;
    }

    .cta-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 22px;
      border-radius: 999px;
      font-size: 15px;
      font-weight: 650;
      text-decoration: none;
      white-space: nowrap;
    }

    .btn.btn-light {
      background: #ffffff;
      color: #102033;
    }

    .btn.btn-ghost {
      background: transparent;
      color: #ffffff;
      border: 1px solid rgba(#ffffff, 0.28);
    }
  }
}
</style>
