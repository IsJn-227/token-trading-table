"use client";
import { useQuery } from "@tanstack/react-query";
import { generateMockTokens } from "@/lib/mockData";

/** Primary hook used by WebSocket seeding */
export function useTokenDataQuery() {
  return useQuery({
    queryKey: ["tokens"],
    // Simulate progressive fetch (shimmer time)
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 450));
      return generateMockTokens();
    },
  });
}

/** Compatibility wrapper for components expecting { loading, error, data } */
export function useTokenData() {
  const q = useTokenDataQuery();
  return {
    data: q.data,
    loading: q.isLoading,
    error: q.isError ? (q.error as Error)?.message || "Failed to load tokens" : null,
  };
}
