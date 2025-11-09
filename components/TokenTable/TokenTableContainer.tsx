"use client";

import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/index";
import TokenTable from "./TokenTable";
import { useTokenData } from "@/hooks/useTokenData";
import { useWebSocket } from "@/hooks/useWebSocket";
import LoadingSpinner from "../ui/LoadingSpinner";
import ErrorMessage from "../ui/ErrorMessage";

export default function TokenTableContainer() {
  useTokenData();
  useWebSocket();

  const { items: tokens, loading: isLoading, error } = useSelector(
    (state: RootState) => state.tokens
  );

  console.log('🎯 TokenTableContainer state:', {
    tokensCount: tokens?.length,
    isLoading,
    error,
    firstToken: tokens?.[0]?.name
  });

  if (isLoading) {
    console.log('⏳ Still loading...');
    return <LoadingSpinner />;
  }

  if (error) {
    console.error('❌ Error:', error);
    return <ErrorMessage message={error} />;
  }

  if (!tokens || tokens.length === 0) {
    console.warn('⚠️ No tokens in Redux store!');
    return (
      <div className="text-white p-8 bg-red-900/20 border border-red-500 rounded">
        <h1 className="text-2xl mb-4">⚠️ No tokens loaded</h1>
        <p>Redux state: {JSON.stringify({ tokensCount: tokens?.length, isLoading, error })}</p>
        <p className="mt-2">Check console for more details</p>
      </div>
    );
  }

  const newPairs = tokens.filter(t => t.category === 'new-pairs');
  const finalStretch = tokens.filter(t => t.category === 'final-stretch');
  const migrated = tokens.filter(t => t.category === 'migrated');

  console.log('📊 Category breakdown:', {
    total: tokens.length,
    newPairs: newPairs.length,
    finalStretch: finalStretch.length,
    migrated: migrated.length
  });

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-green-400">
          ✅ New Pairs ({newPairs.length})
        </h2>
        <TokenTable category="new-pairs" tokens={tokens} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-yellow-400">
          ⚡ Final Stretch ({finalStretch.length})
        </h2>
        <TokenTable category="final-stretch" tokens={tokens} />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4 text-blue-400">
          🚀 Migrated ({migrated.length})
        </h2>
        <TokenTable category="migrated" tokens={tokens} />
      </section>
    </div>
  );
}
