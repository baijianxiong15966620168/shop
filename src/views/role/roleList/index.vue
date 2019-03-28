<template>
  <div>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" round @click="$refs.addRoleEl.addRoleFormVisible = true">添加角色</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="roletableData"
      border
      style="width: 98%">
      <el-table-column
      type="index">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="first in scope.row.children" :key="first.id">
            <el-col :span="4">
              <el-tag
                class="first"
                closable>
                {{ first.authName }}
              </el-tag>
              <i class="el-icon-arrow-right"></i>
              </el-col>
            <el-col :span="20">
              <el-row v-for="second in first.children" :key="second.id">
                <el-col :span="4">
                  <el-tag
                    class="second"
                    closable
                    type="success">
                    {{ second.authName }}
                  </el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="20">
                  <span v-for="third in second.children" :key="third.id">
                    <el-tag
                      class="third"
                      closable
                      @close="deleteSingleRights(scope, third)"
                      type="warning">
                      {{ third.authName }}
                    </el-tag>
                  </span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
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
          size="mini"
          @click="$refs.rightsRoleEl.showRightsList(scope)">授权角色</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 这里引入的是添加角色的组件 -->
    <addRole ref="addRoleEl" @addrole="roleList"></addRole>
    <!-- 这里引入的是编辑角色的组件 -->
    <editRole ref="editRoleEl" @editSubmit="roleList"></editRole>
    <!-- 这里引入授权角色的列表 -->
    <rightsRole ref="rightsRoleEl" @rightsUpdateSuccess="roleList"></rightsRole>
  </div>
</template>

<script>
import * as role from '@/views/api/role'
import addRole from './addRole'
import editRole from './editrole'
import rightsRole from './rightsRole'
import { deleteRights } from '@/views/api/rights'

export default {
  name: 'RoleList',
  created () {
    this.roleList()
  },
  data () {
    return {
      roletableData: [],
      data: []
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
    },
    async deleteSingleRights (scope, item) {
      const { data, meta } = await deleteRights(scope.row.id, item.id)
      if (meta.status === 200) {
        scope.row.children = data // 成功之后将当前行的数据换成后端返回的新的数据
        this.$message({
          type: 'success',
          message: '取消权限成功'
        })
      }
    }
  },
  components: {
    addRole,
    editRole,
    rightsRole
  }
}
</script>

<style scoped>
  .el-table--border{
    margin-left: 1%
  }

  .el-row{
    padding: 5px 0px 5px 10px;
    background-color: beige
  }

  .first,.second,.third{
    margin-top: 5px
  }

  .third{
    margin-right: 5px
  }

  .el-row{
    border-top: 1px solid #ccc
  }
</style>
