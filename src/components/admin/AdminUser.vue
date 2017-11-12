<template>
  <div>
    <tcrud 
    title="Edit User"
    keyPrimaryId= "kd_dosen"
    :apiUrl = "this.$baseApi + '/tbl_user_dosen/'"
    keyData="tbl_user_dosen"
    :ruleValidation="rules"
    :relations="relations"
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
          nip: 'required',
          username: 'required',
          password: 'required'
        },
        relations: {
          nip: {
            to: {
              table: 'dosen',
              id: 'nip',
              url: this.$baseApi + '/dosen/'
            }
          }
        }
      }
    }
  }
</script>
