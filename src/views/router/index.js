import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Lyout from '@/views/lyout'
import UserList from '@/views/userlist'
import Home from '@/views/home'
import RoleLit from '@/views/role/roleList' // 挂载角色列表组件，注册路由
import RightsList from '@/views/role/rightsList' // 挂载权限列表组件
import GoodsList from '@/views/goods/goods-list'
import AddGoods from '@/views/goods/goods-list/addgoods'

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
        // { path: '/users', component: UserList },
        // { path: '/roles', component: RoleLit } // 注册为子组件
        {
          path: '/users',
          component: {
            render: c => c('router-view') // 这里是直接渲染了router-view组件
          },
          meta: { label: '用户管理' },
          children: [
            { path: '/users/users', component: UserList, meta: { label: '用户列表' } }
          ]
        },
        {
          path: '/rigths',
          component: { render: c => c('router-view') },
          meta: { label: '权限管理' },
          children: [
            { path: '/rights/roles', component: RoleLit, meta: { label: '角色列表' } }, // 在组件的前面加上之前的父组件的路由，方便区分路由管理
            { path: '/rights/rights', component: RightsList, meta: { label: '权限列表' } } // 在组件的前面加上之前的父组件的路由，方便区分路由管理
          ]
        },
        {
          path: '/goods',
          component: { render: c => c('router-view') },
          meta: { label: '商品管理' },
          children: [
            { path: '/goods/goods', component: GoodsList, meta: { label: '商品列表' } },
            { path: '/goods/addGoods', component: AddGoods, meta: { label: '商品列表' } }
          ]
        }
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
