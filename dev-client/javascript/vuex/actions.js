import * as api from './api'
import * as types from './mutationTypes'

export const getUserInfo = ({ commit }, payload) => {
  api.getUserInfo(payload, info => {
    commit(types.SET_USER_INFO, {
      info
    })
  })
}
