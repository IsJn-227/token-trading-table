export interface Token {
  id: string; name: string; symbol: string;
  price: number; change24h: number; volume: number; volume24h: number;
  marketCap: number; liquidity: number; holders: number;
  category: "new-pairs" | "final-stretch" | "migrated";
  risk: "high" | "low"; verified: boolean; honeypot: boolean;
  lastUpdate: string; contractAddress: string;
  totalSupply: number; circulatingSupply: number;
  age: number;
  devHolding: number; top10Holders: number; snipersPercent: number; insidersPercent: number;
  priceChange24h?: number; numBuys?: number; numSells?: number; transactions?: number;
}

export type SortField = keyof Token;
export type SortDirection = "asc" | "desc";
export type SortState = { column: SortField | null; direction: SortDirection };
