import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/store/user-slice'

// 已经集成了thunk中间件和devTools
const store = configureStore({
  reducer: {
    user: userSlice.reducer
  }
})

export default store
