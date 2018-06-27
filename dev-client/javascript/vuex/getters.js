export const someGetter = (state, getters) => id => {
  return state.model.find(item => item.id === id)
}
