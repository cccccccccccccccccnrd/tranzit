const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=no' },
      { hid: 'description', name: 'description', content: 'Tranzit House has been functioning as a cultural institution since 1997 in the location of a former synagogue. It is run by Tranzit Foundation which was founded with the purpose of renovating the building and turning it to a contemporary art center.' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: false,

  /*
  ** Global CSS
  */
  css: [
  ],

  router: {
    middleware: 'i18n'
  },

  env: {
    API_URL: 'https://tranzit-backend.cnrd.computer',
    OWN_API_URL: 'https://archive.tranzithouse.ro'
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/i18n.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
