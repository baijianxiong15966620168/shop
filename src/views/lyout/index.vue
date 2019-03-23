<template>
  <div class="lyout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="4" class="logo">
            <img src="./logo.png" alt="黑马程序员">
          </el-col>
          <el-col :span="16">
            <h2>电商后台管理系统</h2>
          </el-col>
          <el-col :span="4">
            <a href="#">退出登录</a>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened>
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="1-1">
                <i class="el-icon-menu"></i>
                用户列表
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="2-1">
                <i class="el-icon-menu"></i>
                角色列表
              </el-menu-item>
              <el-menu-item index="2-2">
                <i class="el-icon-menu"></i>
                权限列表
              </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item index="3-1">
                <i class="el-icon-menu"></i>
                商品列表
              </el-menu-item>
              <el-menu-item index="3-2">
                <i class="el-icon-menu"></i>
                分类参数
              </el-menu-item>
              <el-menu-item index="3-3">
                <i class="el-icon-menu"></i>
                商品分类
              </el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item index="4-1">
                <i class="el-icon-menu"></i>
                订单列表
              </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item index="5-1">
                <i class="el-icon-menu"></i>
                数据报表
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Lyout',
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
      // unique-opened = true
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped>
  .lyout{
    width: 100%;
    height: 100%
  }

  .el-container{
    width: 100%;
    height: 100%
  }

  .el-aside{
    background-color: #545C64
  }

  .el-header{
    background-color: #545C64;
    padding: 0px
  }

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

  .el-row{
    display: flex;
    align-items: center;
    margin: 0px!important
  }

  .el-col a{
    color: lightblue
  }

  .el-col a:hover{
    color: red
  }

  .el-menu{
    width: 100%;
    height: 100%;
    border: none
  }
</style>
