import React, { memo, useState } from 'react'
import { Form, InputNumber, message } from 'antd'
import MobileLoginWrapper from './style'
import { TabletOutlined, MailOutlined } from '@ant-design/icons'
import { getMobileCode } from '@/service/Api.ts'

const MobileLogin = memo(props => {
  const [second, setSecond] = useState(0)

  /**手机号码自定义验证规则*/
  const mobileValidate = (rule, value) => {
    if (!value) return Promise.reject('请输入手机号码!')
    if (/^1[3-9]\d{9}$/.test(value)) {
      return Promise.resolve()
    } else {
      return Promise.reject('手机号码格式错误!')
    }
  }

  /**验证码自定义验证规则*/
  const codeValidate = (rule, value) => {
    if (!value) return Promise.reject('请输入验证码!')
    if (/^\d{6}$/.test(value)) {
      return Promise.resolve()
    } else {
      return Promise.reject('验证码格式错误!')
    }
  }

  /**获取验证码开启倒计时*/
  const getCode = () => {
    if (second) return
    props.formProxy
      .validateFields(['mobile'])
      .then(async () => {
        //发送验证码
        props.setLoading(true)
        let res = await getMobileCode({ mobile: props.formProxy.getFieldValue('mobile'), type: props.cardType === 2 ? 'reset' : undefined })
        props.setLoading(false)
        if (res.code !== 0 || !res.data) return message.error(res.msg)
        message.success(res.msg)
        console.log('验证码:', res.data)

        // 开启倒计时
        let _second = 10
        setSecond(_second)
        let timer = setInterval(() => {
          if (_second <= 0) return clearInterval(timer)
          setSecond(--_second)
        }, 1000)
      })
      .catch(() => {})
  }

  return (
    <MobileLoginWrapper>
      <Form.Item name="mobile" hasFeedback rules={[{ validator: mobileValidate }]}>
        <InputNumber style={{ width: '100%' }} placeholder="请输入手机号码" controls={false} prefix={<TabletOutlined />} />
      </Form.Item>
      <Form.Item name="code" hasFeedback rules={[{ validator: codeValidate }]}>
        <div className="code-line">
          <InputNumber style={{ flex: 1 }} placeholder="请输入验证码" controls={false} prefix={<MailOutlined />} />
          <div className={`btn ${second && 'btn-dis'}`} onClick={() => getCode()}>
            {second > 0 ? `${second}s后重新获取` : '获取验证码'}
          </div>
        </div>
      </Form.Item>
    </MobileLoginWrapper>
  )
})

export default MobileLogin
