"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Filter, X } from "lucide-react";
import { setFilter, resetFilters } from "@/store/slices/filterSlice";
import { RootState } from "@/store/index";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Button } from "../ui/Button";

export default function TokenFilters() {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.filters);
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    dispatch(setFilter({ [key]: value }));
  };

  const activeFiltersCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "hideHoneypots" && value === true) return false;
    if (key === "verifiedOnly" && value === false) return false;
    if (typeof value === "number" && (value === 0 || value === Infinity)) return false;
    return true;
  }).length;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" size="md" className="relative">
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Filters</h3>
            {activeFiltersCount > 0 && (
              <button onClick={() => dispatch(resetFilters())} className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <X className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Market Cap Range</label>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" placeholder="Min" value={filters.minMarketCap || ""} 
                  onChange={(e) => handleFilterChange("minMarketCap", Number(e.target.value) || 0)}
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <input type="number" placeholder="Max" value={filters.maxMarketCap === Infinity ? "" : filters.maxMarketCap}
                  onChange={(e) => handleFilterChange("maxMarketCap", Number(e.target.value) || Infinity)}
                  className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-300 mb-1 block">Min Holders</label>
              <input type="number" placeholder="0" value={filters.minHolders || ""}
                onChange={(e) => handleFilterChange("minHolders", Number(e.target.value) || 0)}
                className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div className="space-y-2 pt-2 border-t border-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.hideHoneypots}
                  onChange={(e) => handleFilterChange("hideHoneypots", e.target.checked)}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-300">Hide Honeypots</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={filters.verifiedOnly}
                  onChange={(e) => handleFilterChange("verifiedOnly", e.target.checked)}
                  className="w-4 h-4 rounded bg-gray-700 border-gray-600 text-blue-600 focus:ring-blue-500" />
                <span className="text-sm text-gray-300">Verified Only</span>
              </label>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

