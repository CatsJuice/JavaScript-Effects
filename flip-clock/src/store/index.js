import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    publicList: [],
    privateList: [],
    activePageIndex: 0,
  },
  mutations: {
    "UPDATE"(state, {
      constant,
      value
    }) {
      state[constant] = value
    }
  },
  actions: {
  },
  modules: {
  }
})
