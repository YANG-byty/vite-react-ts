import Cookies from 'js-cookie'
// cookie保存的天数
import config from '../config'

const { cookieExpires } = config
const cookies: any = {}

/**
 * @description 存储 cookie 值
 * @param {String} name cookie name
 * @param {String} value cookie value
 * @param {Object} cookieSetting cookie setting
 */
cookies.set = function (name = 'default', value = '', cookieSetting = {}) {
  let currentCookieSetting = {
    expires: cookieExpires,
  }
  Object.assign(currentCookieSetting, cookieSetting)
  Cookies.set(`integration-${name}`, value, currentCookieSetting)
}

/**
 * @description 拿到 cookie 值
 * @param {String} name cookie name
 */
cookies.get = function (name = 'default') {
  return Cookies.get(`integration-${name}`)
}

/**
 * @description 拿到 cookie 全部的值
 */
cookies.getAll = function () {
  return Cookies.get()
}

/**
 * @description 删除 cookie
 * @param {String} name cookie name
 */
cookies.remove = function (name = 'default') {
  return Cookies.remove(`integration-${name}`)
}

export default cookies
