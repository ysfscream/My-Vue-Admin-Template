import { httpGet } from '@/functions/api'

const state = {
  dictCode: JSON.parse(localStorage.getItem('dictCode')) || {},
}

const GET_DICT_CODE = 'GET_DICT_CODE'
const RECEIVE_DICT_CODE = 'RECEIVE_DICT_CODE'

const actions = {
  [GET_DICT_CODE]({ commit }) {
    return new Promise((resolve) => {
      httpGet('/select/code').then((response) => {
        commit(RECEIVE_DICT_CODE, response.data)
        localStorage.setItem('dictCode', JSON.stringify(response.data))
        resolve(response.data)
      })
    })
  },
}

const mutations = {
  /* eslint-disable */
  [RECEIVE_DICT_CODE](state, dictCode) {
    Object.assign(state.dictCode, dictCode)
  },
}

export default {
  state,
  actions,
  mutations,
}
