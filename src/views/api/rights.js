import request from '@/utils/request'

/*
获取所有的权限列表
*/
export const queryAllRights = (type = 'list') => {
  return request({
    method: 'GET',
    url: `rights/${type}`
  })
    .then(res => res.data)
}

/*
角色授权提交
*/
export const rightsModification = (id, rid) => {
  return request({
    method: 'POST',
    url: `roles/${id}/rights`,
    data: {
      rids: rid
    }
  })
    .then(res => res.data)
}
/*
删除角色指定权限
*/
export const deleteRights = (roleId, rId) => {
  return request({
    method: 'DELETE',
    url: `roles/${roleId}/rights/${rId}`
  })
    .then(res => res.data)
}
