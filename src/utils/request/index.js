import axios from 'axios'
import router from '@/views/router'
// 使用axios将所有请求的路径统一化
const instance = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前将本地的token添加都请求头里面发送给后端验证是否正确
  if (config.url !== '/login') {
    config.headers.Authorization = window.localStorage.getItem('token')
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  if (response.data.meta.status === 401) {
    // console.log(router.currentRoute),一个router实例的currentRoute路由，里面保存请求当前路由的数据
    router.replace(`/login?redirect=${router.currentRoute.fullPath}`)
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default instance
