/*
这里面是处理user组件的请求的
*/
import request from '@/utils/request'
import { CancelToken } from 'axios' // axios里面有一个内置对象，可以用来取消axios请求
// let CancelToken = axios.cancelToken
let cancelFind = function () {}
/*
用户列表的获取
*/
export const getUserList = ({ pagenum = 1, pagesize = 10, query }) => {
  cancelFind() // 一上来取消一次请求
  return request({
    method: 'GET',
    url: '/users',
    params: {
      pagenum,
      pagesize,
      query
    },
    cancelToken: new CancelToken(function executor (c) {
      cancelFind = c
      // 这个参数 c 就是CancelToken构造函数里面自带的取消请求的函数，这里把该函数当参数用
    })
  })
    .then(res => res.data)
}
/*
添加新用户
*/
export const addNewUser = (item) => {
  return request({
    method: 'POST',
    url: 'users',
    data: item
  }).then(res => res.data)
}

/*
 改变用户状态
*/
export const switchChange = (uId, type) => {
  return request({
    method: 'PUT',
    url: `users/${uId}/state/${type}`
  })
    .then(res => res.data)
}

/*
删除单个用户
 */
export const userDelete = (uId) => {
  return request({
    method: 'DELETE',
    url: `users/${uId}`
  })
    .then(res => res.data)
}

/*
编辑用户的信息，根据id查询用户信息
*/
export const userEdit = (id) => {
  return request({
    method: 'GET',
    url: `users/${id}`
  })
    .then(res => res.data)
}

/*
编辑用户提交
*/
export const userSubmit = (item) => {
  return request({
    method: 'put',
    url: `users/${item.id}`,
    data: {
      email: item.email,
      mobile: item.mobile
    }
  })
    .then(res => res.data)
}

/*
分配用户角色
*/
export const userAllocations = (uId, urid) => {
  return request({
    method: 'put',
    url: `users/${uId}/role`,
    data: {
      rid: urid
    }
  })
    .then(res => res.data)
}
