export default {
  /**
   * 业务配置
   * */
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires: 1,

  Setting: {
    // 路由模式，可选值为 history 或 hash
    routerMode: 'history',
    // 应用的基路径
    routerBase: import.meta.env.VUE_APP_PUBLIC_PATH,
    // 页面切换时，是否显示模拟的进度条
    showProgressBar: true,
    // 接口请求地址
    apiBaseURL: import.meta.env.VITE_BASE_API,
    //认证回调地址
    OAUTH_REDIRECT_URI: import.meta.env.VITE_APP_TITLE,

    //token的默认前缀
    tokenDefaultKey: 'integration',

    modalDuration: 3,
    // 接口请求返回错误时，弹窗的类型，可选值为 Message 或 Notice
    errorModalType: 'Message',
    // Cookies 默认保存时间，单位：天
    cookiesExpires: 1,
  },
}
