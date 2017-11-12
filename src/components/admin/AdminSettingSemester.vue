<template>
  <div>
    <tcrud 
    title="Setting Semester"
    keyPrimaryId= "id"
    :apiUrl = "this.$baseApi + '/setting/'"
    keyData="setting"
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
          sebelum_mk: 'required',
          setelah_mk: 'required',
          akhir_absen: 'required',
          waktu_sks: 'required',
          tri_semester: 'required',
          status: 'required',
          thn_akademik: 'required',
          semester: 'required',
          diprint: 'required'
        }
      }
    }
  }
</script>
