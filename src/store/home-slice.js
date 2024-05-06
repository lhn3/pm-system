import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// 异步请求action
export const homeAction = createAsyncThunk(
  'home',
  async (val, { dispatch, getState }) => {
    dispatch(homeSlice.actions.setValue('初始值'))
  }
)

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    initValue: '111'
  },
  reducers: {
    setValue(state, action) {
      state.initValue = action.payload
    }
  }
})

export default homeSlice
