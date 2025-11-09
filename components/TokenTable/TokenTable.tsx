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
  const [sortState, setSortStateLocal] = useState<SortState>({
    column: null,
    direction: "asc",
  });

  // Filter tokens by category first
  const categoryTokens = useMemo(() => {
    if (!category || category === 'all') {
      console.log('📋 TokenTable - showing all tokens:', tokens.length);
      return tokens;
    }
    const filtered = tokens.filter(token => token.category === category);
    console.log(`📋 TokenTable - category: ${category}, filtered: ${filtered.length} tokens`);
    return filtered;
  }, [tokens, category]);

  // Apply additional filters from the filters slice
  const filteredTokens = useFilters(categoryTokens);
  
  console.log(`🔍 TokenTable - after filters: ${filteredTokens.length} tokens`);

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

  const handleSort = (column: keyof Token) => {
    setSortStateLocal((prev) => ({
      column,
      direction:
        prev.column === column && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  if (sortedTokens.length === 0) {
    return (
      <div className="w-full p-8 text-center text-gray-400">
        <p>No tokens found for category: {category}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <TokenFilters />
      <div className="overflow-x-auto">
        <table className="w-full">
          <TokenHeader sortState={sortState} onSort={handleSort} />
          <tbody>
            {sortedTokens.map((token) => (
              <TokenRow key={token.id} token={token} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
