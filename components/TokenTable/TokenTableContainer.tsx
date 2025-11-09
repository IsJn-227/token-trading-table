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

  console.log('🎨 TokenTableContainer render - tokens:', tokens.length, 'loading:', isLoading, 'error:', error);

  if (isLoading) {
    console.log('⏳ Showing loading spinner');
    return <LoadingSpinner />;
  }

  if (error) {
    console.log('❌ Showing error:', error);
    return <ErrorMessage message={error} />;
  }

  console.log('✅ Rendering tables with', tokens.length, 'tokens');

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">New Pairs</h2>
        <TokenTable category="new-pairs" tokens={tokens} />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Final Stretch</h2>
        <TokenTable category="final-stretch" tokens={tokens} />
      </div>
      
      <div>
        <h2 className="text-2xl font-bold mb-4 text-white">Migrated</h2>
        <TokenTable category="migrated" tokens={tokens} />
      </div>
    </div>
  );
}
