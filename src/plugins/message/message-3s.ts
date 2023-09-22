import { message } from 'antd'

let timer: any = null
let flag = true
const resetMessage = (options: any, type: string) => {
  if (flag) {
    message[type](options)
    flag = false
    clearTimeout(timer)
    timer = setTimeout(() => {
      flag = true
    }, 3000)
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
].forEach((type: string) => {
  resetMessage[type] = (options: any) => {
    if (typeof options === 'string') {
      options = {
        content: options,
      }
    }
    return resetMessage(options, type)
  }
})

export default resetMessage
