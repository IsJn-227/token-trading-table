"use client";
import React from "react";
import { Token } from "@/types/token";
export interface TokenDetailsModalProps { token:Token; onClose?:()=>void; }
export default function TokenDetailsModal({token,onClose}:TokenDetailsModalProps){
  const close=()=>onClose?onClose():undefined;
  const fmt=(n:number)=>Math.round(n).toLocaleString();
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50">
      <div className="w-[680px] max-w-[95vw] rounded-xl bg-gray-900 border border-gray-700 shadow-xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">
          <div className="text-lg font-semibold text-white">{token.name} <span className="text-gray-400">({token.symbol})</span></div>
          <button onClick={close} className="btn">✕</button>
        </div>
        <div className="px-5 py-5 text-gray-200 grid grid-cols-2 gap-4">
          <div><div className="text-xs text-gray-400 mb-1">Contract</div><div className="font-mono break-all">{token.contractAddress}</div></div>
          <div><div className="text-xs text-gray-400 mb-1">Market Cap</div><div>{fmt(token.marketCap)}</div></div>
          <div><div className="text-xs text-gray-400 mb-1">24h Volume</div><div>{fmt(token.volume24h)}</div></div>
          <div><div className="text-xs text-gray-400 mb-1">Liquidity</div><div>{fmt(token.liquidity)}</div></div>
          <div><div className="text-xs text-gray-400 mb-1">Holders</div><div>{token.holders.toLocaleString()}</div></div>
          <div><div className="text-xs text-gray-400 mb-1">Age</div><div>{token.age ?? 0} days</div></div>
        </div>
      </div>
    </div>
  );
}
