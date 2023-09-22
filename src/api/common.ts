import request from '../plugins/request'

export const getInstanceById = (data: object) => {
  return request({
    url: '/process/instance/getInstanceById',
    method: 'post',
    data,
  })
}
