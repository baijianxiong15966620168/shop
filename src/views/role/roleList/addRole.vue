<template>
  <el-dialog title="添加角色" :visible.sync="addRoleFormVisible">
    <el-form :model="roleForm" :rules="rules" ref="addroleRuleForm">
      <el-form-item label="角色名称" label-width="120px" prop="roleName">
        <el-input v-model="roleForm.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="描述" label-width="120px" prop="roleDesc">
        <el-input v-model="roleForm.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelAdd">取 消</el-button>
      <el-button type="primary" @click="addRole" :disabled="isSure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { addRole } from '@/views/api/role'

export default {
  name: 'AddRole',
  data () {
    return {
      addRoleFormVisible: false,
      isSure: false,
      roleForm: {},
      rules: {
        roleName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async addRole () {
      this.$refs['addroleRuleForm'].validate((valid) => {
        if (!valid) {
          return false
        }
      })
      this.isSure = true
      const { meta } = await addRole(this.roleForm.roleName, this.roleForm.roleDesc)
      if (meta.status === 201) {
        this.addRoleFormVisible = false
        this.$emit('addrole')
        this.$message({
          type: 'success',
          message: '添加角色成功'
        })
        // this.roleForm = {}
        this.$refs['addroleRuleForm'].resetFields() // 重置数据，清空验证消息
      } else {
        this.$message.error(meta.msg)
      }
      this.isSure = false
    },
    cancelAdd () {
      this.addRoleFormVisible = false
      this.$refs['addroleRuleForm'].resetFields() // 重置数据，清空验证信息
    }
  }
}
</script>

<style>

</style>
