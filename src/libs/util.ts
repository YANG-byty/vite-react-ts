import Cookies from './util.cookies'
// cookie保存的天数
import config from '../config'

const { cookieExpires } = config
/**
 *
 * 设置自定义存储的cookie信息(过期时间未传入则去全局设置，全局设置若无默认1天)
 * */
export const setCookie = (name: string, value: string, expiresTime: number) => {
  Cookies.set(name, value, { expires: expiresTime || cookieExpires || 1 })
}
/**
 * 清除登录信息
 */
export const clearLoginInfo = () => {
  Cookies.remove('token')
  Cookies.remove('token_type')
  Cookies.remove('nick_name')
  Cookies.remove('user_id')
  localStorage.clear()
  sessionStorage.clear()
}
/**
 *
 * 获取自定义存储的cookie信息
 * */
export const getCookie = (name: string) => {
  let result = ''
  result = Cookies.get(name)

  if (result) return result
  else return result
}
/**
 * 枚举数据源
 * @param enumList  枚举数据源
 * @param afferentKey    传入值名称
 * @param afferentValue  传入值
 * @param outKey        传出值名称
 */
export const enumConversion = (
  enumList: Array<[]>,
  afferentKey: string | number,
  afferentValue: null,
  outKey: any
) => {
  let result = ''
  if (
    enumList.length <= 0 ||
    afferentValue === null ||
    !afferentKey ||
    !outKey
  ) {
    return result
  }

  const resultArray = enumList.filter(
    (item: any) => item[afferentKey] === afferentValue
  )
  if (resultArray.length > 0) {
    // 取第一个
    result = resultArray[0][outKey]
    return result
  }

  return result
}
/**
 * 函数防抖
 * functionTimeOut // 函数防抖节流存储对象
 * functionDelay // 延迟执行时间
 * @param that
 * @param fn
 * @param delay
 */
export const debounce = (
  state: { timer: string | number | NodeJS.Timeout | undefined },
  fn: { apply: (arg0: any) => void },
  delay: number | undefined
) => {
  delay = delay || 3000
  if (state.timer) {
    clearTimeout(state.timer)
  }
  state.timer = setTimeout(function () {
    fn.apply(state)
  }, delay)
}

/**
 * 判断数据是否在数组中
 * @param value
 * @param validList
 * @param key 匹配的关键字
 * @returns {boolean}
 */
export const oneOf = (
  value: { [x: string]: any },
  validList: any[],
  key: string | number
) => {
  const result = false
  //判读数组是否有值
  if (validList.length <= 0) {
    return result
  }

  //对象数组
  if (key) {
    let result = false
    validList.forEach((item: { [x: string]: any }) => {
      if (item[key] === value[key]) {
        result = true
      }
    })
    return result
  }

  //普通数组
  for (let i = 0; i < validList.length; i++) {
    //普通数组
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
