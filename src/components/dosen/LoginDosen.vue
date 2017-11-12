<template>
  <div>
    <div class="page login-page" id="app">
      <div class="container d-flex align-items-center">
        <div class="form-holder has-shadow">
          <div class="row">
            <!-- Logo & Information Panel-->
            <div class="col-lg-6">
              <div class="info d-flex align-items-center">
                <div class="content">
                  <div class="logo">
                    <h1>STIKOM BINANIAGA</h1>
                  </div>
                  <p>BOGOR DOSEN</p>
                </div>
              </div>
            </div>
            <!-- Form Panel    -->
            <div class="col-lg-6 bg-white">
              <div class="form d-flex align-items-center">
                <div class="content" v-if="loading == true">
                  <i class="fa fa-cog fa-spin fa-5x fa-fw" style="margin:0 auto;"></i>
                  <span class="sr-only">Loading...</span>
                  <span style="font-size:24px;" >Loading...</span>
                </div>
                <div class="content" v-if="loading == false">
                  <form id="login-form" method="post" @submit.prevent = "login()">
                    <div class="form-group">
                      <input type="text" v-model="form.username" class="form-control" placeholder="Username" name="username">
                      <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                      <span>
                        <small style="display:block;color:crimson;" v-for="item in usernameErrs">
                          {{ item }}
                        </small> 
                      </span>
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="form.password" class="form-control" placeholder="Password" name="password">
                      <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                      <span>
                        <small style="display:block;color:crimson;" v-for="item in passwordErrs">
                          {{ item }}
                        </small> 
                      </span>
                      <div class="row">
                     <!-- /.col -->
                        <div class="col-xs-4">
                          <input @click.prevent = "login()" type="submit" class="btn btn-primary btn-block btn-flat" name="login" value="Login">
                        </div>

                      </div>
                    <!-- /.col -->
                    </div>
                    
                    <!-- This should be submit button but I replaced it with <a> for demo purposes-->
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        usernameErrs: [],
        passwordErrs: [],
        loading: false,
        form: {
          username: null,
          password: null
        }
      }
    },
    methods: {
      login () {
        this.$axios.post(this.$baseApi + '?login=true&dosen=true', {
          username: this.form.username,
          password: this.form.password
        })
        .then(resp => {
          if (resp.data.success === true) {
            this.$localStorage.set('tokenDosen', resp.data.token)
            this.$localStorage.set('user', resp.data.user)
            this.$localStorage.set('logged', 2)
            this.$axios.defaults.headers.common['Authorization'] = this.$localStorage.get('tokenDosen')
            this.$router.push('/dosen/dashboard')
          } else {
            this.$swal('Error', 'Username dan password tidak cocok!', 'error')
          }
        })
      }
    },
    mounted () {
      console.log(this.$localStorage)
    }
  }
</script>

<style scoped src="./../css/bootstrap.css"></style>
<style scoped src="./../css/style.default.css"></style>
<style scoped src="./../css/custom.css"></style>