import { configureStore } from '@reduxjs/toolkit'
import homeSlice from '@/store/home-slice'

// 已经集成了thunk中间件和devTools
const store = configureStore({
  reducer: {
    home: homeSlice.reducer
  }
})

export default store
