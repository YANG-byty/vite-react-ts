import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { ConfigProvider } from 'antd'
import locale from 'antd/es/locale/zh_CN'
import messageLImit from './plugins/message/message-limit'
// 全局挂载
React.$Message = messageLImit

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // 下面来对接react-redux与store，让全部组件都能方便引用store。
  <BrowserRouter>
    <Provider store={store}>
      <ConfigProvider locale={locale}>
        <App />
      </ConfigProvider>
    </Provider>
  </BrowserRouter>
)
