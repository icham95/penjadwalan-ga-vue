<template>
  <div>
    <h5>Total {{paging.total}}</h5>
    <v-card>
      <v-progress-linear v-bind:indeterminate="loading" v-if="loading"></v-progress-linear>
      <table style="position:relative;">
        <div style="position:absolute;top:0;left:0;">
          <v-btn color="primary" icon ripple
          @click.native.prevent="get()">
            <v-icon color="white">refresh</v-icon>
          </v-btn>
        </div>
        <div style="position:absolute;top:0;right:0;">
          <v-btn color="primary" icon ripple :disabled="saveForm"
          @click.native.prevent="add">
            <v-icon color="white">create</v-icon>
          </v-btn>
        </div>
        <caption>{{title}}</caption>
        <thead>
          <tr>
            <th scope="col" v-for="item in headers"> {{item.replace('_', ' ')}} </th>
            <th scope="col"> Action </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items">
            <td :data-label="headers[indexSub]" v-for="(sub, indexSub) in item.data" v-if="item.edit == false">
              <a href="" 
              v-if="haveRelations(headers[indexSub], sub) == true"
              @click.prevent="showRelation(headers[indexSub], sub)">
                {{sub}}
              </a>
              <span v-else>
                {{(sub == null ? '-' : sub)}}
              </span>
            </td>
            <td :data-label="headers[indexSub]" v-for="(sub, indexSub) in item.data" v-if="item.edit" >
              <!-- edit save -->
              <v-text-field v-if="headers[indexSub] != keyPrimaryId && editId == false"
              :error-messages="errors.collect(headers[indexSub])"
              v-validate="rules(headers[indexSub])"
              :data-vv-name="headers[indexSub]"
              required
              :label="headers[indexSub]"
              v-model="item.data[indexSub]">
              </v-text-field>

              <v-text-field v-if="editId == true"
              :error-messages="errors.collect(headers[indexSub])"
              v-validate="rules(headers[indexSub])"
              :data-vv-name="headers[indexSub]"
              required
              :label="headers[indexSub]"
              v-model="item.data[indexSub]"
              :disabled="(headers[indexSub] == keyPrimaryId && item.update == true ? true : false)">
              </v-text-field>

              <div v-if="headers[indexSub] == keyPrimaryId && editId == false" style="color:purple;">
                Auto
              </div>
            </td>
            <td data-label="Actions">
              <div v-if="item.edit">
                <!-- edit update -->
                <div v-if="item.update">
                  <v-btn icon color="teal" small ripple @click.native.prevent="update(item, index)">
                    <v-icon color="white"> save </v-icon>
                  </v-btn> 
                  <v-btn icon color="red" small ripple @click.native.prevent="cancelUpdate(item, index)"> 
                    <v-icon color="white"> cancel </v-icon>
                  </v-btn> 
                </div>
                <!-- edit save -->
                <div v-if="item.save">
                  <v-btn icon color="teal" small ripple @click.native.prevent="save(item, index)">
                    <v-icon color="white"> save </v-icon>
                  </v-btn> 
                  <v-btn icon color="red" small ripple @click.native.prevent="cancelAdd(index)"> 
                    <v-icon color="white"> cancel </v-icon>
                  </v-btn> 
                </div>
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
      <div>
        <v-btn color="primary" icon ripple
        @click.native.prevent="prev()">
          <v-icon color="white">keyboard_arrow_left</v-icon>
        </v-btn>
        <v-badge>
          {{paging.page}} / {{pagingTotalPage}}
        </v-badge>
        <v-btn color="primary" icon ripple
        @click.native.prevent="next()">
          <v-icon color="white">keyboard_arrow_right</v-icon>
        </v-btn>
        Tampilkan 
        <input type="number" style="width:50px;border:1px solid black;" 
        v-model="paging.limit" @change.prevent="get()" @keyup.prevent="get()">
      </div>
    </v-card>

    <v-dialog v-model="dialog" scrollable>
      <v-card> 
        <v-card-title>
          <span>{{relationTitle}}</span>
          <v-spacer></v-spacer>
          <v-progress-linear 
          v-bind:indeterminate="loadingDialog"
          v-if="loadingDialog">
          </v-progress-linear>
        </v-card-title>
        <v-card-text>
          <v-list two-line subheader>
            <v-list-tile avatar v-for="(item, index) in relationData" v-bind:key="item.title">
              <v-list-tile-content>
                <v-list-tile-title>{{ index.replace('_', ' ') }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ item }}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-card-text>
      <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog=false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      title: String,
      keyPrimaryId: String,
      apiUrl: String,
      keyData: String,
      ruleValidation: Object,
      editId: {
        type: Boolean,
        default () {
          return false
        }
      },
      relations: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    $validates: true,
    data () {
      return {
        dialog: false,
        loadingDialog: false,
        relationTitle: null,
        relationData: [],
        saveForm: false,
        loading: false,
        headers: [],
        items: [],
        paging: {
          page: 1,
          limit: 5,
          total: 0
        }
      }
    },
    methods: {
      showRelation (header, item) {
        let relation = {}
        for (let index in this.relations) {
          if (index === header) {
            this.dialog = true
            relation = this.relations[index]
            this.relationTitle = relation.to.table
            this.$axios.get(relation.to.url + item)
            .then(resp => {
              this.relationData = resp.data
              this.loadingDialog = false
            })
            break
          }
        }
        console.log(relation)
      },
      haveRelations (header, item) {
        for (let index in this.relations) {
          if (index === header) {
            return true
          }
        }
        return false
      },
      rules (key) {
        let rule = ''
        for (let index in this.ruleValidation) {
          if (key === index) {
            rule += this.ruleValidation[index]
          }
        }
        return rule
      },
      add () {
        this.saveForm = true
        let temp = []
        temp.edit = true
        temp.update = false
        temp.save = true
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
        console.log(item)
        this.$validator.validateAll()
        .then(resp => {
          if (resp === true) {
            let post = {}
            for (let i = 0; i < this.headers.length; i++) {
              if (this.editId === false) {
                if (this.headers[i] !== this.keyPrimaryId) {
                  post[this.headers[i]] = item.data[i]
                }
              } else {
                post[this.headers[i]] = item.data[i]
              }
            }
            this.$axios.post(this.apiUrl, post)
            .then(resp => {
              if (resp.data !== null) {
                this.$swal(
                  'Sukses',
                  'Data berhasil di simpan',
                  'success'
                )
                this.get()
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
          title: 'Benar ingin menghapus ?',
          text: 'Penyesalan ada di akhir!',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya!',
          showLoaderOnConfirm: true,
          allowOutsideClick: false,
          preConfirm: res => {
            return new Promise((resolve, reject) => {
              this.$axios.delete(this.apiUrl + item.data[0])
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
        this.items[index].update = true
        this.items[index].edit = true
      },
      update (item, index) {
        this.$validator.validateAll()
        .then(resp => {
          if (resp === true) {
            let put = {}
            let id = item.data[0]
            for (let i = 0; i < this.headers.length; i++) {
              if (this.editId === false) {
                if (this.headers[i] !== this.keyPrimaryId) {
                  put[this.headers[i]] = item.data[i]
                }
              } else {
                put[this.headers[i]] = item.data[i]
              }
            }
            this.$axios.put(this.apiUrl + id, put)
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
          order: this.keyPrimaryId + ',desc',
          page: `${this.paging.page},${this.paging.limit}`
        }
        this.loading = true
        this.$axios.get(this.apiUrl, {params})
        .then(resp => {
          let data = resp.data[this.keyData]
          this.headers = data.columns
          let records = []
          for (let i = 0; i < data.records.length; i++) {
            // harus array object biar bisa data binding
            // ga tau kenapa ketika pemasukan nilai nya kayak gini records[i] = [] records[i].open = false
            // itu dia engga nge two way binding data
            records[i] = {
              edit: false,
              update: false,
              save: false,
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
      },
      getCount () {
        this.$axios.get(this.apiUrl, {
          params: {
            count: this.keyData,
            countWhat: this.keyPrimaryId
          }
        }).then(resp => {
          this.paging.total = resp.data.count
        })
      },
      next () {
        if (this.paging.page > 0 && this.paging.page < this.pagingTotalPage) {
          this.paging.page += 1
          this.get()
        }
      },
      prev () {
        if (this.paging.page > 1 && this.paging.page <= this.pagingTotalPage) {
          this.paging.page -= 1
          this.get()
        }
      }
    },
    computed: {
      pagingTotalPage () {
        return Math.ceil(this.paging.total / this.paging.limit)
      }
    },
    mounted () {
      this.get()
      this.getCount()
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
