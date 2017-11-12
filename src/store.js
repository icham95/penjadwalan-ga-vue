import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    dosen: [],
    userDosen: [],
    fotoDosen: null,
    temp: null
  },
  getters: {
    getTemp (state) {
      return state.temp
    },
    getDosen: state => {
      return state.dosen
    },
    getFotoDosen: state => {
      return state.fotoDosen
    }
  },
  mutations: {
    changeTemp (state, data) {
      state.temp = data
    },
    changeDosen (state, data) {
      state.dosen = data
    },
    changeFotoDosen (state, data) {
      state.fotoDosen = data
    }
  }
})
