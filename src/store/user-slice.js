import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import localCache from '@/utils/cache.ts'

// 异步请求action
export const userInfoAction = createAsyncThunk('userInfo', async (val, { dispatch, getState }) => {
  // let res = await getUserInfo()
  dispatch(
    userSlice.actions.setUserInfo({
      username: val.username,
      avatar: val.avatar || 'https://picsum.photos/300/300.jpg'
    })
  )
})

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    username: '',
    avatar: ''
  },
  reducers: {
    // 保存token
    setToken(state, action) {
      state.token = action.payload
      localCache.setCache('pm-token', action.payload) //设置到本地缓存
    },
    // 保存用户信息
    setUserInfo(state, action) {
      state.username = action.payload.username
      state.avatar = action.payload.avatar
    },
    //清空redux和本地
    clearUserInfo(state) {
      state.token = ''
      state.username = ''
      state.avatar = ''
      localCache.clearCache()
    }
  }
})

export default userSlice
