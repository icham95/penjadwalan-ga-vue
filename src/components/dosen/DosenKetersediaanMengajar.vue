<template>
  <div>
    <v-card>
      <div>
        <v-btn dark icon color="primary" @click.native.prevent="openAdd()">
          <v-icon>create</v-icon>
        </v-btn>
      </div>
      <v-divider></v-divider>
      <v-progress-linear v-bind:indeterminate="loading.get" v-if="loading.get"
      ></v-progress-linear>
      <table >
        <caption>Ketersediaan Mengajar</caption>
        <thead>
          <tr>
            <th scope="col">Tahun Akademik</th>
            <th scope="col">Semester</th>
            <th scope="col">Hari</th>
            <th scope="col">Waktu Mulai</th>
            <th scope="col">Waktu Akhir</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in ketersediaanMengajar" style="margin-bottom:10px;">
            <td data-label="Tahun Akademik"> {{ item.thn_akademik }} </td>
            <td data-label="Semester"> {{ item.semester }} </td>
            <td data-label="Hari"> {{ item.hari }} </td>
            <td data-label="Waktu Mulai"> {{ item.waktu_mulai }} </td>
            <td data-label="Waktu Akhir"> {{ item.waktu_akhir }} </td>
            <td data-label="Actions"> 
              <v-btn dark icon color="red" @click.native.prevent="trash(item, index)">
                <v-icon>delete</v-icon>
              </v-btn>
              <v-btn dark icon color="indigo" @click.native.prevent="openUpdate(item, index)">
                <v-icon>update</v-icon>
              </v-btn>
            </td>
          </tr>
        </tbody>
      </table>
      <v-card-actions>
        <v-btn dark icon color="teal" @click.native.prevent="prev()" :disabled="loading.pagingTotal">
          <v-icon>arrow_left</v-icon>
        </v-btn>
        <div> 
          {{ paging.page }} / {{paging.totalPage}} [ {{paging.total}} ]
        </div>
        <v-btn dark icon color="teal" @click.native.prevent="next()" :disabled="loading.pagingTotal">
          <v-icon>arrow_right</v-icon>
        </v-btn>
        <div>
          tampilkan
          <input type="number" style="border:1px solid black;width:50px;padding:5px;"
          v-model="paging.limit" @change.prevent="get()" @keyup.prevent="get()">
        </div>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card style="">
        <div style="position:absolute;top:0;right:0;">
          <v-btn color="red light-1" :loading="loading.save" :disabled="loading.save"
          icon dark @click.native="cancelAdd()" v-if="crud.save">
            <v-icon> close </v-icon>
          </v-btn>
          <v-btn color="red light-1" :loading="loading.update" :disabled="loading.update"
          icon dark @click.native="cancelUpdate()" v-if="crud.update">
            <v-icon> close </v-icon>
          </v-btn>
        </div>
        <v-card-title>
          <span class="headline">Ketersediaan Mengajar</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-select
                  v-bind:items="settings"
                  v-model="form.thn_akademik"
                  label="Tahun Akademik"
                  item-text="thn_akademik"
                  item-value="thn_akademik"
                  return-object
                  persistent-hint
                  prepend-icon="access_time"
                  :error-messages="errors.collect('form.thn_akademik')"
                  v-validate="'required'"
                  data-vv-name="form.thn_akademik"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-select
                  v-bind:items="semester"
                  v-model="form.semester"
                  label="Semester"
                  return-object
                  persistent-hint
                  prepend-icon="access_time"
                  :error-messages="errors.collect('form.semester')"
                  v-validate="'required'"
                  data-vv-name="form.semester"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-select
                  v-bind:items="hari"
                  v-model="form.hari"
                  :multiple="crud.save"
                  :chips="crud.save"
                  label="Hari"
                  return-object
                  persistent-hint
                  prepend-icon="access_time"
                  :error-messages="errors.collect('form.hari')"
                  v-validate="'required'"
                  data-vv-name="form.hari"
                  required
                ></v-select>
              </v-flex>
              <v-flex xs12 md6>
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Waktu mulai"
                    v-model="form.waktu_mulai"
                    prepend-icon="access_time"
                    readonly
                    :error-messages="errors.collect('form.waktu_mulai')"
                    v-validate="'required'"
                    data-vv-name="form.waktu_mulai"
                    required
                  ></v-text-field>
                  <v-time-picker v-model="form.waktu_mulai" format="24hr" autosave></v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs12 md6>
                <v-menu
                  lazy
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-right="40"
                  max-width="290px"
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Waktu akhir"
                    v-model="form.waktu_akhir"
                    prepend-icon="access_time"
                    readonly
                    :error-messages="errors.collect('form.waktu_akhir')"
                    v-validate="'required'"
                    data-vv-name="form.waktu_akhir"
                    required
                  ></v-text-field>
                  <v-time-picker v-model="form.waktu_akhir" format="24hr" autosave></v-time-picker>
                </v-menu>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="crud.save">
            <v-btn color="teal" :loading="loading.save" :disabled="loading.save"
            dark @click.native="save()">Simpan lalu tutup</v-btn>
            <v-btn color="primary" :loading="loading.save" :disabled="loading.save"
            dark @click.native="save(true)">Simpan tambah lagi</v-btn>
          </div>
          <div v-if="crud.update">
            <v-btn color="indigo" :loading="loading.update" :disabled="loading.update"
            dark @click.native="update()">Update</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      style="z-index:999;"
      :timeout="6000"
      top="top"
      :absolute="true"
      v-model="snackbar.status"
      :multi-line="'multi-line'"
      :vertical="'vertical'"
    >
      {{ snackbar.message }}
      <v-btn flat color="pink" @click.native="snackbar.status = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    $validates: true,
    data () {
      return {
        paging: {
          total: 0,
          limit: 10,
          page: 1,
          totalPage: 0,
          order: 'kd_km'
        },
        crud: {
          save: false,
          update: false
        },
        snackbar: {
          status: false,
          message: null
        },
        time1: null,
        settings: [],
        settingNow: [],
        dosens: [],
        ketersediaanMengajar: [],
        semester: ['genap', 'ganjil'],
        hari: ['senin', 'selasa', 'rabu', 'kamis', 'jum\'at', 'sabtu', 'minggu'],
        loading: {
          get: false,
          save: false,
          settings: false,
          dosen: false,
          pagingTotal: false
        },
        dialog: false,
        form: {
          id: null,
          thn_akademik: null,
          semester: null,
          hari: null,
          waktu_mulai: null,
          waktu_akhir: null,
          nip: null
        }
      }
    },
    methods: {
      openAdd () {
        this.form.thn_akademik = this.settingNow.thn_akademik
        this.form.semester = this.settingNow.semester
        this.crud.save = true
        this.dialog = true
      },
      cancelAdd () {
        this.crud.save = false
        this.reset()
        this.dialog = false
      },
      async save (close = false) {
        this.$validator.validateAll()
        .then(oke => {
          if (oke === true) {
            this.loading.save = true
            let post = {}
            let groupPost = []
            for (let i = 0; i < this.form.hari.length; i++) {
              post = {
                thn_akademik: this.form.thn_akademik,
                semester: this.form.semester,
                hari: this.form.hari[i],
                waktu_mulai: this.form.waktu_mulai,
                waktu_akhir: this.form.waktu_akhir,
                nip: this.$localStorage.get('user').nip
              }
              groupPost.push(post)
            }
            this.$axios.post(this.$baseApi + '/tbl_ketersedian_mengajar', groupPost)
            .then(resp => {
              if (resp !== null) {
                this.snackbar.message = 'Berhasil di menyimpan!'
                this.snackbar.status = true
                this.reset()
                this.get()
                if (close === false) {
                  this.dialog = false
                  this.cancelAdd()
                }
              } else {
                this.snackbar.message = 'Gagal di menyimpan!'
                this.snackbar.status = true
              }
              this.loading.save = false
            })
          }
        })
      },
      openUpdate (item, index) {
        this.crud.update = true
        this.form.id = item.kd_km
        this.form.thn_akademik = item.thn_akademik
        this.form.semester = item.semester
        this.form.hari = item.hari
        this.form.waktu_mulai = item.waktu_mulai
        this.form.waktu_akhir = item.waktu_akhir
        this.dialog = true
      },
      cancelUpdate () {
        this.reset()
        this.crud.update = false
        this.form.thn_akademik = this.settingNow.thn_akademik
        this.form.semester = this.settingNow.semester
        this.dialog = false
      },
      update () {
        this.loading.update = true
        let put = {
          thn_akademik: this.form.thn_akademik,
          semester: this.form.semester,
          hari: this.form.hari,
          waktu_mulai: this.form.waktu_mulai,
          waktu_akhir: this.form.waktu_akhir
        }
        this.$axios.put(this.$baseApi + '/tbl_ketersedian_mengajar/' + this.form.id, put)
        .then(resp => {
          this.snackbar.message = 'update berhasil'
          this.snackbar.status = true
          this.loading.update = false
          this.dialog = false
          this.crud.update = false
          this.get()
        })
      },
      trash (item, index) {
        this.$swal({
          title: 'Yakin ingin menghapus ?',
          text: 'Data tidak bisa dikembalikan.',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(() => {
          this.loading.get = true
          this.$axios.delete(this.$baseApi + '/tbl_ketersedian_mengajar/' + item.kd_km)
          .then(resp => {
            this.get()
          })
          this.$swal(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }).catch(this.$swal.noop)
      },
      get (fillPaging = false) {
        this.loading.get = true
        this.$axios.get(this.$baseApi + `/tbl_ketersedian_mengajar?order=${this.paging.order},desc&page=${this.paging.page},${this.paging.limit}`)
        .then(resp => {
          let data = this.modData(resp.data.tbl_ketersedian_mengajar)
          this.ketersediaanMengajar = data
          if (fillPaging === false) {
            this.fillPaging()
          }
          this.loading.get = false
        })
      },
      getSetting () {
        this.$axios.get(this.$baseApi + '/setting')
        .then(resp => {
          let data = this.modData(resp.data.setting)
          this.settings = data
          let now = new Date()
          let year = now.getFullYear() + '/' + (now.getFullYear() + 1)
          let month = now.getMonth() + 1
          // ganjil
          let semester = ''
          if (month >= 9) {
            // september sampai januari
            semester = 'ganjil'
          } else if (month > 1 && month < 9) {
            // februari sampai agustus
            semester = 'genap'
          }
          let settingNow = data.find(elem => {
            if (elem.thn_akademik === year && elem.semester === semester) {
              return elem
            }
          })
          this.settingNow = settingNow
          this.form.thn_akademik = settingNow.thn_akademik
          this.form.semester = settingNow.semester
        })
      },
      getDosen () {},
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
      reset () {
        this.form.hari = null
        this.form.id = null
        this.form.waktu_mulai = null
        this.form.waktu_akhir = null
        this.$validator.clean()
      },
      fillPaging () {
        let totalPage = this.paging.total / this.paging.limit
        this.paging.totalPage = Math.ceil(totalPage)
      },
      getTotal () {
        this.loading.pagingTotal = true
        this.$axios.get(this.$baseApi + '/tbl_ketersedian_mengajar')
        .then(resp => {
          let records = resp.data.tbl_ketersedian_mengajar.records
          this.paging.total = records.length
          this.fillPaging()
          this.loading.pagingTotal = false
        })
      },
      next () {
        if (this.paging.page > 0 && this.paging.page < this.paging.totalPage) {
          this.paging.page += 1
          this.get()
        }
      },
      prev () {
        if (this.paging.page > 1 && this.paging.page <= this.paging.totalPage) {
          this.paging.page -= 1
          this.get()
        }
      }
    },
    mounted () {
      this.get(true)
      this.getTotal()
      this.getSetting()
    }
  }
</script>

<style lang="">
body {
  font-family: "Open Sans", sans-serif;
  line-height: 1.25;
}
table {
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  width: 100%;
  table-layout: fixed;
}
table caption {
  font-size: 1.5em;
  margin: .5em 0 .75em;
}
table tr {
  background: #f8f8f8;
  border: 1px solid #ddd;
  padding: .35em;
}
table th,
table td {
  padding: .625em;
  text-align: center;
}
table th {
  font-size: .85em;
  letter-spacing: .1em;
  text-transform: uppercase;
}
@media screen and (max-width: 600px) {
  table {
    border: 0;
  }
  table caption {
    font-size: 1.3em;
  }
  table thead {
    border: none;
    clip: rect(0 0 0 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
  }
  table tr {
    border-bottom: 3px solid #ddd;
    display: block;
    margin-bottom: .625em;
  }
  table td {
    border-bottom: 1px solid #ddd;
    display: block;
    font-size: .8em;
    text-align: right;
  }
  table td:before {
    /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
    content: attr(data-label);
    float: left;
    font-weight: bold;
    text-transform: uppercase;
  }
  table td:last-child {
    border-bottom: 0;
  }
}  
</style>
