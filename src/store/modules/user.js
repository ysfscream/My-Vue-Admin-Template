const USER_LOGIN = 'USER_LOGIN'
const USER_LOGOUT = 'USER_LOGOUT'

const state = {
  user: JSON.parse(localStorage.getItem('user'))
    || JSON.parse(sessionStorage.getItem('user'))
    || {},
}

const mutations = {
  [USER_LOGIN](loginState, user) {
    Object.assign(loginState.user, user)
  },
  [USER_LOGOUT](logoutState) {
    Object.assign(logoutState.user, {})
  },
}

const actions = {
  [USER_LOGIN]({ commit }, payload) {
    if (payload.remember) {
      localStorage.setItem('user', JSON.stringify(payload.user))
    } else {
      sessionStorage.setItem('user', JSON.stringify(payload.user))
    }
    commit(USER_LOGIN, payload.user)
  },
  [USER_LOGOUT]({ commit }) {
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')
    commit(USER_LOGOUT)
  },
}

export default {
  state,
  mutations,
  actions,
}
