"use client";

import React, { useState } from "react";
import { useTokenData } from "@/hooks/useTokenData";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import TokenTable from "./TokenTable";
import { TableSkeleton } from "../LoadingStates/TableSkeleton";
import { Token } from "@/types/token";

export default function TokenTableContainer() {
  useTokenData();
  useWebSocket();

  const { tokens, isLoading, error } = useSelector(
    (state: RootState) => state.tokens
  );

  const [activeTab, setActiveTab] = useState<Token["category"]>("new");

  if (error) {
    return (
      <div className="text-center p-12 bg-red-900/20 border border-red-700 rounded-lg">
        <p className="text-red-400 text-lg">Error loading tokens: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  const tabs = [
    { id: "new" as const, label: "New Pairs", count: tokens.filter(t => t.category === "new").length },
    { id: "final" as const, label: "Final Stretch", count: tokens.filter(t => t.category === "final").length },
    { id: "migrated" as const, label: "Migrated", count: tokens.filter(t => t.category === "migrated").length },
  ];

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            {tab.label}
            <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-gray-700">
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <TokenTable category={activeTab} tokens={tokens} />
      )}
    </div>
  );
}
