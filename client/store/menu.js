export const state = () => ({
  open: false
})

export const mutations = {
  toggle (state) {
    state.open = !state.open
  },
  close (state) {
    state.open = false
  }
}

export const getters = {
  isOpen: (state) => {
    return state.open
  }
}
