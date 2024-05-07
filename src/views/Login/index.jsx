import React, { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import homeSlice, { userInfoAction } from '@/store/home-slice'
import LoginWrapper from './style'
import { Button } from 'antd'

const Login = memo(() => {
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  /**登录*/
  const toLogin = async () => {
    // 请求获取token
    // let res = await geToken()
    let token = '123456'
    dispatch(homeSlice.actions.setToken(token)) //设置token
    dispatch(userInfoAction(token)) //根据token获取用户信息
    navigateTo('/home') //路由跳转
  }

  return (
    <LoginWrapper>
      <div className="title">Login</div>
      <div>123</div>
      <Button type="primary" onClick={() => toLogin()}>
        登录
      </Button>
    </LoginWrapper>
  )
})

export default Login
