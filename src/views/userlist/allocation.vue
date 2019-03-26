<template>
<el-dialog title="分配角色" :visible.sync="allocationFormVisible">
  <el-form>
    <el-form-item label="当前的用户:" label-width="120px">
      <span>{{ text }}</span>
    </el-form-item>
    <el-form-item label="请选择角色:" label-width="120px">
      <el-select placeholder="请选择" v-model="userData.rid">
        <el-option :value="-1" label="请选择"></el-option>
        <el-option
          v-for="item in allocationData"
          :key="item.id"
          :label="item.roleName"
          :value="item.id">
        </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="userAllocation">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
import { getRoleList } from '@/views/api/role'
import { userAllocations, userEdit } from '@/views/api/user'

export default {
  name: 'Allocation',
  data () {
    return {
      allocationData: [],
      allocationFormVisible: false,
      text: '',
      value4: '',
      userData: ''
    }
  },
  methods: {
    async userRoleList (item) {
      // 根据id去查询数据库里面当前行的信息
      // 这里将请求异步并行，只有数据都拿到了才返回数据，请求同时发送，快的先返回数据，互不影响
      const [ result, res ] = await Promise.all([
        userEdit(item.id),
        getRoleList()
      ])
      if (result.meta.status === 200) {
        this.text = result.data.username
        this.userData = result.data
      }
      // 请求选择框列表
      if (res.meta.status === 200) {
        this.allocationData = res.data
        this.allocationFormVisible = true
      }
    },
    // 请求编辑用户的状态成功
    async userAllocation () {
      // console.log(this.userData)
      const res = await userAllocations(this.userData.id, this.userData.rid)
      if (res.meta.status === 200) {
        this.allocationFormVisible = false
        this.$message({
          message: '分配成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>

</style>
