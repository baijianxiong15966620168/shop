<template>
  <div class="goods-list">
    <!-- 搜索组件 -->
    <el-row :gutter="20" class="serachRow">
      <el-col :span="6">
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select" @blur="goodsListOnload(input5,1)">
          <el-button slot="append" icon="el-icon-search" @click="goodsListOnload(input5,1)"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary" @click="$router.push('/goods/addGoods')">添加商品</el-button>
      </el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <!-- 搜索组件 -->
    <!-- 表格组件 -->
    <el-table
      :data="goodsData.goods"
      stripe
      border
      style="width: 100%">
      <el-table-column type="index" label="编号"></el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量">
      </el-table-column>
      <el-table-column
        label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.add_time | timeFilter }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220px">
        <template slot-scope="scope">
          <el-button
            type="success"
            size="mini"
            plain
            icon="el-icon-edit"
            title="编辑"
            @click="handleEdit(scope.$index, scope.row)"></el-button>
          <el-button
            icon="el-icon-delete"
            type="danger"
            size="mini"
            plain
            title="删除"
            @click="handleDelete(scope.$index, scope.row)"></el-button>
          <el-button
            icon="el-icon-check"
            type="warning"
            size="mini"
            plain
            title="审核"
            @click="handleDelete(scope.$index, scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 表格组件 -->
    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage4"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="this.goodsData.total">
    </el-pagination>
    <!-- 分页组件 -->
  </div>
</template>

<script>
import { getGoodsList } from '@/views/api/goods'

export default {
  name: 'GoodsList',
  created () {
    this.goodsListOnload()
  },
  data () {
    return {
      goodsData: [],
      input5: '',
      currentPage4: 1,
      pagenum: 1,
      pagesize: 20
    }
  },
  methods: {
    handleSizeChange (val) {
      this.pagesize = val
      this.currentPage4 = 1 // 将当前的页码改成1
      this.pagenum = 1 // 将当前的页面也从第一页开始渲染
      this.goodsListOnload()
    },
    handleCurrentChange (val) {
      this.pagenum = val
      this.goodsListOnload()
    },
    async goodsListOnload (input, num) {
      const { data, meta } = await getGoodsList({ query: input || '', pagenum: num || this.pagenum, pagesize: this.pagesize })
      this.goodsData = data
    }
  }
}
</script>

<style scoped>
  .serachRow{
    margin-top: 10px;
    margin-bottom: 10px
  }
</style>
