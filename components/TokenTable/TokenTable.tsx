"use client";

import React, { useState, useMemo } from "react";
import { Token, SortState } from "@/types/token";
import { useFilters } from "@/hooks/useFilters";
import TokenHeader from "./TokenHeader";
import TokenRow from "./TokenRow";
import TokenFilters from "./TokenFilters";

interface TokenTableProps {
  category: Token["category"] | "all";
  tokens: Token[];
}

export default function TokenTable({ category, tokens }: TokenTableProps) {
  console.log(`🔍 [${category}] TokenTable received:`, {
    tokensLength: tokens?.length,
    category,
    firstToken: tokens?.[0]?.name
  });

  const [sortState, setSortStateLocal] = useState<SortState>({
    column: null,
    direction: "asc",
  });

  const categoryTokens = useMemo(() => {
    if (!category || category === 'all') {
      console.log(`✅ [${category}] Returning all ${tokens?.length} tokens`);
      return tokens;
    }
    const filtered = tokens.filter(token => token.category === category);
    console.log(`✅ [${category}] Filtered to ${filtered.length} tokens`);
    console.log(`   Sample token categories:`, tokens.slice(0, 3).map(t => `${t.name}: ${t.category}`));
    return filtered;
  }, [tokens, category]);

  const filteredTokens = useFilters(categoryTokens);
  console.log(`🎯 [${category}] After useFilters: ${filteredTokens?.length} tokens`);

  const sortedTokens = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return filteredTokens;
    }

    return [...filteredTokens].sort((a, b) => {
      const aValue = a[sortState.column!];
      const bValue = b[sortState.column!];

      if (aValue === undefined || bValue === undefined) return 0;
      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sortState.direction === "asc" ? comparison : -comparison;
    });
  }, [filteredTokens, sortState]);

  console.log(`📋 [${category}] FINAL sortedTokens: ${sortedTokens?.length}`);

  const handleSort = (column: keyof Token) => {
    setSortStateLocal((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  if (!sortedTokens || sortedTokens.length === 0) {
    console.warn(`⚠️ [${category}] NO TOKENS TO DISPLAY!`, {
      categoryTokens: categoryTokens?.length,
      filteredTokens: filteredTokens?.length,
      sortedTokens: sortedTokens?.length
    });
    return (
      <div className="w-full p-6 text-center bg-red-900/20 border border-red-500 rounded">
        <p className="text-red-400 font-bold text-lg">⚠️ No tokens in category: {category}</p>
        <div className="mt-4 text-sm text-gray-400 space-y-1">
          <p>Received: {tokens?.length || 0} tokens</p>
          <p>Category filtered: {categoryTokens?.length || 0} tokens</p>
          <p>After filters: {filteredTokens?.length || 0} tokens</p>
          <p>Check browser console for details</p>
        </div>
      </div>
    );
  }

  console.log(`✅ [${category}] RENDERING ${sortedTokens.length} ROWS NOW!`);

  return (
    <div className="w-full">
      <TokenFilters />
      <div className="overflow-x-auto bg-gray-900 rounded-lg">
        <table className="w-full border-collapse">
          <TokenHeader sortState={sortState} onSort={handleSort} />
          <tbody>
            {sortedTokens.map((token, idx) => {
              console.log(`  └─ Row ${idx}: ${token.name} (${token.symbol})`);
              return <TokenRow key={token.id} token={token} />;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
