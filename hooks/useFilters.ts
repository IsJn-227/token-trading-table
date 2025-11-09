import { Token } from '@/types/token'

export function useFilters(tokens: Token[]): Token[] {
  // For now, return all tokens without filtering
  // This ensures tokens show up
  return tokens
}
