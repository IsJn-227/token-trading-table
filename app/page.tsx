'use client'

import { useEffect } from 'react'
import TokenTableContainer from '@/components/TokenTable/TokenTableContainer'

export default function Home() {
  useEffect(() => {
    console.log('🚀 HOME PAGE MOUNTED - React is running!')
  }, [])

  console.log('🎯 HOME COMPONENT RENDERING')

  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">🚀 Token Trading Table</h1>
        <p className="text-green-400 mb-4">✅ If you see this, the page is rendering!</p>
        <TokenTableContainer />
      </div>
    </main>
  )
}
