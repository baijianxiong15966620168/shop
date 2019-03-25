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
          <router-view></router-view>
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
  methods: {
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
</style>
