/*
这里面是处理user组件的请求的
*/
import request from '@/utils/request'
/*
用户列表的获取
*/
export const getUserList = ({ pagenum = 1, pagesize = 10 }) => {
  return request({
    method: 'GET',
    url: '/users',
    params: {
      pagenum,
      pagesize
    }
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
