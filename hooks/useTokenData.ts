import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppDispatch } from '@/store/hooks'
import { setTokens, setLoading, setError } from '@/store/slices/tokenSlice'
import { mockTokens } from '@/lib/mockData'
import { Token } from '@/types/token'

// Simulate API call
const fetchTokens = async (): Promise<Token[]> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  return mockTokens
}

export function useTokenData() {
  const dispatch = useAppDispatch()

  const { data, isLoading, error } = useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 30000, // 30 seconds
    refetchInterval: 30000, // Refetch every 30 seconds
  })

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading(true))
    } else if (error) {
      dispatch(setError((error as Error).message))
    } else if (data) {
      dispatch(setTokens(data))
    }
  }, [data, isLoading, error, dispatch])

  return { data, isLoading, error }
}