import { Token } from '@/store/slices/tokenSlice'

const tokenNames = [
  'Solana Dog', 'Moon Token', 'Degen Ape', 'Pepe Coin', 'Shiba Moon',
  'Rocket Dog', 'Space Pepe', 'Diamond Hands', 'To The Moon', 'Lambo Coin',
  'SafeMoon V2', 'ElonDoge', 'BabyShark', 'MoonRocket', 'DiamondPaws'
]

const symbols = ['SOLDOG', 'MOON', 'DAPE', 'PEPE', 'SHMOON', 'RDOG', 'SPEPE', 'DMOND', 'TTM', 'LAMBO', 'SAFE', 'EDOGE', 'BSHARK', 'MRKT', 'DPAWS']

const categories: Array<'new-pairs' | 'final-stretch' | 'migrated'> = ['new-pairs', 'final-stretch', 'migrated']

export function generateMockTokens(count: number): Token[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `token-${i + 1}`,
    name: tokenNames[i % tokenNames.length],
    symbol: symbols[i % symbols.length],
    contractAddress: `0x${Math.random().toString(16).substr(2, 40)}`,
    price: Math.random() * 0.01,
    priceChange24h: (Math.random() - 0.5) * 20,
    marketCap: Math.random() * 20000000,
    volume24h: Math.random() * 5000000,
    liquidity: Math.random() * 2000000,
    holders: Math.floor(Math.random() * 10000),
    age: Math.floor(Math.random() * 72),
    transactions: Math.floor(Math.random() * 5000),
    numBuys: Math.floor(Math.random() * 3000),
    numSells: Math.floor(Math.random() * 2000),
    verified: Math.random() > 0.7,
    honeypot: Math.random() > 0.9,
    devHolding: Math.random() * 15,
    top10Holders: Math.random() * 60,
    snipersPercent: Math.random() * 25,
    insidersPercent: Math.random() * 15,
    priceDirection: 'neutral' as const,
    trending: Math.random() > 0.5,
    category: categories[i % 3]
  }))
}

export const mockTokens = generateMockTokens(30);
