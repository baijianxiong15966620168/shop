import request from '@/utils/request'

/*
获取商品列表数据
*/
export const getGoodsList = ({ query = '', pagenum = 1, pagesize = 20 } = {}) => {
  return request({
    method: 'GET',
    url: '/goods',
    params: {
      query: query,
      pagenum: pagenum,
      pagesize: pagesize
    }
  })
    .then(res => res.data)
}
/*
获取商品数据列表
*/
export const getCategories = () => {
  return request({
    method: 'GET',
    url: '/categories',
    params: {
      type: 3
    }
  })
    .then(res => res.data)
}
