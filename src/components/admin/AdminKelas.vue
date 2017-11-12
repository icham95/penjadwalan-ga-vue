<template>
  <div>
    <tcrud 
    title="Kelas"
    keyPrimaryId= "kd_kelas"
    :apiUrl = "this.$baseApi + '/kelas/'"
    keyData="kelas"
    :ruleValidation="rules"
    :editId="true"
    ></tcrud>
  </div>
</template>

<script>
  import tcrud from '@/components/Crud.vue'
  export default {
    components: {
      tcrud
    },
    data () {
      return {
        rules: {
          kd_kelas: 'required',
          nama_kelas: 'required',
          balumni: 'required'
        }
      }
    }
  }
</script>
