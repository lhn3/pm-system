import React from 'react'
import { Navigate } from 'react-router-dom'

// 路由懒加载
const Home = React.lazy(() => import('@/views/Home'))
const Login = React.lazy(() => import('@/views/Login'))
const NotFound = React.lazy(() => import('@/views/NotFound'))

export const routes = [
  {
    path: '/',
    element: <Navigate to="/home" />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '*',
    element: <NotFound />
  }
]
