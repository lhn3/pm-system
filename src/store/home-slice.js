import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import localCache from '@/utils/cache.ts'

// 异步请求action
export const userInfoAction = createAsyncThunk(
  'home',
  async (val, { dispatch, getState }) => {
    // let res = await getUserInfo()
    dispatch(
      homeSlice.actions.setUserInfo({
        username: '西兰花',
        avatar: 'https://picsum.photos/300/300.jpg'
      })
    )
  }
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    initValue: '',
    token: '',
    user: {
      username: '',
      avatar: ''
    }
  },
  reducers: {
    // 保存token
    setToken(state, action) {
      state.token = action.payload
      localCache.setCache('pm-token', action.payload) //设置到本地缓存
    },
    // 保存用户信息
    setUserInfo(state, action) {
      state.user = action.payload
    },
    //清空redux和本地
    clearUserInfo(state) {
      state.token = ''
      state.user = {
        username: '',
        avatar: ''
      }
      localCache.clearCache()
    }
  }
})

export default homeSlice
