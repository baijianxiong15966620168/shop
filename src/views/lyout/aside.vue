<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :router="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>用户管理</span>
      </template>
      <!-- 这里的index属性是默认的跳转的hash值,在el-menu上面绑定一个touter属性来监听 -->
      <el-menu-item index="/users">
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
</template>

<script>
export default {

}
</script>

<style scoped>
  .el-menu{
    width: 100%;
    height: 100%;
    border: none
  }
</style>
