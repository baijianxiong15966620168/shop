<template>
  <el-dialog title="编辑角色" :visible.sync="editRoleFormVisible">
    <el-form :model="roleEditForm" :rules="rules" ref="editroleRuleForm">
      <el-form-item label="角色名称" label-width="120px" prop="roleName">
        <el-input v-model="roleEditForm.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="120px">
        <el-input v-model="roleEditForm.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelEdit">取 消</el-button>
      <el-button type="primary" @click="editRoleSure" :disabled="isSure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { serchRole, editRoleSubmit } from '@/views/api/role'
export default {
  name: 'RditRole',
  data () {
    return {
      roleEditForm: {},
      editRoleFormVisible: false,
      isSure: false,
      id: '',
      rules: {
        roleName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async editRole (item) {
      this.editRoleFormVisible = true
      this.id = item.id
      const { data, meta } = await serchRole(item.id)
      if (meta.status === 200) {
        this.roleEditForm = data
      }
    },
    async editRoleSure () {
      const res = await editRoleSubmit(this.id, this.roleEditForm)
      // console.log(res)
      if (res.meta.status === 200) {
        this.editRoleFormVisible = false // 编辑框隐藏
        this.$emit('editSubmit') // 刷新页面，重新刷新数据
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      } else {
        this.$message.error(res.meta.msg)
      }
      this.$refs['editroleRuleForm'].resetFields() // 清空表单内容，清除验证效果
      // console.log(res)
    },
    // 取消编辑的时候
    cancelEdit () {
      this.editRoleFormVisible = false
      this.$refs['editroleRuleForm'].resetFields() // 清空表单内容，清除验证效果
    }
  }
}
</script>

<style>

</style>
