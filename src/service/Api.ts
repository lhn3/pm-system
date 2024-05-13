import myAxios from './index.ts'

/**登录获取token*/
export const loginRequest = (data: any) => {
  return myAxios.post({ url: '/login', data })
}

/**获取手机验证码*/
export const getMobileCode = (params: any) => {
  return myAxios.get({ url: '/getCode', params })
}

/**判断验证码是否正确*/
export const checkCode = (params: any) => {
  return myAxios.get({ url: '/checkSmCode', params })
}

/**判断验证码是否正确*/
export const resetPassword = (params: any) => {
  return myAxios.post({ url: '/resetPassword', params })
}
