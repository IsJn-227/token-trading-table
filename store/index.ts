import { configureStore } from '@reduxjs/toolkit'
import tokenReducer from './slices/tokenSlice'
import filterReducer from './slices/filterSlice'

export const store = configureStore({
  reducer: {
    tokens: tokenReducer,
    filters: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch