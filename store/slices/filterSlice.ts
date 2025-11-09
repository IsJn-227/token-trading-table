import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  minMarketCap: number
  maxMarketCap: number | typeof Infinity
  minHolders: number
  hideHoneypots: boolean
  verifiedOnly: boolean
}

const initialState: FilterState = {
  minMarketCap: 0,
  maxMarketCap: Infinity,
  minHolders: 0,
  hideHoneypots: true,
  verifiedOnly: false
}

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload }
    },
    resetFilters: () => initialState
  }
})

export const { setFilter, resetFilters } = filterSlice.actions
export default filterSlice.reducer
