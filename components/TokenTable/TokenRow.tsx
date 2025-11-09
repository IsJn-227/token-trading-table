"use client";

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Zap, Shield, AlertTriangle, ExternalLink, TrendingUp, TrendingDown } from "lucide-react";
import { Token } from "@/types/token";
import { setSelectedToken } from "@/store/slices/tokenSlice";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
import { Dialog, DialogTrigger } from "../ui/Dialog";
import { formatNumber, formatPrice, formatPercentage, formatAge, getColorForChange } from "@/lib/utils";
import TokenDetailsModal from "./TokenDetailsModal";

interface TokenRowProps {
  token: Token;
}

export default function TokenRow({ token }: TokenRowProps) {
  const dispatch = useDispatch();
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

  return (
    <tr className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors group">
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
        <div className={`font-mono transition-all duration-300 ${
          priceAnimation === "up" ? "animate-price-up" : priceAnimation === "down" ? "animate-price-down" : ""
        }`}>
          {formatPrice(token.price)}
        </div>
      </td>
      <td className="px-4 py-4">
        <div className={`flex items-center gap-1 font-medium ${getColorForChange(token.priceChange24h)}`}>
          {token.priceChange24h > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {formatPercentage(token.priceChange24h)}
        </div>
      </td>
      <td className="px-4 py-4 text-gray-300">{formatNumber(token.marketCap)}</td>
      <td className="px-4 py-4 text-gray-300">{formatNumber(token.volume24h)}</td>
      <td className="px-4 py-4">
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-gray-300 hover:text-white transition-colors underline decoration-dashed underline-offset-4">
              {formatNumber(token.liquidity)}
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <div className="space-y-2">
              <h4 className="font-medium text-white">Liquidity Details</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Liquidity:</span>
                  <span className="text-white">{formatNumber(token.liquidity)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">LP Tokens:</span>
                  <span className="text-white">{formatNumber(token.liquidity * 0.5)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400">Active</span>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </td>
      <td className="px-4 py-4 text-gray-300">{token.holders.toLocaleString()}</td>
      <td className="px-4 py-4 text-gray-400">{formatAge(token.age)}</td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="text-green-400">{token.numBuys}</span>
          <span className="text-gray-500">/</span>
          <span className="text-red-400">{token.numSells}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors" title="Quick Buy">
            <Zap className="w-4 h-4" />
          </button>
          <Dialog>
            <DialogTrigger asChild>
              <button onClick={() => dispatch(setSelectedToken(token))} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                <ExternalLink className="w-4 h-4" />
              </button>
            </DialogTrigger>
            <TokenDetailsModal token={token} />
          </Dialog>
        </div>
      </td>
    </tr>
  );
}
