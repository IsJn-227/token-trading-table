"use client";

import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Token, SortState } from "@/types/token";
import { setSortState } from "@/store/slices/tokenSlice";
import { useFilters } from "@/hooks/useFilters";
import TokenHeader from "./TokenHeader";
import TokenRow from "./TokenRow";
import TokenFilters from "./TokenFilters";

interface TokenTableProps {
  category: Token["category"];
  tokens: Token[];
}

export default function TokenTable({ category, tokens }: TokenTableProps) {
  const dispatch = useDispatch();
  const [sortState, setSortStateLocal] = useState<SortState>({
    column: null,
    direction: null,
  });

  const filteredTokens = useFilters(tokens, category);

  const sortedTokens = useMemo(() => {
    if (!sortState.column || !sortState.direction) {
      return filteredTokens;
    }

    return [...filteredTokens].sort((a, b) => {
      const aValue = a[sortState.column!];
      const bValue = b[sortState.column!];

      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortState.direction === "asc"
          ? aValue - bValue
          : bValue - aValue;
      }

      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();

      if (sortState.direction === "asc") {
        return aStr.localeCompare(bStr);
      }
      return bStr.localeCompare(aStr);
    });
  }, [filteredTokens, sortState]);

  const handleSort = (column: keyof Token) => {
    const newDirection =
      sortState.column === column
        ? sortState.direction === "asc"
          ? "desc"
          : sortState.direction === "desc"
          ? null
          : "asc"
        : "asc";

    const newSortState = {
      column: newDirection ? column : null,
      direction: newDirection,
    };

    setSortStateLocal(newSortState);
    dispatch(setSortState(newSortState));
  };

  return (
    <div className="space-y-4">
      <TokenFilters />

      <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <TokenHeader sortState={sortState} onSort={handleSort} />
            <tbody>
              {sortedTokens.length === 0 ? (
                <tr>
                  <td colSpan={10} className="text-center py-12 text-gray-500">
                    No tokens found matching the filters
                  </td>
                </tr>
              ) : (
                sortedTokens.map((token) => (
                  <TokenRow key={token.id} token={token} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500">
        Showing {sortedTokens.length} of {filteredTokens.length} tokens
      </div>
    </div>
  );
}
