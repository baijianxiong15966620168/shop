<template>
  <div>
    <el-card class="box-card" :body-style="{padding:'0px'}">
      <div class="clearfix header">
        <crumbs :list="[ { label:'首页', path:'/' }, { label:'权限管理' }, { label:'角色列表' }]"></crumbs>
      <el-row>
        <el-col :span="4">
          <el-button type="primary" round @click="$refs.addRoleEl.addRoleFormVisible = true">添加角色</el-button>
        </el-col>
      </el-row>
      </div>
      <el-table
        :data="roletableData"
        border
        style="width: 98%">
        <el-table-column
        type="index">
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="roleDesc"
          label="描述">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="$refs.editRoleEl.editRole(scope.row)">编辑角色</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="roleHandleDelete(scope.row)">删除角色</el-button>
            <el-button
            type="success"
            plain
            size="mini">授权角色</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 这里引入的是添加角色的组件 -->
    <addRole ref="addRoleEl" @addrole="roleList"></addRole>
    <!-- 这里引入的是编辑角色的组件 -->
    <editRole ref="editRoleEl" @editSubmit="roleList"></editRole>
  </div>
</template>

<script>
import * as role from '@/views/api/role'
import addRole from './addRole'
import editRole from './editrole'
export default {
  name: 'RoleList',
  created () {
    this.roleList()
  },
  data () {
    return {
      roletableData: []
    }
  },
  methods: {
    async roleList () {
      const { data, meta } = await role.getRoleList()
      if (meta.status === 200) {
        this.roletableData = data
      }
    },
    async roleHandleDelete (item) {
      this.$confirm('确定删除此角色吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 确实删除的时候发送删除请求
        const { meta } = await role.deleteRole(item.id)
        if (meta.status === 200) {
          this.roleList() // 刷新角色列表数据
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  components: {
    addRole,
    editRole
  }
}
</script>

<style scoped>
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card{
    background-color: #E9EEF3
  }

  .el-table--border{
    margin-left: 1%
  }
  .el-breadcrumb{
    padding: 15px;
    background-color: aquamarine
  }

  .el-row{
    padding: 5px 0px 5px 10px;
    background-color: beige
  }
</style>
