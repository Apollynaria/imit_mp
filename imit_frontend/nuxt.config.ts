// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
    cssAddon: false
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
