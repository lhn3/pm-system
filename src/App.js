import React, { memo, useEffect } from 'react'
import { useLocation, useRoutes } from 'react-router-dom'
import { routes } from './router'
import { DatePicker } from 'antd'
const App = memo(() => {
  const location = useLocation()

  useEffect(() => {
    console.log(1111)
  }, [location.pathname])

  return (
    <div className="app">
      <div className="pages">{useRoutes(routes)}</div>
      <DatePicker />
    </div>
  )
})

export default App
