import React, { memo } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import homeSlice, { homeAction } from '@/store/home-slice'
import { Button } from 'antd'
import { HomeWrapper } from './style'

const home = memo(() => {
  const dispatch = useDispatch()
  const { initValue } = useSelector(
    (state) => ({
      initValue: state.home.initValue
    }),
    shallowEqual
  )

  const changeValue = () => {
    dispatch(homeAction())
  }
  return (
    <HomeWrapper>
      <div className="title">home</div>
      <div>123</div>
      <div>{initValue}---</div>
      <Button type="primary" onClick={() => changeValue()}>
        改值
      </Button>
    </HomeWrapper>
  )
})

export default home
