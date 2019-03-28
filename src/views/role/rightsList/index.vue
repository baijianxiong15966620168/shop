<template>
  <el-table
    :data="rightsData"
    stripe
    border
    style="width: 100%">
    <el-table-column type="index">
    </el-table-column>
    <el-table-column
      prop="authName"
      label="权限名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="path"
      label="路径"
      width="180">
    </el-table-column>
    <el-table-column
      label="层级">
      <template slot-scope="scope">
      {{ ['一级', '二级', '三级'][scope.row.level] }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { queryAllRights } from '@/views/api/rights'

export default {
  name: 'RightsList',
  created () {
    this.rightsDataOnload()
  },
  data () {
    return {
      rightsData: []
    }
  },
  methods: {
    async rightsDataOnload () {
      const { data, meta } = await queryAllRights()
      console.log(data, meta)
      this.rightsData = data
    }
  }
}
</script>

<style>

</style>
