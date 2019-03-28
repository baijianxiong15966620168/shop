<template>
  <div>
    <!-- <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb> -->
    <el-row :gutter="20" class="serachRow">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="userOnload(input5,1)"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click=" addFormVisible = true ">添加用户</el-button>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <el-table
      :data="userTableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      border
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-table-column type="index"></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column label="用户状态" width="100px">
        <template slot-scope="scope">
        <el-switch
          v-model="scope.row.mg_state"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="switchChangeStatus(scope.row)"
          :disabled="scope.row.switchStatus">
        </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="$refs.editComponent.userHandleEdit(scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.switchStatus"
            @click="userHandleDelete(scope.$index, scope.row)">删除</el-button>
          <el-button type="success" size="mini" @click="$refs.roleComponent.userRoleList(scope.row)">分配角色</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 这里是分页插件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="this.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="userTotal">
    </el-pagination>

    <el-dialog title="添加新用户" :visible.sync="addFormVisible">
      <el-form :model="addFormData" :rules="rules" ref="addForm">
        <el-form-item label="用户名" label-width="120px" prop="username">
          <el-input v-model="addFormData.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-input v-model="addFormData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="120px" prop="email">
          <el-input v-model="addFormData.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="120px" prop="mobile">
          <el-input v-model="addFormData.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser" :disabled="isSure">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 这里是编辑组件,这里添加的ref属性可以让当前父组件操作当前子组件 -->
    <!-- 将子组件里的事件注册之后会触发后面的函数刷新页面 -->
    <userEdit ref="editComponent" @editOk="userOnload"></userEdit>
    <!-- 这是分配角色的组件 -->
    <userAllocation ref="roleComponent"></userAllocation>
  </div>
</template>

<script>
import * as users from '@/views/api/user'
import userEdit from './edit'
import userAllocation from './allocation'
// import crumbs from '@/components/crumbs'

export default {
  name: 'UserList',
  created () {
    this.userOnload()
  },
  data () {
    return {
      userTableData: [],
      input5: '',
      isSure: false,
      addFormVisible: false,
      addFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      loading: false,
      isDelete: false,
      pagenum: 1,
      pagesize: 5,
      userTotal: 0,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
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
    // 这里是分页组件的分页组件
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.userOnload()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pagenum = val
      this.userOnload()
    },
    // 页面加载时请求数据
    async userOnload (text, pagenum) {
      this.loading = true // 开始loading状态，在网络卡顿的时候用户处于等待状态
      const { data, meta } = await users.getUserList({ pagenum: pagenum || this.pagenum, pagesize: this.pagesize, query: text || '' })
      this.userTotal = data.total // 总共有多少条数据
      if (meta.status === 200) {
        // 页面请求数据的时候给状态按钮加一个属性用来控制状态按钮
        data.users.forEach(el => {
          el.switchStatus = false
        })
        this.userTableData = data.users
      }
      // 页面加载完毕之后解开loading，将页面显示出来
      this.loading = false
    },
    // 添加新用户
    async addUser () {
      // 如果表单验证没有通过则直接返回
      this.$refs['addForm'].validate((valid) => {
        if (!valid) {
          return false
        }
      })
      this.isSure = true // 禁用确定按钮
      const { meta } = await users.addNewUser(this.addFormData)
      // console.log(meta)
      if (meta.status === 201) {
        this.addFormVisible = false // 隐藏弹出框
        // this.$refs.addFormEl.resetFields()
        this.$refs.addForm.resetFields() // 清空弹出框的内容
        this.userOnload() // 刷新页面数据
        this.$message({
          message: `${meta.msg}`,
          type: 'success'
        })
      } else if (meta.status === 400) {
        this.$message.error(`${meta.msg}`)
      }
      this.isSure = false // 解开禁用
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleEdit (a, b) {
      console.log(b)
    },
    // 删除的单个用户
    async userHandleDelete (index, item) {
      item.switchStatus = true // 在删除用户的时候禁用状态改变和删除按钮
      this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await users.userDelete(item.id)
        if (meta.status === 200) {
          this.userOnload() // 删除成功之后刷新数据
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
        item.switchStatus = false // 不管成功还是失败都要解开禁用，必须在异步代码执行完之后执行解除禁用
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
        item.switchStatus = false
      })
    },
    // 改变用户状态
    async switchChangeStatus (item) {
      item.switchStatus = true // 将状态按钮禁用，防止用户发送之后点击
      // 获取当前行状态的id和状态值，发送给后端，用来修改当前行的状态
      const { data, meta } = await users.switchChange(item.id, item.mg_state)
      if (meta.status === 200 && data.mg_state === 1) {
        this.$message({
          message: '启用用户成功',
          type: 'success'
        })
      } else if (meta.status === 200 && data.mg_state === 0) {
        this.$message.error('禁用用户成功')
      }
      item.switchStatus = false // 解开禁用
    }
  },
  components: {
    userEdit,
    userAllocation
  }
}
</script>

<style scoped>
  .serachRow{
    margin-top: 10px;
    margin-bottom: 10px
  }

  .el-card__body{
    padding: 0px 10px 0px 10px!important;
  }

  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
