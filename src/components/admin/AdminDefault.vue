<template>
  <v-app>
    <v-navigation-drawer
      persistent
      clipped
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-list>
        <v-list-tile
          style="width:100%;"
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click.prevent = "$router.push('/admin/' + item.push)"
        >
          <v-list-tile-action>
            <v-icon style="color:black;" v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title style="color:black;" v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          value="true"
          @click.prevent = "logout"
        >
          <v-list-tile-action>
            <v-icon style="color:black;" light>arrow_left</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title style="color:black;"> Logout </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar fixed app clipped-left color="primary" dark>
      <v-toolbar-side-icon @click.stop="drawer = !drawer" dark></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    
    <main>
      <v-content>
        <v-container fluid>
          <v-slide-y-transition mode="out-in">
            <v-layout>
              <router-view></router-view>
              </blockquote>
            </v-layout>
          </v-slide-y-transition>
        </v-container>
      </v-content>
    </main>

    <v-footer fixed app>
      <span>&copy; 2017</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { icon: 'home', push: 'dashboard', title: 'Dashboard' },
          { icon: 'school', push: 'user', title: 'Edit User' },
          { icon: 'school', push: 'setting-semester', title: 'Setting Semester' },
          { icon: 'school', push: 'program-studi', title: 'Program Studi' },
          { icon: 'school', push: 'jenjang', title: 'Jenjang' },
          { icon: 'school', push: 'kelas', title: 'Kelas' }
        ],
        title: 'Admin'
      }
    },
    methods: {
      logout () {
        this.$axios.defaults.headers.common['Authorization'] = null
        this.$localStorage.set('token', null)
        this.$localStorage.set('logged', 0)
        this.$router.push('/login/admin')
      }
    },
    mounted () {
      let logged = this.$localStorage.get('logged')
      if (logged === 1) {
        // this.$router.push('/login/admin')
      } else if (logged === 2) {
        this.$router.push('/dosen/dashboard')
      } else {
        this.$router.push('/')
      }
    }
  }
</script>
