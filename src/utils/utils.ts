// import { useUserStore, useOtherStore } from '@/stores'

// const user: any = useUserStore()
// const other: any = useOtherStore()
const user: any = {}
const other: any = {}

/**
 * 检查是否有权限
 * @param permission 所有权限数组
 * @param key 某个权限
 * @returns
 */
export const checkPermission = (permission: string[], key: string): boolean => {
  return permission.includes(key)
}

/**获取uuid*/
export const getUuid = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 判断是否是某个类型的数据
 * @param type 类型
 * @param value 值
 */
type typeType = 'email' | 'mobile' | 'phone' | 'url' | 'int' | 'code'
export const isType = (type: typeType, value: string): boolean => {
  let flag = false
  switch (type) {
    case 'email':
      flag =
        /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(
          value
        )
      break
    case 'mobile':
      flag = /^1[0-9]{10}$/.test(value)
      break
    case 'phone':
      flag = /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(value)
      break
    case 'url':
      flag = /^http[s]?:\/\/.*/.test(value)
      break
    case 'int':
      flag = /^\+?[1-9][0-9]*$/.test(value)
      break
    case 'code':
      flag = /^[0-9]{4}$/.test(value)
      break
    default:
      break
  }
  return flag
}

/**将当前时间戳转换成时间格式*/
export const formateDate = (now: number, sfm = true) => {
  const date = new Date(now)
  const y = date.getFullYear()
  let m = (date.getMonth() + 1) as string | number
  let d = date.getDate() as string | number
  let h = date.getHours() as string | number
  let mi = date.getMinutes() as string | number
  let ss = date.getSeconds() as string | number
  m = Number(m) > 9 ? m : '0' + m
  mi = Number(mi) > 9 ? mi : '0' + mi
  d = Number(d) > 9 ? d : '0' + d
  h = Number(h) > 9 ? h : '0' + h
  ss = Number(ss) > 9 ? ss : '0' + ss
  return y + '-' + m + '-' + d + (sfm ? ' ' + h + ':' + mi + ':' + ss : '')
}

/**
 * 防抖
 * @param fn 防抖的函数
 * @param time 时间
 * @param immediate 是否第一次执行
 */
export const debounce = (fn: any, time: number, immediate: boolean = false) => {
  let timer: any = null
  //作为每一次输入的第一次立即执行标识
  let num = 1

  //为绑定this，不能使用箭头函数
  return function (...args: Array<any>) {
    return new Promise((resolve) => {
      if (timer) clearTimeout(timer)

      //是否需要立即执行
      if (immediate && num) {
        const res = fn.apply(this, args)
        num = 0
        resolve(res)
      } else {
        timer = setTimeout(() => {
          const res = fn.apply(this, args)
          num = 1
          resolve(res)
        }, time)
      }
    })
  }
}

/**
 * 节流函数，默认第一次触发，最后一次不触发
 * @param fn 节流函数
 * @param time 时间
 * @param first 第一次是否触发
 * @param last 最后一次是否触发
 */
export const throttle = (
  fn: any,
  time: number,
  first: boolean = true,
  last: boolean = false
) => {
  //上一次执行后的时间
  let lastTime = 0
  //最后一次是否触发设置定时器
  let timer: any = null

  return function (...args: Array<any>) {
    return new Promise((resolve) => {
      if (timer) clearTimeout(timer)

      //这次执行的时间
      const nowTime = new Date().getTime()
      //第一次若是不执行
      if (!first && !lastTime) lastTime = nowTime
      //两次触发的时间差与节流时间差(剩余时间)
      const remainTime = time - (nowTime - lastTime)

      if (remainTime <= 0) {
        const res = fn.apply(this, args)
        lastTime = nowTime
        resolve(res)
      } else if (last) {
        //最后一次是否执行
        timer = setTimeout(() => {
          const res = fn.apply(this, args)
          lastTime = first ? nowTime : new Date().getTime()
          resolve(res)
        }, remainTime)
      }
    })
  }
}

/**获取焦点，并将光标移动到最后*/
export const moveCursor = (): void => {
  const dom: any = other.otherInfo.inputDom
  dom.click()
  dom.focus()
  //ie11 10 9 ff safari
  if (window.getSelection) {
    const range = window.getSelection() //创建range
    range?.selectAllChildren(dom) //range 选择dom下所有子内容
    range?.collapseToEnd() //光标移至最后
  }
}

/**将聊天窗的滚动条滚动到底部*/
export const scrollToBottom = (): void => {
  const dom: any = other.otherInfo.chattingBodyDom
  const scrollHeight: number = dom.scrollHeight
  const clientHeight: number = dom.clientHeight
  //滚动到最底部
  dom.scrollTop = scrollHeight - clientHeight
}

/**
 * 获取token
 */
export const getToken = () => {
  return user.userInfo.token || false
}

/**获取光标位置*/
export const getCursorCoordinates = () => {
  let rect, offset
  if (window.getSelection && window.getSelection().rangeCount > 0) {
    const range = window.getSelection().getRangeAt(0)
    offset = range.startOffset
    rect = range.getBoundingClientRect()
    return {
      // 在整个窗口的位置
      left: rect.left,
      top: rect.top,
      // 光标位置
      offset: offset
    }
  }
  return {}
}

/**获取文件base64格式信息*/
export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (res) => resolve(res.target.result)
    reader.onerror = (error) => reject(error)
  })
}
export { deepClone } from '@/utils/deepClone'
