import { message } from 'antd'

/**
 * 注意: 正常操作的提示不应在这里控制节流,而是应该在触发方法的地方控制方法触发节流
 *
 */

const limit = 2 // 同时只能存在几个message
let instanceList: Array<[]> = [] // message对象列表
const resetMessage = (type: string, options: any) => {
  if (limit > 1) {
    if (instanceList.length >= limit) {
      let splitNum = instanceList.length - (limit - 1) // [0,1,2,3] 4 - 1 = 3
      instanceList.slice(0, splitNum).forEach((item: any) => {
        item()
      })
      instanceList = instanceList.slice(splitNum)
      setTimeout(() => {
        // 倒计时原因: message消失有个消失动画,会和添加同时进行,很奇怪
        instanceList.push(message[type](options))
      }, 100)
    } else {
      instanceList.push(message[type](options))
    }
  } else {
    message.destroy()
    message[type](options)
  }
}
;[
  'error',
  'success',
  'info',
  'warning',
  'loading',
  'config',
  'destroy',
].forEach((type) => {
  resetMessage[type] = (options: any) => {
    if (typeof options === 'string') {
      options = {
        content: options,
      }
    }
    return resetMessage(type, options)
  }
})

export default resetMessage
