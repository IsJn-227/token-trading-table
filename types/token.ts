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
}
