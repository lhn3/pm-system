import React, { memo } from 'react'
import { shallowEqual, useSelector, useDispatch } from 'react-redux'
import homeSlice, { homeAction } from '@/store/home-slice'
import { Button } from 'antd'

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
    <>
      <div>home</div>
      <div>123</div>
      <div>{initValue}---</div>
      <Button type="primary" onClick={() => changeValue()}>
        改值
      </Button>
    </>
  )
})

export default home
