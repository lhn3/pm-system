import React, { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import userSlice, { userInfoAction } from '@/store/user-slice'
import LoginWrapper from './style'
import UsernameLogin from './cpns/username-login'
import ForgotPassword from './cpns/forgot-password'
import MobileLogin from './cpns/mobile-login'
import { Button, Form, message, Spin } from 'antd'
import { loginRequest, checkCode, resetPassword } from '@/service/Api.ts'

const Login = memo(() => {
  const staticInfo = {
    cardTitle: ['用户名登录', '手机验证码登录', '忘记密码', '修改密码'],
    btnTitle: ['登录', '登录', '下一步', '完成']
  }
  const dispatch = useDispatch()
  const navigateTo = useNavigate()
  const [cardType, setCardType] = useState(0) //0:用户名登录 1: 手机验证码登录 2: 忘记密码(发送手机验证) 3: 修改密码
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  /**表单校验规则*/

  /**改变表单重置数据*/
  useEffect(() => {
    form.resetFields()
  }, [cardType])

  /**根据不同状态展示不同表单*/
  const showComponent = () => {
    if (cardType === 0) {
      return <UsernameLogin />
    } else if (cardType === 1 || cardType === 2) {
      return <MobileLogin cardType={cardType} formProxy={form} setLoading={value => setLoading(value)} />
    } else if (cardType === 3) {
      return <ForgotPassword />
    }
  }

  /**按钮点击*/
  const btnClick = () => {
    if (cardType === 0 || cardType === 1) {
      // 直接提交
      form.submit()
    } else {
      // 忘记密码操作
      form
        .validateFields()
        .then(async res => {
          if (cardType === 2) {
            //发送请求进入修改密码
            setLoading(true)
            let res = await checkCode({ smCode: form.getFieldValue('code') })
            setLoading(false)
            if (res.code !== 0 || !res.data) return message.error(res.msg)
            message.success(res.msg)
            setCardType(3)
          } else if (cardType === 3) {
            if (form.getFieldValue('oldPassword') === form.getFieldValue('newPassword')) {
              //两次密码一致发送请求修改密码
              setLoading(true)
              let res = await resetPassword({ newPassword: form.getFieldValue('newPassword') })
              if (res.code !== 0 || !res.data) return message.error(res.msg)
              setLoading(false)
              setCardType(0)
            } else {
              // 两次密码不一致提示错误
              message.error('两次密码不一致！')
            }
          }
        })
        .catch(() => {})
    }
  }

  /**登录*/
  const toLogin = async value => {
    // 手机号码登录需要先判断验证码是否正确
    if (cardType === 1) {
      setLoading(true)
      let codeRes = await checkCode({ smCode: form.getFieldValue('code') })
      setLoading(false)
      if (codeRes.code !== 0 || !codeRes.data) return message.error(codeRes.msg)
    }
    setLoading(true)
    let res = await loginRequest({ type: cardType, ...value })
    setLoading(false)
    if (res.code !== 0 || !res.data) return message.error(res.msg)
    message.success(res.msg)
    let { userName: username, avatar, department: token } = res.data
    dispatch(userSlice.actions.setToken(token)) //设置token
    dispatch(userInfoAction({ username, avatar, token })) //根据token获取用户信息
    navigateTo('/home') //路由跳转
  }

  return (
    <LoginWrapper>
      <Spin spinning={loading}>
        <div className="mian">
          <div className="card-title">{staticInfo.cardTitle[cardType]}</div>

          <Form form={form} name="basic" initialValues={{ remember: true }} onFinish={values => toLogin(values)} autoComplete="off">
            {showComponent()}
          </Form>
          <Button style={{ marginBottom: '20px' }} type="primary" block onClick={() => btnClick()}>
            {staticInfo.btnTitle[cardType]}
          </Button>

          <div className="login-type">
            <div>
              {[2, 3].includes(cardType) ? (
                <span onClick={() => setCardType(0)}>← 返回</span>
              ) : (
                <span onClick={() => setCardType(2)}>← 忘记密码？</span>
              )}
            </div>
            <div>
              {cardType === 1 ? (
                <span onClick={() => setCardType(0)}>返回 →</span>
              ) : (
                <span onClick={() => setCardType(1)}>使用手机号码登录 →</span>
              )}
            </div>
          </div>
        </div>
      </Spin>
    </LoginWrapper>
  )
})

export default Login
