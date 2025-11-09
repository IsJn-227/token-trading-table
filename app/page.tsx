import TokenTableContainer from '@/components/TokenTable/TokenTableContainer'

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white mb-8">🚀 Token Trading Table</h1>
        <TokenTableContainer />
      </div>
    </main>
  )
}
