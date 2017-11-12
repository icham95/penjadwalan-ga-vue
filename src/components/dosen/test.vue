<template>
  <div>
    <tcrud 
    title="test title"
    keyPrimaryId= "kd_jenjang"
    :apiUrl = "this.$baseApi + '/jenjang/'"
    keyData="jenjang"
    :ruleValidation="rules"
    ></tcrud>
  </div>
</template>

<script>
  import tcrud from '@/components/admin/Crud.vue'
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
