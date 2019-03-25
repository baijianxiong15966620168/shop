<template>
  <el-row :gutter="20">
    <el-col :span="4" class="logo">
      <img src="./logo.png" alt="黑马程序员">
    </el-col>
    <el-col :span="16">
      <h2>电商后台管理系统</h2>
    </el-col>
    <el-col :span="4">
      <el-button type="primary" round @click="userLogout">退出登录</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'LyoutHeader',
  methods: {
    userLogout () {
      if (confirm('你确定退出吗')) {
        window.localStorage.removeItem('token')
        this.$router.replace('/login')
        this.$message({
          message: '退出登录成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '取消成功退出',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>
  .logo{
    background-color: #ccc
  }

  .logo img{
    width: 100%;
    height: auto
  }

  .el-col{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    padding: 0px
  }
</style>
