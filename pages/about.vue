<template>
  <div class="about-page">
    <section class="page-hero">
      <div v-motion-slide-visible-once-bottom class="container">
        <h1 class="page-hero-title">{{ $t('about.hero.title') }}</h1>
        <p class="page-hero-subtitle">{{ $t('about.hero.subtitle') }}</p>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section intro">
      <div class="container intro-stack">
        <div class="intro-panel">
          <video
            class="intro-panel-video"
            :src="aboutVideoSrc"
            autoplay
            muted
            loop
            playsinline
            controls
            preload="metadata"
          ></video>
        </div>
        <div class="intro-copy">
          <h2 class="intro-title">{{ $t('about.intro.title') }}</h2>
          <p class="intro-desc">{{ $t('about.intro.p1') }}</p>
          <p class="intro-desc">{{ $t('about.intro.p2') }}</p>
          <p class="intro-desc">{{ $t('about.intro.p3') }}</p>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section values">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('about.values.title') }}</h2>
        </div>
        <div class="values-grid">
          <article v-for="item in values" :key="item.name" class="value-card">
            <h3 class="value-card-title">{{ item.name }}</h3>
            <p class="value-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section stats">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('about.stats.title') }}</h2>
        </div>
        <div class="stats-grid">
          <div v-for="n in 4" :key="n" class="stats-item">
            <p class="stats-item-value">{{ $t(`about.stats.item${n}.value`) }}</p>
            <p class="stats-item-label">{{ $t(`about.stats.item${n}.label`) }}</p>
          </div>
        </div>
      </div>
    </section>

    <section v-motion-slide-visible-once-bottom class="section trust">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('about.trust.title') }}</h2>
          <p class="section-subtitle">{{ $t('about.trust.subtitle') }}</p>
        </div>
        <div class="trust-grid">
          <article v-for="item in trustItems" :key="item.name" class="trust-card">
            <p class="trust-card-name">{{ item.name }}</p>
            <p class="trust-card-desc">{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section id="certificates" v-motion-slide-visible-once-bottom class="section certificates">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ $t('about.certificates.title') }}</h2>
          <p class="section-subtitle">{{ $t('about.certificates.subtitle') }}</p>
        </div>
        <div class="certificates-grid">
          <button
            v-for="(item, index) in certificateItems"
            :key="item.src"
            type="button"
            class="certificate-card"
            @click="openCertificate(index)"
          >
            <AppImage
              class="certificate-card-image"
              :src="item.src"
              :alt="item.alt"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
      </div>
    </section>

    <div
      v-if="certificatePreviewOpen && certificatePreviewItem"
      class="preview"
      @click.self="closeCertificate"
    >
      <div class="preview-inner">
        <button
          type="button"
          class="preview-close"
          :aria-label="$t('about.certificates.close')"
          @click="closeCertificate"
        >
          ×
        </button>
        <button
          type="button"
          class="preview-nav preview-nav-prev"
          :aria-label="$t('common.prev')"
          @click="prevCertificate"
        >
          ‹
        </button>
        <AppImage
          class="preview-image"
          :src="certificatePreviewItem.src"
          :alt="certificatePreviewItem.alt"
          loading="eager"
          decoding="async"
        />
        <button
          type="button"
          class="preview-nav preview-nav-next"
          :aria-label="$t('common.next')"
          @click="nextCertificate"
        >
          ›
        </button>
      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
const { t, locale } = useI18n()
const aboutVideoSrc = `${useSiteUrl()}/cdn/videos/about-intro.mp4`

usePageSeo({
  title: t('seo.about.title'),
  description: t('seo.about.description'),
  path: '/about'
})

const values = computed(() => {
  locale.value
  return [1, 2, 3].map((n) => ({
    name: t(`about.values.items.item${n}.name`),
    desc: t(`about.values.items.item${n}.desc`)
  }))
})


const trustItems = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5, 6].map((n) => ({
    name: t(`about.trust.items.item${n}.name`),
    desc: t(`about.trust.items.item${n}.desc`)
  }))
})

const certificateItems = computed(() => {
  locale.value
  return [1, 2, 3, 4, 5, 6, 7].map((n) => ({
    src: `/images/certificate/${n}.webp`,
    alt: t('about.certificates.alt', { n })
  }))
})

const certificatePreviewOpen = ref(false)
const certificatePreviewIndex = ref(0)
const certificatePreviewItem = computed(() => certificateItems.value[certificatePreviewIndex.value] || null)

function openCertificate(index: number) {
  certificatePreviewIndex.value = index
  certificatePreviewOpen.value = true
}

function closeCertificate() {
  certificatePreviewOpen.value = false
}

function prevCertificate() {
  const total = certificateItems.value.length
  if (!total) return
  certificatePreviewIndex.value = (certificatePreviewIndex.value - 1 + total) % total
}

function nextCertificate() {
  const total = certificateItems.value.length
  if (!total) return
  certificatePreviewIndex.value = (certificatePreviewIndex.value + 1) % total
}

</script>

<style lang="scss" scoped>
.about-page {
  .page-hero {
    padding: 88px 0 72px;
    background:
      radial-gradient(circle at 15% 20%, rgba(#5fd0dc, 0.16), transparent 30%),
      linear-gradient(180deg, var(--color-ink) 0%, var(--color-ink-soft) 100%);
    color: #ffffff;

    .page-hero-title {
      max-width: 12ch;
      margin-bottom: 18px;
      font-size: 56px;
      line-height: 1.08;
      letter-spacing: 0;
    }

    .page-hero-subtitle {
      max-width: 28ch;
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
      max-width: 52ch;
      color: #4b5563;
      font-size: 17px;
      line-height: 1.7;
    }
  }

  .section-header.section-header-light {
    .section-title,
    .section-subtitle {
      color: #ffffff;
    }

    .section-subtitle {
      color: #c8ced6;
    }
  }

  .intro {
    background: #ffffff;

    .intro-stack {
      display: grid;
      grid-template-columns: 1fr;
      gap: 32px;

      @media (min-width: 768px) {
        gap: 40px;
      }
    }

    .intro-copy {
      .intro-title {
        margin-bottom: 20px;
        font-size: 36px;
        letter-spacing: 0;
        color: #111827;
      }

      .intro-desc {
        color: #4b5563;
        font-size: 18px;
        line-height: 1.8;

        & + .intro-desc {
          margin-top: 16px;
        }
      }
    }

    .intro-panel {
      min-width: 0;
      overflow: hidden;
      border-radius: 14px;
      background: #0d1524;

      .intro-panel-video {
        width: 100%;
        aspect-ratio: 16 / 9;
        object-fit: cover;
        display: block;
      }
    }
  }

  .trust {
    background: var(--color-surface);

    .trust-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }
    }

    .trust-card {
      padding: 22px 20px;
      border-radius: 12px;
      background: #ffffff;
      border: 1px solid #e8edf2;
      transition: transform 0.25s ease, border-color 0.25s ease;

      &:hover {
        transform: translateY(-3px);
        border-color: #cfd8e3;
      }

      .trust-card-name {
        margin-bottom: 8px;
        color: #0f4c56;
        font-size: 16px;
        font-weight: 700;
        letter-spacing: 0;
      }

      .trust-card-desc {
        color: #4b5563;
        font-size: 14px;
        line-height: 1.6;
      }
    }
  }

  .certificates {
    background: #ffffff;

    .certificates-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;

      @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
      }

      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
    }

    .certificate-card {
      display: block;
      width: 100%;
      padding: 14px;
      border-radius: 12px;
      background: var(--color-surface);
      border: 1px solid #e8edf2;
      cursor: pointer;
      transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-3px);
        border-color: #cfd8e3;
        box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
      }

      .certificate-card-image {
        display: block;
        width: 100%;
        aspect-ratio: 3 / 4;
        object-fit: contain;
        background: #ffffff;
        border-radius: 12px;
      }
    }
  }

  .preview {
    position: fixed;
    inset: 0;
    z-index: 80;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background:
      linear-gradient(180deg, rgba(7, 11, 18, 0.72) 0%, rgba(7, 11, 18, 0.9) 100%);
    backdrop-filter: blur(10px);

    .preview-inner {
      position: relative;
      width: min(960px, 100%);
      display: flex;
      align-items: center;
      justify-content: center;

      &::after {
        content: '';
        position: absolute;
        left: 8%;
        right: 8%;
        bottom: -18px;
        height: 48px;
        border-radius: 999px;
        background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.45) 0%, transparent 72%);
        pointer-events: none;
        z-index: 0;
      }

      .preview-image {
        position: relative;
        z-index: 1;
        max-width: 100%;
        max-height: 80vh;
        object-fit: contain;
        border-radius: 12px;
        background: #ffffff;
        box-shadow: 0 24px 64px rgba(0, 0, 0, 0.45);
      }

      .preview-close {
        position: absolute;
        top: -40px;
        right: 0;
        z-index: 2;
        color: #ffffff;
        font-size: 32px;
        line-height: 1;
        cursor: pointer;
      }

      .preview-nav {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        z-index: 2;
        width: 44px;
        height: 44px;
        border-radius: 999px;
        background: rgba(#ffffff, 0.16);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        cursor: pointer;
        user-select: none;
      }

      .preview-nav.preview-nav-prev {
        left: -8px;
      }

      .preview-nav.preview-nav-next {
        right: -8px;
      }
    }
  }


  .stats {
    background: #ffffff;

    .stats-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(4, 1fr);
        gap: 18px;
      }
    }

    .stats-item {
      min-width: 0;
      padding: 20px 14px;
      border-radius: 12px;
      background: var(--color-surface);
      border: 1px solid #e8edf2;
      transition: transform 0.25s ease, background 0.25s ease;

      @media (min-width: 900px) {
        padding: 28px 24px;
        border-radius: 12px;
      }

      &:hover {
        transform: translateY(-3px);
        background: #eef2f6;
      }

      .stats-item-value {
        margin-bottom: 10px;
        color: #0f4c56;
        font-size: 26px;
        font-weight: 700;
        letter-spacing: 0;
        line-height: 1.15;
        overflow-wrap: anywhere;

        @media (min-width: 900px) {
          font-size: 36px;
          line-height: 1;
        }
      }

      .stats-item-label {
        color: #4b5563;
        font-size: 13px;
        line-height: 1.5;

        @media (min-width: 900px) {
          font-size: 15px;
        }
      }
    }
  }

  .values {
    background: var(--color-surface);

    .values-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 18px;

      @media (min-width: 900px) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .value-card {
      padding: 28px;
      border-radius: 14px;
      background: #ffffff;
      border: 1px solid var(--color-line);
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      transition: transform 0.25s ease, box-shadow 0.25s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
      }

      .value-card-title {
        margin-bottom: 12px;
        font-size: 22px;
        color: #111827;
      }

      .value-card-desc {
        color: #4b5563;
        font-size: 15px;
        line-height: 1.7;
      }
    }
  }

}
</style>
