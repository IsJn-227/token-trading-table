"use client";
import React from "react";
import { useAppSelector } from "@/store/hooks";
import { Token } from "@/types/token";
import AxiomSection from "./AxiomSection";
import TokenTable from "./TokenTable";
import useWebSocket from "@/hooks/useWebSocket";
import { useTokenData } from "@/hooks/useTokenData";

const categories: Token["category"][] = ["new-pairs", "final-stretch", "migrated"];
const titleCase = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function TokenTableContainer() {
  const { loading, error } = useTokenData(); // wrapper returns {loading,error,data}
  useWebSocket();

  const tokens = useAppSelector((s) => s.tokens.items);

  if (error) return <div className="axiom-card p-4 text-red-400">Error: {error}</div>;
  if (loading && tokens.length === 0)
    return (
      <div className="space-y-8">
        {categories.map((_, i) => (
          <div key={i} className="axiom-card p-4">
            <div className="h-6 w-40 skel mb-4" />
            {[...Array(8)].map((__, r) => (
              <div key={r} className="h-10 w-full skel mb-2" />
            ))}
          </div>
        ))}
      </div>
    );

  return (
    <div className="space-y-10">
      {categories.map((cat) => {
        const list = tokens.filter((t) => t.category === cat);
        return (
          <AxiomSection key={cat} title={titleCase(cat)}>
            <TokenTable tokens={list} />
          </AxiomSection>
        );
      })}
    </div>
  );
}
