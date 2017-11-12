<template>
  <div>
    ini lihat jadwal
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