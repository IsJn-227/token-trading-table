import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface FilterState {
  search: string
  minPrice: number | null
  maxPrice: number | null
  minVolume: number | null
  verified: boolean | null
  trending: boolean | null
  minMarketCap: number
  maxMarketCap: number | typeof Infinity
  minHolders: number
  hideHoneypots: boolean
  verifiedOnly: boolean
}

const initialState: FilterState = {
  search: '',
  minPrice: null,
  maxPrice: null,
  minVolume: null,
  verified: null,
  trending: null,
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
      Object.assign(state, action.payload)
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setPriceRange: (state, action: PayloadAction<{ min: number | null; max: number | null }>) => {
      state.minPrice = action.payload.min
      state.maxPrice = action.payload.max
    },
    setMinVolume: (state, action: PayloadAction<number | null>) => {
      state.minVolume = action.payload
    },
    setVerified: (state, action: PayloadAction<boolean | null>) => {
      state.verified = action.payload
    },
    setTrending: (state, action: PayloadAction<boolean | null>) => {
      state.trending = action.payload
    },
    setMinMarketCap: (state, action: PayloadAction<number>) => {
      state.minMarketCap = action.payload
    },
    setMaxMarketCap: (state, action: PayloadAction<number | typeof Infinity>) => {
      state.maxMarketCap = action.payload
    },
    setMinHolders: (state, action: PayloadAction<number>) => {
      state.minHolders = action.payload
    },
    setHideHoneypots: (state, action: PayloadAction<boolean>) => {
      state.hideHoneypots = action.payload
    },
    setVerifiedOnly: (state, action: PayloadAction<boolean>) => {
      state.verifiedOnly = action.payload
    },
    resetFilters: (state) => {
      Object.assign(state, initialState)
    }
  }
})

export const {
  setFilter,
  setSearch,
  setPriceRange,
  setMinVolume,
  setVerified,
  setTrending,
  setMinMarketCap,
  setMaxMarketCap,
  setMinHolders,
  setHideHoneypots,
  setVerifiedOnly,
  resetFilters
} = filterSlice.actions

export default filterSlice.reducer
