import React, { memo } from 'react'
import { Input, Form } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

const UsernameLogin = memo(() => {
  return (
    <>
      <Form.Item
        name="accountName"
        hasFeedback
        rules={[
          { required: true, message: '请输入用户名!' },
          { max: 18, min: 3, message: '请输入3-18位用户名!' }
        ]}
      >
        <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        hasFeedback
        rules={[
          { required: true, message: '请输入密码!' },
          { max: 18, min: 3, message: '请输入3-18位密码!' }
        ]}
      >
        <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
      </Form.Item>
    </>
  )
})

export default UsernameLogin
