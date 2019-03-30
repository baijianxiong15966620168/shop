<template>
  <div class="add-goods">
    <div>
      <h5 class="add-list">添加商品列表</h5>
    </div>
    <el-steps :space="200" :active="1" finish-status="success">
      <el-step title="已完成"></el-step>
      <el-step title="进行中"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <el-tabs tab-position="left">
      <el-tab-pane label="基本信息">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item label="商品名称">
            <el-input v-model="formLabelAlign.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-moder.number="formLabelAlign.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model.number="formLabelAlign.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model.number="formLabelAlign.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <el-cascader
              :options="options"
              change-on-select
              :props="cascader"
              v-model="formLabelAlign.goods_cat"
              >
            </el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="formLabelAlign.goods_introduce">
              <el-radio border label="true">是</el-radio>
              <el-radio border label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item class="sure">
            <el-button type="primary">确定</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品内容">商品内容</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCategories } from '@/views/api/goods'

export default {
  name: 'AddGoods',
  created () {
    this.categoriresList()
  },
  data () {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_introduce: '',
        goods_cat: []
      },
      options: [],

      cascader: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      }
    }
  },
  methods: {
    async categoriresList () {
      const { data, meta } = await getCategories()
      console.log(data, meta)
      if (meta.status === 200) {
        this.options = data
      }
    }
  }
}
</script>

<style scoped>
  .add-list{
    padding: 10px;
    padding-bottom: 15px;
    padding-left: 20px;
    background-color: #D7E2EF;
    margin: 0px
  }

  .el-steps{
    margin: 10px 0px 10px 20px
  }

  .sure{
    padding-left: 300px
  }
</style>
