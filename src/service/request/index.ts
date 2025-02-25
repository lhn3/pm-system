import axios from 'axios'
import type { AxiosInstance } from 'axios'
import NProgress from 'nprogress'

//导入自己封装的类型
import type { RequestInterceptors, myRequestConfig } from './type'

//创建封装axios类
export default class myRequest {
  instance: AxiosInstance
  interceptors?: RequestInterceptors
  loading?: any

  //baseConfig用自己添加了拦截器的AxiosRequestConfig类型
  //创建实例化之后即调用
  //myRequestConfig自己定义的类型
  constructor(baseConfig: myRequestConfig) {
    //创建axios实例对象
    this.instance = axios.create(baseConfig)

    //传入的拦截器
    this.interceptors = baseConfig.interceptors

    //传入的请求拦截注册到拦截器中
    this.instance.interceptors.request.use(this.interceptors?.requestInterceptor as any, this.interceptors?.requestInterceptorCatch)

    //响应拦截
    this.instance.interceptors.response.use(this.interceptors?.responseInterceptor, this.interceptors?.responseInterceptorCatch)

    //定义全部请求拦截器
    this.instance.interceptors.request.use(config => {
      console.log('全部请求拦截，成功')
      //定请求时的加载动画
      NProgress.start() // 开始加载
      return config
    })
    this.instance.interceptors.response.use(
      res => {
        console.log('全部响应拦截，成功')
        //删除加载动画
        NProgress.done() // 加载完成
        return res.data
      },
      err => {
        //删除加载动画
        return err
      }
    )
  }

  //  定义request方法
  request<T>(config: myRequestConfig): Promise<T> {
    //返回一个promise
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
          return err
        })
    })
  }

  get<T>(config: myRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: myRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: myRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  put<T>(config: myRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PUT' })
  }
  patch<T>(config: myRequestConfig): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}
