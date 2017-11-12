import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello.vue'
import LoginAdmin from '@/components/admin/LoginAdmin.vue'
import AdminDefault from '@/components/admin/AdminDefault.vue'
import AdminDashboard from '@/components/admin/AdminDashboard.vue'
import AdminSettingSemester from '@/components/admin/AdminSettingSemester.vue'
import AdminProgramStudi from '@/components/admin/AdminProgramStudi.vue'
import AdminJenjang from '@/components/admin/AdminJenjang.vue'
import AdminKelas from '@/components/admin/AdminKelas.vue'
import AdminUser from '@/components/admin/AdminUser.vue'
import test from '@/components/admin/test.vue'
import LoginDosen from '@/components/dosen/LoginDosen.vue'
import DosenDefault from '@/components/dosen/DosenDefault.vue'
import DosenDashboard from '@/components/dosen/DosenDashboard.vue'
import DosenKetersediaanMengajar from '@/components/dosen/DosenKetersediaanMengajar.vue'
import DosenLihatJadwal from '@/components/dosen/DosenLihatJadwal.vue'
import DosenProfile from '@/components/dosen/DosenProfile.vue'

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
      path: '/login/dosen',
      name: 'LoginDosen',
      component: LoginDosen
    },
    {
      path: '/dosen',
      name: 'DosenDefault',
      component: DosenDefault,
      children: [
        {
          path: 'dashboard',
          name: 'DosenDashboard',
          component: DosenDashboard
        },
        {
          path: 'ketersediaan-mengajar',
          name: 'DosenKetersediaanMengajar',
          component: DosenKetersediaanMengajar
        },
        {
          path: 'lihat-jadwal',
          name: 'DosenLihatJadwal',
          component: DosenLihatJadwal
        },
        {
          path: 'profile',
          name: 'DosenProfile',
          component: DosenProfile
        }
      ]
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
          path: 'kelas',
          name: 'AdminKelas',
          component: AdminKelas
        },
        {
          path: 'user',
          name: 'AdminUser',
          component: AdminUser
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
