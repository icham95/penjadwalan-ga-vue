<template>
  <div class="hello">
    <v-btn dark color="primary" to="/login/admin">
      Login Admin
    </v-btn>
    <v-btn dark color="primary" to="/login/dosen">
      Login Dosen
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js PWA'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
.hello {
  width: 100%;
  height: 100vh;
  background-color:indigo;
}
</style>
