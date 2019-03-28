<template>
  <el-dialog title="授权角色" :visible.sync="rightsFormVisible">
<!--     :default-expanded-keys="[2, 3]"
    :default-checked-keys="[5]" 这个是默认的选中哪一行-->
    <el-tree
      :data="rightsData"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      ref="tree"
      :default-checked-keys="checkedRights"
      default-expand-all>
    </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="rightsFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="rightsSubmit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { queryAllRights, rightsModification } from '@/views/api/rights'
export default {
  name: 'RightRole',
  data () {
    return {
      rightsFormVisible: false,
      roles: {},
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      rightsData: [],
      checkedRights: [],
      scope: {}
    }
  },
  methods: {
    async showRightsList (scope) {
      this.scope = scope.row
      this.rightsFormVisible = true
      this.roles = scope.row // 获取当前需要授权的是哪个用户的信息
      const { data, meta } = await queryAllRights('tree')
      if (meta.status === 200) {
        this.rightsData = data
      }
      this.getRights(scope)
    },
    async getRights (scope) {
      let tmp = []
      scope.row.children.forEach(first => {
        first.children.forEach(second => {
          // console.log(second)
          second.children.forEach(third => {
            // console.log(third)
            tmp.push(third.id)
          })
        })
      })
      this.checkedRights = tmp
    },
    async rightsSubmit () {
      // 提交请求修改已授权的角色列表
      const rids = this.$refs.tree.getCheckedKeys() // 获取的是选中的节点id值
      const halfKeys = this.$refs.tree.getHalfCheckedKeys() // 获取的是选中的半节点的id值，返回的都是一个数组
      // 发送的是一个用，分割的字符串
      const { meta } = await rightsModification(this.scope.id, [...rids, ...halfKeys].join(','))
      if (meta.status === 200) {
        this.rightsFormVisible = false // 隐藏对话框
        this.$emit('rightsUpdateSuccess') // 发表一个通知，告诉父组件角色授权成功
        this.$message({
          type: 'success',
          message: '授权成功'
        })
      }
    }
  }
}
</script>

<style>

</style>
