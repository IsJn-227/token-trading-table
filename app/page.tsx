'use client'

import { mockTokens } from '@/lib/mockData'

export default function Home() {
  console.log('🎯 TEST PAGE - mockTokens:', mockTokens)
  console.log('🎯 Total tokens:', mockTokens.length)
  
  const newPairs = mockTokens.filter(t => t.category === 'new-pairs')
  const finalStretch = mockTokens.filter(t => t.category === 'final-stretch')
  const migrated = mockTokens.filter(t => t.category === 'migrated')
  
  console.log('🎯 New pairs:', newPairs.length)
  console.log('🎯 Final stretch:', finalStretch.length)
  console.log('🎯 Migrated:', migrated.length)

  return (
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Token Test Page</h1>
      
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Debug Info:</h2>
        <p>Total tokens: {mockTokens.length}</p>
        <p>New Pairs: {newPairs.length}</p>
        <p>Final Stretch: {finalStretch.length}</p>
        <p>Migrated: {migrated.length}</p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-green-400">New Pairs ({newPairs.length})</h2>
          <div className="space-y-2">
            {newPairs.map(token => (
              <div key={token.id} className="bg-gray-800 p-4 rounded">
                <p className="font-bold">{token.name} ({token.symbol})</p>
                <p className="text-sm text-gray-400">Price: ${token.price.toFixed(6)}</p>
                <p className="text-sm text-gray-400">Category: {token.category}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Final Stretch ({finalStretch.length})</h2>
          <div className="space-y-2">
            {finalStretch.map(token => (
              <div key={token.id} className="bg-gray-800 p-4 rounded">
                <p className="font-bold">{token.name} ({token.symbol})</p>
                <p className="text-sm text-gray-400">Price: ${token.price.toFixed(6)}</p>
                <p className="text-sm text-gray-400">Category: {token.category}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-blue-400">Migrated ({migrated.length})</h2>
          <div className="space-y-2">
            {migrated.map(token => (
              <div key={token.id} className="bg-gray-800 p-4 rounded">
                <p className="font-bold">{token.name} ({token.symbol})</p>
                <p className="text-sm text-gray-400">Price: ${token.price.toFixed(6)}</p>
                <p className="text-sm text-gray-400">Category: {token.category}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
