import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Token {
  id: string
  name: string
  symbol: string
  contractAddress: string
  price: number
  priceChange24h: number
  marketCap: number
  volume24h: number
  liquidity: number
  holders: number
  age: number
  transactions: number
  numBuys: number
  numSells: number
  verified: boolean
  honeypot: boolean
  devHolding: number
  top10Holders: number
  snipersPercent: number
  insidersPercent: number
  priceDirection?: 'up' | 'down' | 'neutral'
  lastUpdate?: number
  category?: 'new-pairs' | 'final-stretch' | 'migrated'
  trending?: boolean
}

export interface SortState {
  column: keyof Token | null
  direction: 'asc' | 'desc'
}

interface TokenState {
  items: Token[]
  loading: boolean
  error: string | null
  selectedToken: Token | null
  sortState: SortState
}

const initialState: TokenState = {
  items: [],
  loading: false,
  error: null,
  selectedToken: null,
  sortState: {
    column: null,
    direction: 'asc'
  }
}

const tokenSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (state, action: PayloadAction<Token[]>) => {
      state.items = action.payload
      state.loading = false
    },
    updateTokenPrice: (state, action: PayloadAction<{ id: string; price: number; priceChange24h: number }>) => {
      const token = state.items.find(t => t.id === action.payload.id)
      if (token) {
        const oldPrice = token.price
        token.price = action.payload.price
        token.priceChange24h = action.payload.priceChange24h
        token.priceDirection = action.payload.price > oldPrice ? 'up' : action.payload.price < oldPrice ? 'down' : 'neutral'
        token.lastUpdate = Date.now()
      }
    },
    setSelectedToken: (state, action: PayloadAction<Token | null>) => {
      state.selectedToken = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setSortState: (state, action: PayloadAction<SortState>) => {
      state.sortState = action.payload
    }
  }
})

export const { setTokens, updateTokenPrice, setSelectedToken, setLoading, setError, setSortState } = tokenSlice.actions
export default tokenSlice.reducer

