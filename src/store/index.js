import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import dictCode from './modules/dictCode'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    account: user,
    base: dictCode,
  },
})

export default store
