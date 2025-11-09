"use client";

import React from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Token, SortState } from "@/types/token";

interface TokenHeaderProps {
  sortState: SortState;
  onSort: (column: keyof Token) => void;
}

const columns = [
  { key: "name" as keyof Token, label: "Token", sortable: true },
  { key: "price" as keyof Token, label: "Price", sortable: true },
  { key: "priceChange24h" as keyof Token, label: "24h %", sortable: true },
  { key: "marketCap" as keyof Token, label: "Market Cap", sortable: true },
  { key: "volume24h" as keyof Token, label: "Volume", sortable: true },
  { key: "liquidity" as keyof Token, label: "Liquidity", sortable: true },
  { key: "holders" as keyof Token, label: "Holders", sortable: true },
  { key: "age" as keyof Token, label: "Age", sortable: true },
  { key: "transactions" as keyof Token, label: "Txns", sortable: true },
];

export default function TokenHeader({ sortState, onSort }: TokenHeaderProps) {
  return (
    <thead className="bg-gray-800/50 border-b border-gray-700">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"
          >
            <button
              onClick={() => column.sortable && onSort(column.key)}
              className={`flex items-center gap-2 hover:text-gray-200 transition-colors ${
                column.sortable ? "cursor-pointer" : "cursor-default"
              }`}
              disabled={!column.sortable}
            >
              <span>{column.label}</span>
              {column.sortable && sortState.column === column.key && (
                <span className="text-blue-400">
                  {sortState.direction === "asc" ? (
                    <ArrowUp className="w-3 h-3" />
                  ) : (
                    <ArrowDown className="w-3 h-3" />
                  )}
                </span>
              )}
            </button>
          </th>
        ))}
        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
          Actions
        </th>
      </tr>
    </thead>
  );
}
