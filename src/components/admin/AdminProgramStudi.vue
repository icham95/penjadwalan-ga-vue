<template>
  <div>
    <tcrud 
    title="Program Studi"
    keyPrimaryId= "kd_progstudi"
    :apiUrl = "this.$baseApi + '/program_studi/'"
    keyData="program_studi"
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
          nama_progstudi: 'required',
          name_progstudi: 'required',
          nama_singkat: 'required'
        }
      }
    }
  }
</script>
