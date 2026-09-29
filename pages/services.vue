<template>
  <div class="services-page">
    <section class="page-hero">
      <div v-motion-slide-visible-once-bottom class="container">
        <h1 class="page-hero-title">{{ $t('services.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('services.hero.subtitle') }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section audience">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('services.audience.title') }}</h2>
          <p class="section-subtitle">{{ $t('services.audience.subtitle') }}</p>
        </div>
        <div class="audience-grid">
          <article v-for="item in audience" :key="item.name" class="audience-card">
            <h3 class="audience-card-title">{{ item.name }}</h3>
            <p class="audience-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section list">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('services.list.title') }}</h2>
        </div>
        <div class="services-grid">
          <article v-for="(item, index) in list" :key="item.name" class="service-card">
            <p class="service-card-index">0{{ index + 1 }}</p>
            <h3 class="service-card-title">{{ item.name }}</h3>
            <p class="service-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section process">
      <div class="container">
        <div class="section-header section-header-light">
          <h2 class="section-title">{{ $t('services.process.title') }}</h2>
          <p class="section-subtitle">{{ $t('services.process.subtitle') }}</p>
        </div>
        <ol class="process-flow">
          <li v-for="(item, index) in processSteps" :key="item.step" class="process-step">
            <div class="process-step-card">
              <p class="process-step-index">{{ item.step }}</p>
              <h3 class="process-step-title">{{ item.name }}</h3>
              <p class="process-step-desc">{{ item.desc }}</p>
            </div>
            <span
              v-if="index < processSteps.length - 1"
              class="process-step-connector"
              aria-hidden="true"
            ></span>
          </li>
        </ol>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section checklist">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('services.checklist.title') }}</h2>
          <p class="section-subtitle">{{ $t('services.checklist.subtitle') }}</p>
        </div>
        <ol class="checklist-list">
          <li v-for="(item, index) in checklist" :key="index" class="checklist-item">
            <span class="checklist-item-index">0{{ index + 1 }}</span>
            <p class="checklist-item-text">{{ item }}</p>
          </li>
        </ol>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="cta">
      <div class="container">
        <div class="cta-panel">
          <div class="cta-copy">
            <h2 class="cta-title">{{ $t('services.cta.title') }}</h2>
            <p class="cta-subtitle">{{ $t('services.cta.subtitle') }}</p>
          </div>
          <NuxtLink to="/contact" class="btn btn-light">{{ $t('services.cta.button') }}</NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()

usePageSeo({
  title: t('seo.services.title'),
  description: t('seo.services.description'),
  path: '/services'
})

const list = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    name: t(`services.list.items.item${n}.name`),
    desc: t(`services.list.items.item${n}.desc`)
  }))
})

const processSteps = computed(() => {
  locale.value
  return [1, 2, 3, 4].map((n) => ({
    step: t(`services.process.items.item${n}.step`),
    name: t(`services.process.items.item${n}.name`),
    desc: t(`services.process.items.item${n}.desc`)
  }))
})

const audience = computed(() => {
  locale.value
  return [1, 2, 3].map((n) => ({
    name: t(`services.audience.items.item${n}.name`),
    desc: t(`services.audience.items.item${n}.desc`)
  }))
})

const checklist = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5].map((n) => t(`services.checklist.items.item${n}`))
})
</script>

<style lang="scss" scoped>
.services-page {
  .page-hero {
    padding: 88px 0 72px;
    background:
      radial-gradient(circle at 20% 0%, rgba(#5fd0dc, 0.14), transparent 28%),
      linear-gradient(180deg, var(--color-ink) 0%, var(--color-ink-soft) 100%);
    color: #ffffff;

    .page-hero-title {
      margin-bottom: 18px;
      font-size: 56px;
      line-height: 1.08;
      letter-spacing: 0;
    }

    .page-hero-subtitle {
      max-width: 30ch;
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
      letter-spacing: 0;
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

  .audience {
    background: var(--color-surface);

    .audience-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 16px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .audience-card {
      padding: 26px 24px;
      border-radius: 12px;
      background: #ffffff;
      border: 1px solid var(--color-line);
    }

    .audience-card-title {
      margin-bottom: 12px;
      color: #0f4c56;
      font-size: 20px;
      font-weight: 700;
      letter-spacing: 0;
    }

    .audience-card-desc {
      color: #4b5563;
      font-size: 15px;
      line-height: 1.7;
    }
  }

  .list {
    background: #ffffff;

    .services-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    .service-card {
      padding: 28px;
      border-radius: 12px;
      background: var(--color-surface);
      border: 1px solid var(--color-line);
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
      }

      .service-card-index {
        margin-bottom: 24px;
        color: var(--color-accent);
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.08em;
      }

      .service-card-title {
        margin-bottom: 12px;
        font-size: 24px;
        color: #111827;
        letter-spacing: 0;
      }

      .service-card-desc {
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
      }
    }
  }

  .process {
    background: var(--color-ink);

    .process-flow {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      grid-template-columns: 1fr;
      gap: 14px;

      @media (min-width: 960px) {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 18px;
      }
    }

    .process-step {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .process-step-card {
      height: 100%;
      padding: 26px 22px;
      border-radius: 12px;
      background: rgba(#ffffff, 0.04);
      border: 1px solid rgba(#ffffff, 0.1);
      transition: transform 0.25s ease, background 0.25s ease;

      &:hover {
        transform: translateY(-3px);
        background: rgba(#ffffff, 0.07);
      }
    }

    .process-step-index {
      margin-bottom: 28px;
      color: #5fd0dc;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
    }

    .process-step-title {
      margin-bottom: 10px;
      color: #ffffff;
      font-size: 22px;
      letter-spacing: 0;
    }

    .process-step-desc {
      color: #9aa3af;
      font-size: 14px;
      line-height: 1.7;
    }

    .process-step-connector {
      display: none;
    }

    @media (min-width: 960px) {
      .process-step-connector {
        display: block;
        position: absolute;
        top: 38px;
        right: -14px;
        width: 28px;
        height: 2px;
        background: linear-gradient(90deg, rgba(#5fd0dc, 0.15), rgba(#5fd0dc, 0.75));
      }

      .process-step-connector::after {
        content: '';
        position: absolute;
        right: -1px;
        top: 50%;
        width: 6px;
        height: 6px;
        border-radius: 999px;
        background: #5fd0dc;
        transform: translateY(-50%);
      }
    }
  }

  .checklist {
    background: #ffffff;

    .checklist-list {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .checklist-item {
      display: grid;
      grid-template-columns: 42px 1fr;
      gap: 14px;
      align-items: start;
      padding: 18px 20px;
      border-radius: 12px;
      background: var(--color-surface);
      border: 1px solid var(--color-line);
    }

    .checklist-item-index {
      color: var(--color-accent);
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.08em;
      padding-top: 2px;
    }

    .checklist-item-text {
      color: #1f2937;
      font-size: 15px;
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
      border-radius: 14px;
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
      letter-spacing: 0;
    }

    .cta-subtitle {
      max-width: 42ch;
      color: rgba(#ffffff, 0.7);
      font-size: 16px;
      line-height: 1.7;
    }

    .btn.btn-light {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 14px 22px;
      border-radius: 999px;
      background: #ffffff;
      color: #102033;
      font-size: 15px;
      font-weight: 650;
      text-decoration: none;
      white-space: nowrap;
    }
  }
}
</style>
