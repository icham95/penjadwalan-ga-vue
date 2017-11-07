import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import LoginAdmin from '@/components/admin/LoginAdmin.vue'
import AdminDefault from '@/components/admin/AdminDefault.vue'
import AdminDashboard from '@/components/admin/AdminDashboard.vue'
import AdminSettingSemester from '@/components/admin/AdminSettingSemester.vue'
import AdminProgramStudi from '@/components/admin/AdminProgramStudi.vue'
import AdminJenjang from '@/components/admin/AdminJenjang.vue'
import test from '@/components/admin/test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/login/admin',
      name: 'LoginAdmin',
      component: LoginAdmin
    },
    {
      path: '/admin',
      name: 'AdminDefault',
      component: AdminDefault,
      children: [
        {
          path: 'dashboard',
          name: 'AdminDashboard',
          component: AdminDashboard
        },
        {
          path: 'setting-semester',
          name: 'AdminSettingSemester',
          component: AdminSettingSemester
        },
        {
          path: 'program-studi',
          name: 'AdminProgramStudi',
          component: AdminProgramStudi
        },
        {
          path: 'jenjang',
          name: 'AdminJenjang',
          component: AdminJenjang
        },
        {
          path: 'test',
          name: 'test',
          component: test
        }
      ]
    }
  ]
})
