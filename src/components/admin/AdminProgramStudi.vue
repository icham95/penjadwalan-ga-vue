<template>
  <div>
    <v-card>
      <v-progress-linear v-bind:indeterminate="loading" v-if="loading"></v-progress-linear>
      <table style="position:relative;">
        <div style="position:absolute;top:0;left:0;">
          <v-btn color="primary" icon ripple
          @click.native.prevent="get((paging.page - 1))">
            <v-icon color="white">keyboard_arrow_left</v-icon>
          </v-btn>
          <v-badge>
            {{paging.page}}
          </v-badge>
          <v-btn color="primary" icon ripple
          @click.native.prevent="get((paging.page + 1))">
            <v-icon color="white">keyboard_arrow_right</v-icon>
          </v-btn>
        </div>
        <div style="position:absolute;top:0;right:0;">
          <v-btn color="primary" icon ripple :disabled="saveForm"
          @click.native.prevent="add">
            <v-icon color="white">create</v-icon>
          </v-btn>
        </div>
        <caption>Program Studi</caption>
        <thead>
          <tr>
            <th scope="col" v-for="item in headers"> {{item.replace('_', ' ')}} </th>
            <th scope="col"> Action </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items">
            <td :data-label="headers[indexSub]" v-for="(sub, indexSub) in item.data" v-if="item.edit == false">
              {{(sub == null ? '-' : sub)}}
            </td>
            <td :data-label="headers[indexSub]" v-for="(sub, indexSub) in item.data" v-if="item.edit" >
              <!-- edit save -->
              <v-text-field v-if="headers[indexSub] != 'kd_progstudi'"
              :error-messages="errors.collect(headers[indexSub])"
              v-validate="rules(headers[indexSub])"
              :data-vv-name="headers[indexSub]"
              required
              :label="headers[indexSub]"
              v-model="item.data[indexSub]">
              </v-text-field>
              <div v-if="headers[indexSub] == 'kd_progstudi'" style="color:purple;">
                Auto
              </div>
            </td>
            <td data-label="Actions">
              <div v-if="item.edit">
                <!-- edit update -->
                <v-btn icon color="teal" small ripple @click.native.prevent="update(item, index)"
                v-if="item.data[0] != null">
                  <v-icon color="white"> save </v-icon>
                </v-btn> 
                <v-btn icon color="red" small ripple @click.native.prevent="cancelUpdate(item, index)"
                v-if="item.data[0] != null"> 
                  <v-icon color="white"> cancel </v-icon>
                </v-btn> 
                <!-- edit save -->
                <v-btn icon color="teal" small ripple @click.native.prevent="save(item, index)"
                v-if="item.data[0] == null">
                  <v-icon color="white"> save </v-icon>
                </v-btn> 
                <v-btn icon color="red" small ripple @click.native.prevent="cancelAdd(index)"
                v-if="item.data[0] == null"> 
                  <v-icon color="white"> cancel </v-icon>
                </v-btn> 
              </div>
              <div v-if="item.edit == false">
                <v-btn icon color="red" small ripple @click.native.prevent="trash(item, index)"> 
                  <v-icon color="white"> delete </v-icon>
                </v-btn> 
                <v-btn icon color="pink" small ripple @click.native.prevent = "edit(item, index)"> 
                  <v-icon color="white"> edit </v-icon>
                </v-btn> 
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </v-card>
  </div>
</template>

<script>
  export default {
    $validates: true,
    data () {
      return {
        tempFormUpdate: null,
        saveForm: false,
        loading: false,
        headers: [],
        items: [],
        paging: {
          page: 1,
          limit: 5
        }
      }
    },
    methods: {
      rules (key) {
        let rule = 'required'
        if (key === 'nama_progstudi') {
          rule += ''
        }
        if (key === 'name_progstudi') {
          rule += ''
        }
        if (key === 'nama_singkat') {
          rule += ''
        }
        return rule
      },
      add () {
        this.saveForm = true
        let temp = []
        temp.open = false
        temp.edit = true
        temp.data = []
        for (let i = 0; i < this.headers.length; i++) {
          temp.data[i] = null
        }
        this.items.unshift(temp)
      },
      cancelAdd (index) {
        this.saveForm = false
        this.items.splice(index, 1)
      },
      save (item) {
        this.$validator.validateAll()
        .then(resp => {
          if (resp === true) {
            let post = {}
            for (let i = 0; i < this.headers.length; i++) {
              if (this.headers[i] !== 'kd_progstudi') {
                post[this.headers[i]] = item.data[i]
              }
            }
            this.$axios.post(this.$baseApi + '/program_studi', post)
            .then(resp => {
              if (resp.data !== null) {
                this.$swal(
                  'Sukses',
                  'Data berhasil di simpan',
                  'success'
                )
                item.data[0] = resp.data
                item.edit = false
                this.saveForm = false
              } else {
                this.$swal(
                  'Gagal',
                  'Data gagal di simpan',
                  'error'
                )
              }
            })
            .catch(err => {
              console.log(err)
              alert(err)
            })
          }
        })
      },
      trash (item, index) {
        this.$swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
          showLoaderOnConfirm: true,
          allowOutsideClick: false,
          preConfirm: res => {
            return new Promise((resolve, reject) => {
              this.$axios.delete(this.$baseApi + '/program_studi/' + item.data[0])
              .then(res => {
                if (res.status === 200 && res.data !== null && res.data !== 0) {
                  this.items.splice(index, 1)
                  resolve()
                }
                reject('gagal menghapus data')
              })
            })
          }
        }).then(res => {
          this.$swal(
            'Deleted!',
            'Data berhasil di hapus.',
            'success'
          )
        })
        .catch(this.$swal.noop)
      },
      edit (item, index) {
        this.items[index].edit = true
      },
      update (item, index) {
        this.$validator.validateAll()
        .then(resp => {
          if (resp === true) {
            let put = {}
            let id = item.data[0]
            for (let i = 0; i < this.headers.length; i++) {
              if (this.headers[i] !== 'kd_progstudi') {
                put[this.headers[i]] = item.data[i]
              }
            }
            this.$axios.put(this.$baseApi + '/program_studi/' + id, put)
            .then(resp => {
              console.log(resp)
              if (resp.data !== null) {
                this.$swal(
                  'Sukses',
                  'Data berhasil di update',
                  'success'
                )
                this.get()
                this.saveForm = false
              } else {
                this.$swal(
                  'Gagal',
                  'Data gagal di update',
                  'error'
                )
              }
            })
            .catch(err => {
              console.log(err)
              alert(err)
            })
          }
        })
      },
      cancelUpdate (item, index) {
        this.items[index].edit = false
        this.get()
      },
      get (page = false, limit = false) {
        if (page !== false) {
          this.paging.page = page
        }
        if (limit !== false) {
          this.paging.limit = limit
        }
        let params = {
          order: 'kd_progstudi',
          page: `${this.paging.page},${this.paging.limit}`
        }
        this.loading = true
        this.$axios.get(this.$baseApi + `/program_studi`, {params})
        .then(resp => {
          let data = resp.data.program_studi
          this.headers = data.columns
          let records = []
          for (let i = 0; i < data.records.length; i++) {
            // harus array object biar bisa data binding
            // ga tau kenapa ketika pemasukan nilai nya kayak gini records[i] = [] records[i].open = false
            // itu dia engga nge binding data
            records[i] = {
              open: false,
              edit: false,
              data: data.records[i]
            }
          }
          this.items = records
          this.loading = false
        })
        .catch(err => {
          console.log(err)
          this.loading = false
        })
      }
    },
    mounted () {
      this.get()
    }
  }
</script>

<style lang="" scoped>
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
