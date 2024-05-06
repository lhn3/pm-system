import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter } from 'react-router-dom'

import 'normalize.css'
import '@/assets/css/reset.less'
import 'antd/dist/antd.less'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HashRouter>
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <App />
    </React.Suspense>
  </HashRouter>
)
