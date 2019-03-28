import request from '@/utils/request'

/*
请求角色列表
*/
export const getRoleList = () => {
  return request({
    method: 'get',
    url: 'roles'
  })
    .then(res => res.data)
}

/*
添加角色
*/
export const addRole = (roleName, roleDesc) => {
  return request({
    method: 'POST',
    url: 'roles',
    data: {
      roleName: roleName,
      roleDesc: roleDesc || ''
    }
  })
    .then(res => res.data)
}

/*
删除角色
 */
export const deleteRole = (id) => {
  return request({
    method: 'DELETE',
    url: `roles/${id}`
  })
    .then(res => res.data)
}

/*
根据id查询角色
*/
export const serchRole = (id) => {
  return request({
    method: 'GET',
    url: `roles/${id}`
  })
    .then(res => res.data)
}
/*
编辑角色提交
*/
export const editRoleSubmit = (id, req) => {
  return request({
    method: 'PUT',
    url: `roles/${id}`,
    data: {
      roleName: req.roleName,
      roleDesc: req.roleDesc
    }
  })
    .then(res => res.data)
}

/*
获取左侧菜单权限
*/
export const getAside = () => {
  return request({
    method: 'GET',
    url: 'menus'
  })
    .then(res => res.data)
}
