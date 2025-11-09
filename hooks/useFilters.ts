import { useMemo } from 'react'
import { useAppSelector } from '@/store/hooks'
import { Token } from '@/types/token'

export function useFilters(tokens: Token[]) {
  const filters = useAppSelector((state) => state.filters)

  const filteredTokens = useMemo(() => {
    return tokens.filter((token) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase()
        const matchesSearch =
          token.name.toLowerCase().includes(searchLower) ||
          token.symbol.toLowerCase().includes(searchLower)
        if (!matchesSearch) return false
      }

      // Price range filter
      if (filters.minPrice !== null && token.price < filters.minPrice) return false
      if (filters.maxPrice !== null && token.price > filters.maxPrice) return false

      // Volume filter
      if (filters.minVolume !== null && token.volume24h < filters.minVolume) return false

      // Verified filter
      if (filters.verified !== null && token.verified !== filters.verified) return false

      // Trending filter
      if (filters.trending !== null && token.trending !== filters.trending) return false

      return true
    })
  }, [tokens, filters])

  return filteredTokens
}