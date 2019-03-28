<template>
  <div class="lyout">
    <el-container>
      <el-header>
        <LyoutHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <LyoutAside />
        </el-aside>
        <el-main>
          <el-card class="box-card" :body-style="{padding:'0px'}">
            <crumbs :list="getBreadcrumbs()"></crumbs>
            <router-view></router-view>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import LyoutHeader from './header'
import LyoutAside from './aside'

export default {
  name: 'Lyout',
  data () {
    return {
    }
  },
  methods: {
    // 获取个导航的小选项，通过路由信息对象的matched方法获取相关路由的信息
    getBreadcrumbs () {
      let listArr = [ { label: '首页', path: '/' } ]
      this.$route.matched.slice(1).forEach(item => {
        listArr.push({ label: item.meta.label})
      })
      return listArr
    }
  },
  components: {
    LyoutHeader,
    LyoutAside
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

  .el-header{
    background-color: #545C64;
    padding: 0px
  }

  .el-aside{
    background-color: #545C64
  }

  .el-row{
    display: flex;
    align-items: center;
    margin: 0px!important
  }

  .el-main{
    background-color: #E9EEF3
  }

  .box-card{
    background-color: #E9EEF3
  }

  .el-breadcrumb{
    height: 45px;
    line-height: 45px;
    display: flex;
    align-items: center
  }
</style>
