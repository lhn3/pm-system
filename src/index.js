import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from '@/store'
import { ThemeProvider } from 'styled-components'

import 'nprogress/nprogress.css'
import 'normalize.css'
import '@/assets/css/common.scss'
import 'antd/dist/antd.less'
import { baseTheme } from '@/assets/theme'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <Provider store={store}>
      <React.Suspense fallback={<h1>Loading...</h1>}>
        {/* 主题参数,子组件的样式组件可以直接获取props.theme*/}
        <ThemeProvider theme={baseTheme}>
          <App />
        </ThemeProvider>
      </React.Suspense>
    </Provider>
  </HashRouter>
)
