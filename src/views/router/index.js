import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Lyout from '@/views/lyout'
import UserList from '@/views/userlist'
import Home from '@/views/home'
import RoleLit from '@/views/role/roleList' // 挂载角色列表组件，注册路由

Vue.use(Router)

const routerX = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Lyout,
      children: [
        // 进来默认展示就是home页面,在第一项子组件path里面不加路径就是指进来默认就是这个组件
        { path: '', component: Home },
        { path: '/users', component: UserList },
        { path: '/role/roleList', component: RoleLit } // 注册为子组件
      ]
    }
  ]
})

routerX.beforeEach((to, from, next) => {
  // 路由守卫是每次路由都要经过这里，只有调用next方法才让通行
  const { path } = to
  if (path !== '/login') {
    // 把本地登录的储存的token取出，判断是否存在token值
    const token = window.localStorage.getItem('token')
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
})

export default routerX
