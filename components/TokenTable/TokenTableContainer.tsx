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

  return (
    <div className="space-y-8">
      <TokenTable category="new-pairs" tokens={tokens} />
      <TokenTable category="final-stretch" tokens={tokens} />
      <TokenTable category="migrated" tokens={tokens} />
    </div>
  );
}
