import axios from 'axios'
import config from '../config'
import * as util from '../libs/util'
import { authLogin, scanLogin } from '../api/redirect'
import Message3s from '../plugins/message/message-3s' //提示

const baseUrl = config.Setting.apiBaseURL

// 创建一个 axios 实例
const service = axios.create({
  baseURL: baseUrl,
  timeout: 15000, // 请求超时时间
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const openid = util.getCookie('token') || false
    if (openid) {
      config.headers['Authorization'] =
        util.getCookie('token_type') + ' ' + openid
    }
    return config
  },
  (error) => {
    // 发送失败
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    switch (response.data.code) {
      case 401:
        if (response.data.msg) {
          Message3s.error(response.data.msg)
        }
        return Promise.reject(response)
      case 500:
        if (response.data.msg) {
          Message3s.error(response.data.msg)
        }
        return Promise.reject(response)
    }
    return Promise.resolve(response.data.data)
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = '请求错误'
          break
        case 401:
          error.message = '未授权，请登录'
          util.clearLoginInfo()

          if (
            navigator.userAgent &&
            (navigator.userAgent.toLowerCase().indexOf('dingtalk') != -1 ||
              navigator.userAgent.toLowerCase().indexOf('nebula') != -1)
          ) {
            window.location.href = authLogin()
            return
          }
          window.location.href = scanLogin()

          // const plantformTag = util.getCookie('plantformTag')
          // if (plantformTag == 1) {
          //   router.replace('/login')
          //   return
          // }
          // if (plantformTag == 2) {
          //   router.replace('/zzdOpenLogin')
          //   return
          // }
          // if (plantformTag == 3) {
          //   router.replace('/scanCodeLogin')
          //   return
          // }

          break
        case 403:
          error.message = '拒绝访问'
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          break
        case 408:
          error.message = '请求超时'
          break
        case 500:
          error.message = '服务器内部错误'
          break
        case 501:
          error.message = '服务未实现'
          break
        case 502:
          error.message = '网关错误'
          break
        case 503:
          error.message = '服务不可用'
          break
        case 504:
          error.message = '网关超时'
          break
        case 505:
          error.message = 'HTTP版本不受支持'
          break
        default:
          break
      }
    }
    return Promise.reject(error)
  }
)

export default service
