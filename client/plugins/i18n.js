import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export default ({ app, store }) => {
  app.i18n = new VueI18n({
    locale: store.getters['lang/locale'],
    fallbackLocale: 'en',
    messages: {
      en: require('@/lang/en.json'),
      hu: require('@/lang/hu.json'),
      ro: require('@/lang/ro.json')
    }
  })

  app.i18n.path = (link) => {
    return `/${app.i18n.locale}/${link}`
  }
}
