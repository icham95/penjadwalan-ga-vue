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

Vue.prototype.$baseApi = 'http://localhost/project/prodi2/api/api.php'
Vue.prototype.$axios = axios

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
    }
  },
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
