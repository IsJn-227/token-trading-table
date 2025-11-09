import ErrorBoundary from "@/components/core/ErrorBoundary";
import TokenTableShell from "@/components/TokenTable/TokenTableShell";

export default function Page(){
  return (
    <main className="min-h-screen bg-axiom">
      <div className="container-axiom">
        <ErrorBoundary>
          <TokenTableShell/>
        </ErrorBoundary>
      </div>
    </main>
  );
}
