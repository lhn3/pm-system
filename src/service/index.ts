import myRequest from './request/index.ts'
import { BASE_URL, TIME_OUT } from './request/config.ts'
import localCache from '@/utils/cache.ts'

//创建一个请求实例
const myAxios = new myRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  //自定义传入拦截器
  interceptors: {
    requestInterceptor(config) {
      config.headers['Content-type'] = 'application/json;charset=utf-8'
      //携带token发送请求
      const token = localCache.getCache('pm-token')
      if (token) config.headers!.Authorization = token
      return config
    }
  }
})

export default myAxios
