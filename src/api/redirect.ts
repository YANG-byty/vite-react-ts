import config from '../config'

const baseUrl = config.Setting.apiBaseURL
// 浙政钉登录
export function authLogin() {
  let url = `${baseUrl}/duty/auth/client/login?redirect_uri=${config.Setting.OAUTH_REDIRECT_URI}`
  return url
}
// 浙政钉扫码登录
export function scanLogin() {
  let url = `${baseUrl}/duty/auth/client/login?typeId=n6289zgdwjg4v258vazsc6uc7x7dqx8o&redirect_uri=${config.Setting.OAUTH_REDIRECT_URI}`
  return url
}
// 退出登录
export function authLogout() {
  let url = `${baseUrl}/duty/auth/client/logout?redirect_url=${config.Setting.OAUTH_REDIRECT_URI}`
  return url
}
// export function authLogout() {
//   let url = `${baseUrl}/duty/auth/client/logout?redirect_url=${config.Setting.ZZD_OAUTH_REDIRECT_URI_SC}`
//   return url
// }
