<template>
  <el-dialog title="编辑用户" :visible.sync="editFormVisible">
    <el-form :model="editFormData" :rules="rules" ref="addForm">
      <el-form-item label="用户名" label-width="120px" prop="username">
        <el-input v-model="editFormData.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="120px" prop="email">
        <el-input v-model="editFormData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="120px" prop="mobile">
        <el-input v-model="editFormData.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="userEditSure">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { userEdit, userSubmit } from '@/views/api/user'

export default {
  name: 'UserEdit',
  data () {
    return {
      editFormData: {
        username: '',
        email: '',
        mobile: ''
      },
      editFormVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入电话号码', trigger: 'blur' },
          { min: 3, max: 11, message: '长度在 3 到 11 个数字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 请求编辑的数据
    async userHandleEdit (item) {
      this.editFormVisible = true
      const res = await userEdit(item.id)
      if (res.meta.status === 200) {
        this.editFormData = res.data
      }
      console.log(res)
    },
    // 这里是编辑用户
    async userEditSure () {
      const res = await userSubmit(this.editFormData)
      if (res.meta.status === 200) {
        this.editFormVisible = false
        // 还要刷新页面,一个自定义事件
        this.$emit('editOk')
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
      }
    }
  }
}
</script>

<style>

</style>
