import React, { memo } from 'react'
import { Form, Input } from 'antd'
import { LockOutlined } from '@ant-design/icons'

const ForgotPassword = memo(() => {
  return (
    <>
      <Form.Item
        name="oldPassword"
        hasFeedback
        rules={[
          { required: true, message: '请输入旧密码!' },
          { max: 18, min: 3, message: '请输入3-18位旧密码!' }
        ]}
      >
        <Input.Password placeholder="请输入旧密码" prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item
        name="newPassword"
        hasFeedback
        rules={[
          { required: true, message: '请输入新密码!' },
          { max: 18, min: 3, message: '请输入3-18位新密码!' }
        ]}
      >
        <Input.Password placeholder="请输入新密码" prefix={<LockOutlined />} />
      </Form.Item>
    </>
  )
})

export default ForgotPassword
