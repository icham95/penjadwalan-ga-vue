<template>
  <div>
    <tcrud 
    title="Jenjang"
    keyPrimaryId= "kd_jenjang"
    :apiUrl = "this.$baseApi + '/jenjang/'"
    keyData="jenjang"
    :ruleValidation="rules"
    :editId="false"
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
          nama_jenjang: 'required',
          nama_jenjang_lengkap: 'required',
          nama_jenjang_en: 'required',
          nama_gelar: 'required'
        }
      }
    }
  }
</script>
