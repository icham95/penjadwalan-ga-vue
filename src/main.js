// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import './stylus/main.styl'
import axios from 'axios'

import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import VueSweetalert2 from 'vue-sweetalert2'
import VueLocalStorage from 'vue-localstorage'
import store from '@/store.js'

// dev
Vue.prototype.$baseApi = 'http://localhost/project/prodi2/api/api.php'
// production
// Vue.prototype.$baseApi = window.$baseApi
// Vue.prototype.$baseApi = window.location.origin + window.location.pathname + '/api/api.php'
Vue.prototype.$axios = axios.create()
Vue.prototype.$axiosPublic = axios.create()

Vue.use(VueLocalStorage)
Vue.use(VueSweetalert2)
Vue.use(VeeValidate)

Vue.use(Vuetify)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  localStorage: {
    helper: {
      type: Object,
      default: null
    },
    user: {
      type: Object,
      default: null
    },
    logged: {
      type: Number,
      default: 0
    },
    tokenAdmin: {
      type: String,
      default: null
    },
    tokenDosen: {
      type: String,
      default: null
    }
  },
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  beforeCreate () {
    let logged = this.$localStorage.get('logged')
    if (logged === 1) {
      this.$axios.defaults.headers.common['Authorization'] = this.$localStorage.get('tokenAdmin')
    } else if (logged === 2) {
      this.$axios.defaults.headers.common['Authorization'] = this.$localStorage.get('tokenDosen')
    } else {
      this.$axios.defaults.headers.common['Authorization'] = null
    }
    this.$axios.interceptors.response.use(resp => {
      return resp
    }, err => {
      let logged = this.$localStorage.get('logged')
      if (logged === 1) {
        this.$router.push('/login/admin')
      } else if (logged === 2) {
        this.$router.push('/login/dosen')
      } else {
        this.$router.push('/')
      }
      return Promise.reject(err)
    })
  }
})
