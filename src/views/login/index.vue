<template>
  <div class="login">
    <div class="login-wicket">
      <el-form
        label-position="right"
        label-width="80px"
        :model="formLabelAlign"
        :rules="loginRules"
        ref="ruleForm">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="formLabelAlign.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input v-model="formLabelAlign.password"></el-input>
        </el-form-item>
      </el-form>
      <el-row class="success-btn">
        <el-button
            type="success"
            round
            class="submit"
            @click.prevent="handleLogin">登录</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'

export default {
  name: 'Login',
  data () {
    return {
      formLabelAlign: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      this.$refs['ruleForm'].validate(async (valid) => {
        // 在点击登录按钮的时候去验证是否通过表单验证，通过了才让提交请求，上面的ruleForm就是上面form表单中的ref的值。必须使用引号
        if (valid) {
          const { data: { data, meta } } = await request.post('/login', this.formLabelAlign)
          if (meta.status === 200) {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            // 登录成功之后设置token值储存在本地
            window.localStorage.setItem('token', data.token)
            // 登录成功之后跳转都之前退出的页面,在$route里面获取之前跳转回来的路由
            const routerPath = this.$route.query.redirect
            this.$router.replace(routerPath || '/')
          } else {
            this.$message({
              message: meta.msg,
              type: 'error'
            })
          }
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.login {
    width: 100%;
    height: 100%;
    background-color: #2f4050;
    display: flex;
    justify-content: center;
    align-items: center
}
.login-wicket {
    background-color: #fff;
    border-radius: 20px;
    padding: 50px 50px 50px 50px;
    width: 25%
}
.success-btn {
    width: 100%;
    padding-left: 50px
}
.submit {
    width: 100%;
}
</style>
