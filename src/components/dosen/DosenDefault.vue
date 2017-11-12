<template>
  <v-app>
    <v-navigation-drawer
      persistent
      clipped
      v-model="drawer"
      enable-resize-watcher
      app
    >
      <v-container>
        <v-layout>
          <v-flex xs4>
            <v-avatar
              size="75px"
              class="grey lighten-4"
            >
            <img :src="getFotoDosen" alt="">
            </v-avatar>
          </v-flex>
          <v-flex xs8>
            Selamat datang,
            <div>
              <b>{{ dosen.nama }}</b>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile
          style="width:100%;"
          value="true"
          v-for="(item, i) in items"
          :key="i"
          @click.prevent = "$router.push('/dosen/' + item.push)"
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
  import {mapGetters} from 'vuex'
  export default {
    data () {
      return {
        drawer: true,
        items: [
          { icon: 'home', push: 'dashboard', title: 'Dashboard' },
          { icon: 'school', push: 'ketersediaan-mengajar', title: 'Ketersediaan Mengajar' },
          { icon: 'school', push: 'lihat-jadwal', title: 'Lihat Jadwal' },
          { icon: 'account_box', push: 'profile', title: 'Profile' }
        ],
        title: 'Dosen'
      }
    },
    methods: {
      getDosen () {
        let nip = this.$localStorage.get('user').nip
        this.$axios.get(this.$baseApi + '/dosen?filter=nip,eq,' + nip)
        .then(resp => {
          let dosen = this.modData(resp.data.dosen)[0]
          this.$store.commit('changeDosen', dosen)
        })
      },
      modData (data) {
        let modData = []
        for (let i = 0; i < data.records.length; i++) {
          modData[i] = []
          for (let a = 0; a < data.records[i].length; a++) {
            modData[i][data.columns[a]] = data.records[i][a]
          }
        }
        return modData
      },
      logout () {
        this.$axios.defaults.headers.common['Authorization'] = null
        this.$localStorage.set('tokenDosen', null)
        this.$localStorage.set('logged', 0)
        this.$router.push('/login/dosen')
      }
    },
    computed: {
      ...mapGetters([
        'trigerChangeFotoDosen',
        'getFotoDosen'
      ]),
      ...mapGetters({
        dosen: 'getDosen'
      })
    },
    mounted () {
      let foto = this.$baseApi.replace('api.php', '') + '/foto/' + this.$localStorage.get('user').foto + '?' + new Date().getTime()
      this.$store.commit('changeFotoDosen', foto)
      let logged = this.$localStorage.get('logged')
      if (logged === 1) {
        this.$router.push('/admin/dashboard')
      } else if (logged === 2) {
        // this.$router.push('/login/dosen')
      } else {
        this.$router.push('/')
      }
      this.getDosen()
    }
  }
</script>
