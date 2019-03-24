<template>
  <div class="user-list">
    <h2>我是用户列表</h2>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'UserList',
  created () {
    this.userOnload()
  },
  methods: {
    async userOnload () {
      const resData = await request(
        {
          url: '/users',
          method: 'GET',
          params: {
            pagenum: 1,
            pagesize: 8
          }
        }
      ).catch(err => console.log(err))
      console.log(resData)
    }
  }
}
</script>

<style>

</style>
