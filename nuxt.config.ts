export default defineNuxtConfig({
  compatibilityDate: '2026-09-23',
  modules: ['@nuxt/ui', '@nuxtjs/i18n', 'nitro-cloudflare-dev'],
  colorMode: {
    preference: 'light',
    fallback: 'light'
  },
  runtimeConfig: {
    adminApiToken: ''
  },
  routeRules: {
    '/admin/**': { ssr: false }
  },
  css: ['~/assets/css/main.css'],
  typescript: {
    typeCheck: false,
    strict: true
  },
  app: {
    head: {
      title: 'Cerotd | Shandong Lubrication Technology',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Cerotd (Shandong) Lubrication Technology Co., Ltd. — lubricants and greases manufacturer' }
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/images/logo.webp' },
      ]
    }
  },
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'zh', language: 'zh-CN', name: '中文', file: 'zh.json' }
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'cerotd_locale',
      redirectOn: 'all',
      alwaysRedirect: false,
      fallbackLocale: 'en'
    },
    vueI18n: 'i18n.config.ts'
  }
})
