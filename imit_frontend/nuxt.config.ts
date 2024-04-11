// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  // ssr: false,
  routeRules: {
    '/': { prerender: true },
    '/home' : { prerender: true },
    '/conferences' : {prerender: true},
    '/login' : {ssr: false},
    '/register' : {ssr: false},
    '/profile': { prerender: true },
    '/addConference' : {ssr: false},
  },
  devServer: {
    port: 4200,
  },
  runtimeConfig: {
    apiSecret: process.env.NUXT_API_SECRET,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE
    }
  },
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      'postcss-import': {},
      'tailwindcss/nesting': 'postcss-nesting',
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  colorMode: {
    preference: 'light'
  },
  modules: ['nuxt-icon', 'nuxt-bootstrap-icons', 'nuxt-quasar-ui', '@nuxt/ui', '@pinia/nuxt',],
  quasar: {
    cssAddon: false,
    plugins: [
      'Notify'
    ],

  },
  hooks: {
    'pages:extend'(pages) {
      pages.push({
        name: 'home',
        path: '/home',
        file: '~/pages/index.vue'
      })
    }
  }
})
