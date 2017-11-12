<template>
  <v-layout row wrap>
    <v-flex xs10 md2 style="padding:10px;">
      <div style="position:relative;">
        <a href="" style="position:absolute;right:0;"
        @click.prevent="(openForm.foto ? openForm.foto = false : openForm.foto = true)"> 
          <small>{{ openForm.foto ? 'Cancel' : 'Ganti foto' }}</small> 
        </a>
        <div v-if="openForm.foto == false">
          <v-avatar
            size="125px"
            class="grey lighten-4"
          >
            <img :src="fotoDosen" alt="">
          </v-avatar>
        </div>
        <div v-else>
          <v-avatar
            size="125px"
            class="grey lighten-4"
          >
            <img :src="form.foto.change" alt="" v-if="form.foto.change != null">
          </v-avatar>
          <v-progress-linear v-bind:indeterminate="loading.updateFoto" 
          v-if="loading.updateFoto">
          </v-progress-linear>
          <Upload-button title="Pilih Foto" :selectedCallback="onChangeFoto">
          </Upload-button>
          <v-btn small color="primary" block
          @click.native.prevent="changeFoto()">
            Proses
          </v-btn>
        </div>
      </div>
    </v-flex>

    <v-flex xs10 md4 style="padding:10px;">
      <v-card>
        <v-card-title style="position:relative;">
          <h5>Login</h5>
          <v-btn icon dark small absolute right
          :color="(openForm.login ? 'purple' : 'indigo')"
          :loading="loading.updateLogin"
          @click.native.prevent="(openForm.login ? openForm.login = false : openForm.login = true)">
            <v-icon>update</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="padding">
            <div v-if="openForm.login == false">
              <b>Username</b>
              <div>{{ $localStorage.get('user').username }}</div>
            </div>
            <div v-else>
              <v-text-field 
              label="Username"
              v-model="form.login.username">
              </v-text-field>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="padding">
            <div v-if="openForm.login == false">
              <b>Password</b> 
              <a href="" @click.prevent="(showPassword ? showPassword = false : showPassword = true)">
                <small>{{ (showPassword ? 'Tutup' : 'Tampilkan') }}</small> 
              </a>
              <div v-if="showPassword">{{ $localStorage.get('user').password }}</div>
                <div v-else>
                  <span v-for="i in $localStorage.get('user').password.length">
                    *
                  </span>
                </div>
            </div>
            <div v-else>
              <v-text-field
              label="Password"
              v-model="form.login.password"
              type="password"
              :append-icon="showPassword1 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (showPassword1 = !showPassword1)"
              :type="showPassword1 ? 'password' : 'text'">
              </v-text-field>
              <v-text-field
              label="Password Retype"
              v-model="form.login.passwordRetype"
              type="password"
              persistent-hint
              hint="Jika tidak update password, biarkan."
              :append-icon="showPassword2 ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (showPassword2 = !showPassword2)"
              :type="showPassword2 ? 'password' : 'text'">
              </v-text-field>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions v-if="openForm.login">
          <v-btn dark color="primary" @click.native.prevent="updateLogin()">
            Update
          </v-btn>
          <v-btn color="yellow dark-4" @click.native.prevent="cancelUpdateLogin()">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>

    <v-flex xs10 md4 style="padding:10px;">
      <v-card>
        <v-card-title style="position:relative;">
          <h5>Detail</h5>
          <v-btn icon dark small absolute right hint="asd"
          :color="(openForm.detail ? 'purple' : 'indigo')"
          :loading="loading.updateDetail"
          @click.native.prevent="(openForm.detail ? openForm.detail = false : openForm.detail = true)">
            <v-icon>update</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <div class="padding">
            <div>
              <b>Nip</b>
              <div>
                {{ isNotNull(dosen.nip) }}
              </div>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="padding">
            <div v-if="openForm.detail == false">
              <b>Nama</b>
              <div>
                {{ isNotNull(dosen.nama) }}
              </div>
            </div>
            <div v-else>
              <v-text-field
              label="Nama" v-model="form.detail.nama">
              </v-text-field>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="padding">
            <div v-if="openForm.detail == false">
              <b>Alamat</b>
              <div>
                {{ isNotNull(dosen.alamat) }} {{ isNotNull(dosen.kodepos) }}
              </div>
            </div>
            <div v-else>
              <v-text-field
              textarea
              label="Alamat" v-model="form.detail.alamat">
              </v-text-field>
            </div>
          </div>
          <v-divider></v-divider>
          <div class="padding">
            <div v-if="openForm.detail == false">
              <b>Kontak</b>
              <div>
                {{ isNotNull(dosen.handphone) }}
              </div>
            </div>
            <div v-else>
              <v-text-field
              label="kontak" v-model="form.detail.kontak">
              </v-text-field>
            </div>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions v-if="openForm.detail">
          <v-btn color="primary" dark @click.native.prevent="updateDetail()">
            Update
          </v-btn>
          <v-btn color="yellow dark-4" @click.native.prevent="cancelUpdateDetail()">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {mapGetters} from 'vuex'
  import UploadButton from '@/components/include/UploadButton.vue'
  export default {
    components: {
      UploadButton
    },
    data () {
      return {
        loading: {
          updateDetail: false,
          updateLogin: false,
          updateFoto: false
        },
        form: {
          foto: {
            change: null,
            result: null,
            name: null
          },
          login: {
            username: null,
            password: null,
            passwordRetype: null
          },
          detail: {
            nama: null,
            alamat: null,
            kontak: null
          }
        },
        openForm: {
          detail: false,
          login: false,
          foto: false
        },
        showPassword: false,
        showPassword1: false,
        showPassword2: false
      }
    },
    methods: {
      isNotNull (text) {
        if (text === null || text === '') {
          return '-'
        }
        return text
      },
      fillForm () {
        this.form.login.username = this.$localStorage.get('user').username
        this.form.login.password = this.$localStorage.get('user').password
        this.form.detail.nama = this.dosen.nama
        this.form.detail.alamat = this.dosen.alamat
        this.form.detail.kontak = this.dosen.handphone
        this.foto = this.$baseApi.replace('api.php', '') + '/foto/' + this.$localStorage.get('user').foto + '?' + new Date().getTime()
      },
      updateDetail () {
        this.loading.updateDetail = true
        let put = {
          nama: this.form.detail.nama,
          alamat: this.form.detail.alamat,
          handphone: this.form.detail.kontak
        }
        this.$axios.put(this.$baseApi + '/dosen/' + this.dosen.nip, put)
        .then(resp => {
          this.loading.updateDetail = false
          if (resp.data !== null) {
            this.$swal('Sukses', 'update berhasil', 'success')
            this.getDosen()
            this.openForm.detail = false
          } else {
            this.$swal('Error', 'update gagal', 'error')
          }
        })
        .catch(err => {
          console.log(err)
          this.$swal('Error', 'update gagal', 'error')
          this.loading.updateDetail = false
        })
      },
      cancelUpdateDetail () {
        this.fillForm()
        this.openForm.detail = false
      },
      updateLogin () {
        let passwordRetype = this.form.login.passwordRetype
        let password = this.form.login.password
        let username = this.form.login.username
        let put = {username}
        let havePassword = false
        let error = 0
        if (passwordRetype !== null) {
          if (passwordRetype === password) {
            put.password = password
            havePassword = true
          } else {
            error += 1
            this.$swal('Error', 'Password tidak sama dengan password Retype.', 'error')
          }
        }
        if (error === 0) {
          this.$axios.put(this.$baseApi + '/tbl_user_dosen/' + this.$localStorage.get('user').kd_dosen, put)
          .then(resp => {
            console.log(resp)
            if (resp.data !== null) {
              let user = this.$localStorage.get('user')
              user.username = username
              if (havePassword === true) {
                user.password = password
              }
              this.$localStorage.set('user', user)
              this.openForm.login = false
              this.$swal('Sukses', 'Update berhasil.', 'success')
            }
          })
        }
      },
      cancelUpdateLogin () {
        this.fillForm()
        this.openForm.login = false
      },
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
      onChangeFoto (img) {
        let reader = new FileReader()
        if (img.type !== 'image/png') {
          this.$swal('Error', 'Format foto harus png', 'error')
        } else {
          this.form.foto.name = 'avatar-' + this.$localStorage.get('user').kd_dosen + '.png'
          reader.addEventListener('load', () => {
            this.form.foto.result = reader.result.replace('data:image/png;base64,', '')
            this.form.foto.change = reader.result
          })
          reader.readAsDataURL(img)
        }
      },
      changeFoto () {
        if (this.form.foto.change !== null) {
          this.loading.updateFoto = true
          let url = this.$baseApi + '/tbl_user_dosen/' + this.$localStorage.get('user').kd_dosen + '?upload-foto-dosen'
          let put = {
            foto: this.form.foto.name,
            uploadFotoDosen: this.form.foto.result
          }
          this.$axios.put(url, put)
          .then(resp => {
            if (resp.data !== null) {
              let user = this.$localStorage.get('user')
              user.foto = put.foto
              this.$localStorage.set('user', user)
              let foto = this.$baseApi.replace('api.php', '') + '/foto/' + this.$localStorage.get('user').foto + '?' + new Date().getTime()
              this.$store.commit('changeFotoDosen', foto)
              this.form.foto = {
                change: null,
                result: null,
                name: null
              }
              this.openForm.foto = false
              this.$swal('Sukses', 'Update foto berhasil.', 'success')
            }
            this.loading.updateFoto = false
          })
        } else {
          this.$swal('Error', 'Silahkan pilih foto terlebih dahulu.', 'error')
        }
      }
    },
    computed: {
      ...mapGetters({
        dosen: 'getDosen',
        fotoDosen: 'getFotoDosen'
      })
    },
    watch: {
      dosen () {
        this.fillForm()
      }
    },
    mounted () {
      this.fillForm()
    }
  }
</script>

<style scoped>
h5 {
  padding:0;
  margin:0;
}
.padding {
  padding:10px;
}
</style>