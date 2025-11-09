"use client";

import React from "react";
import { Token } from "@/types/token";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/Dialog";
import { formatNumber, formatPrice, formatPercentage, formatAge } from "@/lib/utils";
import { Shield, AlertTriangle, Users, Wallet, Clock, TrendingUp } from "lucide-react";

interface TokenDetailsModalProps {
  token: Token;
}

export default function TokenDetailsModal({ token }: TokenDetailsModalProps) {
  const details = [
    { label: "Contract Address", value: `${token.contractAddress.slice(0, 6)}...${token.contractAddress.slice(-4)}`, icon: Wallet },
    { label: "Market Cap", value: formatNumber(token.marketCap), icon: TrendingUp },
    { label: "24h Volume", value: formatNumber(token.volume24h), icon: TrendingUp },
    { label: "Liquidity", value: formatNumber(token.liquidity), icon: TrendingUp },
    { label: "Holders", value: token.holders.toLocaleString(), icon: Users },
    { label: "Age", value: formatAge(token.age.toString()), icon: Clock },
  ];

  const riskMetrics = [
    { label: "Dev Holding", value: `${token.devHolding.toFixed(2)}%`, risk: token.devHolding > 10 ? "high" : "low" },
    { label: "Top 10 Holders", value: `${token.top10Holders.toFixed(2)}%`, risk: token.top10Holders > 50 ? "high" : "medium" },
    { label: "Snipers", value: `${token.snipersPercent.toFixed(2)}%`, risk: token.snipersPercent > 20 ? "high" : "low" },
    { label: "Insiders", value: `${token.insidersPercent.toFixed(2)}%`, risk: token.insidersPercent > 10 ? "high" : "low" },
  ];

  return (
    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
            {token.symbol.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              {token.name}
              {token.verified && <Shield className="w-5 h-5 text-blue-400" />}
              {token.honeypot && <AlertTriangle className="w-5 h-5 text-red-400" />}
            </div>
            <div className="text-sm text-gray-400 font-normal">{token.symbol}</div>
          </div>
        </DialogTitle>
        <DialogDescription>Detailed information and risk metrics for this token</DialogDescription>
      </DialogHeader>
      <div className="space-y-6 mt-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">Current Price</div>
            <div className="text-2xl font-bold">{formatPrice(token.price)}</div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg">
            <div className="text-sm text-gray-400 mb-1">24h Change</div>
            <div className={`text-2xl font-bold ${token.priceChange24h >= 0 ? "text-green-400" : "text-red-400"}`}>
              {formatPercentage(token.priceChange24h)}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Token Details</h3>
          <div className="grid grid-cols-2 gap-3">
            {details.map((detail) => {
              const Icon = detail.icon;
              return (
                <div key={detail.label} className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
                  <Icon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="text-xs text-gray-400">{detail.label}</div>
                    <div className="text-sm font-medium">{detail.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Risk Metrics</h3>
          <div className="space-y-2">
            {riskMetrics.map((metric) => (
              <div key={metric.label} className="flex items-center justify-between bg-gray-800 p-3 rounded-lg">
                <span className="text-sm">{metric.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{metric.value}</span>
                  <span className={`px-2 py-0.5 text-xs rounded-full ${
                    metric.risk === "high" ? "bg-red-900/30 text-red-400" :
                    metric.risk === "medium" ? "bg-yellow-900/30 text-yellow-400" :
                    "bg-green-900/30 text-green-400"
                  }`}>
                    {metric.risk}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-3">Trading Activity</h3>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Buys</div>
              <div className="text-lg font-bold text-green-400">{token.numBuys}</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Sells</div>
              <div className="text-lg font-bold text-red-400">{token.numSells}</div>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Total Txns</div>
              <div className="text-lg font-bold">{token.transactions}</div>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}


