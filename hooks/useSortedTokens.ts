import { useMemo } from 'react'
import { Token } from '@/types/token'
import { SortField, SortDirection } from '@/types/token'

interface SortConfig {
  field: SortField | null
  direction: SortDirection
}

export function useSortedTokens(tokens: Token[], sortConfig: SortConfig) {
  const sortedTokens = useMemo(() => {
    if (!sortConfig.field) return tokens

    const sorted = [...tokens].sort((a, b) => {
      const aValue = a[sortConfig.field!]
      const bValue = b[sortConfig.field!]

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      return 0
    })

    return sorted
  }, [tokens, sortConfig])

  return sortedTokens
}