<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    :router="true"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    unique-opened>
    <el-submenu v-for="item in menusList" :key="item.id" :index="item.path">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{item.authName}}</span>
      </template>
      <!-- 这里的index属性是默认的跳转的hash值,在el-menu上面绑定一个touter属性来监听 -->
      <el-menu-item v-for="scope in item.children" :index="`/${item.path}/${scope.path}`" :key="scope.id">
        <i class="el-icon-menu"></i>
        {{ scope.authName }}
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getAside } from '@/views/api/role'
export default {
  name: 'Aside',
  created () {
    this.asideOload()
  },
  data () {
    return {
      menusList: []
    }
  },
  methods: {
    async asideOload () {
      const { data, meta } = await getAside()
      this.menusList = data
    }
  }
}
</script>

<style scoped>
  .el-menu{
    width: 100%;
    height: 100%;
    border: none
  }
</style>
