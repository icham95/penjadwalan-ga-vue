import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    temp: null
  },
  getters: {
    getTemp (state) {
      return state.temp
    }
  },
  mutations: {
    changeTemp (state, data) {
      console.log(data)
      state.temp = data
    }
  }
})
