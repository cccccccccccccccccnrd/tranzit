export default function ({ isHMR, app, store, route, params, error, redirect }) {
  if (isHMR) { return }
  console.log('ahllo')

  const defaultLocale = app.i18n.fallbackLocale
  const locales = store.getters['lang/locales']
  const locale = params.lang || defaultLocale

  if (route.fullPath === '/') {
    const random = locales[Math.floor(Math.random() * locales.length)]
    redirect(`/${random}`)
  }

  if (!locales.includes(locale)) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }

  store.commit('lang/set', locale)
  app.i18n.locale = store.getters['lang/locale']
}