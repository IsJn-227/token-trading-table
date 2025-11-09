import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAppDispatch } from '@/store/hooks'
import { setTokens, setLoading, setError } from '@/store/slices/tokenSlice'
import { mockTokens } from '@/lib/mockData'
import { Token } from '@/types/token'

// Simulate API call
const fetchTokens = async (): Promise<Token[]> => {
  console.log('🔄 fetchTokens called')
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  console.log('✅ Returning mockTokens:', mockTokens.length, 'tokens')
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
    console.log('📊 useTokenData effect - isLoading:', isLoading, 'error:', error, 'data:', data?.length)
    
    if (isLoading) {
      dispatch(setLoading(true))
    } else if (error) {
      dispatch(setError((error as Error).message))
    } else if (data) {
      console.log('✅ Dispatching setTokens with', data.length, 'tokens')
      dispatch(setTokens(data))
    }
  }, [data, isLoading, error, dispatch])

  return { data, isLoading, error }
}
