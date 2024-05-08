import React, { memo, useEffect } from 'react'
import { useLocation, useRoutes, useNavigate } from 'react-router-dom'
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import homeSlice, { userInfoAction } from '@/store/home-slice'
import { routes } from './router'
import localCache from '@/utils/cache.ts'

const App = memo(() => {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const { token } = useSelector(
    state => ({
      token: state.home.token
    }),
    shallowEqual
  )

  /**刷新页面保持仓库数据持久化，主要保存登录后的信息*/
  useEffect(() => {
    let token = localCache.getCache('pm-token') || '' // 本地获取token
    if (token) {
      dispatch(homeSlice.actions.setToken(token)) //设置token
      dispatch(userInfoAction(token)) //通过token获取用户信息
    }
  }, [])

  /**每次路由变化校验是否登录*/
  useEffect(() => {
    if (!token && location.pathname !== '/login') {
      navigateTo('/login')
    } else if (token && location.pathname === '/login') {
      navigateTo('/home')
    }
  }, [location.pathname])
  return <>{useRoutes(routes)}</>
})

export default App
