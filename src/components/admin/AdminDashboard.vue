<template>
  <div>
    dashboard
  </div>
</template>

<script>
  export default {
    mounted () {
      this.$axios.get(this.$baseApi + '/ruang')
      .then(resp => {
        console.log(resp)
      })
    }
  }
</script>