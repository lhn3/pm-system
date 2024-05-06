import React from 'react'
import { Navigate } from 'react-router-dom'

// 路由懒加载
const Home = React.lazy(() => import('@/views/home/home'))

export const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />
  }
]
