import TokenTableContainer from '@/components/TokenTable/TokenTableContainer'

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <TokenTableContainer />
      </div>
    </main>
  )
}