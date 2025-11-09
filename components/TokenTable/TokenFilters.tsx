"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, X } from "lucide-react";
import { setSearch, resetFilters } from "@/store/slices/filterSlice";
import { RootState } from "@/store/index";

export default function TokenFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);

  return (
    <div className="mb-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Filter className="w-5 h-5 text-gray-400" />
          <label htmlFor="token-search" className="sr-only">Search tokens</label>
          <input
            id="token-search"
            name="token-search"
            type="text"
            placeholder="Search tokens by name or symbol..."
            value={filters.search}
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="flex-1 bg-gray-900 border border-gray-700 rounded px-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
        
        {filters.search && (
          <button
            onClick={() => dispatch(resetFilters())}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            aria-label="Clear search filters"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
