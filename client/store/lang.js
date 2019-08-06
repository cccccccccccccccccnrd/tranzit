export const state = () => ({
  locales: ['en', 'hu', 'ro'].sort(() => 0.5 - Math.random()),
  locale: 'en'
})

export const mutations = {
  set (state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}

export const getters = {
  locales: (state) => {
    return state.locales
  },
  locale: (state) => {
    return state.locale
  }
}