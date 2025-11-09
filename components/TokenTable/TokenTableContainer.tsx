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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  // Show debug info if no tokens
  if (tokens.length === 0) {
    return (
      <div className="text-white p-8">
        <h1 className="text-2xl mb-4">No tokens loaded</h1>
        <p>Check console for errors</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4 text-white">New Pairs</h2>
        <TokenTable category="new-pairs" tokens={tokens} />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-white">Final Stretch</h2>
        <TokenTable category="final-stretch" tokens={tokens} />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4 text-white">Migrated</h2>
        <TokenTable category="migrated" tokens={tokens} />
      </section>
    </div>
  );
}
