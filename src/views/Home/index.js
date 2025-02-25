import React, { memo } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import userSlice from '@/store/user-slice'
import { useNavigate } from 'react-router-dom'
import HomeWrapper from './style'
import { Button } from 'antd'

const Home = memo(() => {
  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const { token, username, avatar } = useSelector(
    state => ({
      token: state.user.token,
      username: state.user.username,
      avatar: state.user.avatar
    }),
    shallowEqual
  )

  /**退出登录*/
  const loginOut = () => {
    // 清除登录信息
    dispatch(userSlice.actions.clearUserInfo())
    navigateTo('/login')
  }
  return (
    <HomeWrapper>
      <div className="title">home</div>
      <div>123</div>
      <div>{username}---</div>
      <img src={avatar} alt="" />
      <Button type="primary" onClick={() => loginOut()}>
        退出登录
      </Button>
    </HomeWrapper>
  )
})

export default Home
