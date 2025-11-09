import { useEffect, useCallback, useRef } from 'react'
import { useAppDispatch } from '@/store/hooks'
import { updateTokenPrice } from '@/store/slices/tokenSlice'

export function useWebSocket() {
  const dispatch = useAppDispatch()
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const simulatePriceUpdate = useCallback(() => {
    const tokenIds = ['token-1', 'token-2', 'token-3', 'token-4', 'token-5']
    const randomId = tokenIds[Math.floor(Math.random() * tokenIds.length)]
    const priceChange = (Math.random() - 0.5) * 0.1
    const basePrice = 0.0001 + Math.random() * 0.01
    
    dispatch(updateTokenPrice({
      id: randomId,
      price: basePrice,
      priceChange24h: priceChange * 100,
    }))
  }, [dispatch])

  useEffect(() => {
    intervalRef.current = setInterval(simulatePriceUpdate, 3000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [simulatePriceUpdate])
}