"use client";

import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, TrendingDown, Shield, AlertTriangle } from "lucide-react";
import { Token } from "@/types/token";

interface TokenRowProps {
  token: Token;
}

export default function TokenRow({ token }: TokenRowProps) {
  const [priceAnimation, setPriceAnimation] = useState<"up" | "down" | null>(null);
  const prevPriceRef = useRef(token.price);

  useEffect(() => {
    if (prevPriceRef.current !== token.price) {
      setPriceAnimation(token.price > prevPriceRef.current ? "up" : "down");
      prevPriceRef.current = token.price;
      const timer = setTimeout(() => setPriceAnimation(null), 600);
      return () => clearTimeout(timer);
    }
  }, [token.price]);

  const formatPrice = (price: number) => {
    return price < 0.01 ? `$${price.toFixed(8)}` : `$${price.toFixed(4)}`;
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const getColorForChange = (change: number) => {
    if (change > 0) return "text-green-400";
    if (change < 0) return "text-red-400";
    return "text-gray-400";
  };

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
            {token.symbol.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-white">{token.name}</span>
              {token.verified && <Shield className="w-4 h-4 text-blue-400" />}
              {token.honeypot && <AlertTriangle className="w-4 h-4 text-red-400" />}
            </div>
            <span className="text-sm text-gray-400">{token.symbol}</span>
          </div>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className={`font-mono transition-all duration-300 text-white ${
          priceAnimation === "up" ? "text-green-400" : priceAnimation === "down" ? "text-red-400" : ""
        }`}>
          {formatPrice(token.price)}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className={`flex items-center gap-1 font-medium ${getColorForChange(token.priceChange24h)}`}>
          {token.priceChange24h > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {token.priceChange24h.toFixed(2)}%
        </div>
      </td>
      <td className="px-4 py-4 text-gray-300">{formatNumber(token.marketCap)}</td>
      <td className="px-4 py-4 text-gray-300">{formatNumber(token.volume24h)}</td>
      <td className="px-4 py-4 text-gray-300">{formatNumber(token.liquidity)}</td>
      <td className="px-4 py-4 text-gray-300">{token.holders.toLocaleString()}</td>
      <td className="px-4 py-4 text-gray-400">{token.age}h</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-green-400">{token.numBuys}</span>
          <span className="text-gray-500">/</span>
          <span className="text-red-400">{token.numSells}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors">
          View
        </button>
      </td>
    </tr>
  );
}
