import { Token } from "@/types/token";
export const generateMockTokens = (): Token[] => {
  const categories: Token["category"][] = ["new-pairs","final-stretch","migrated"];
  const out: Token[] = [];
  categories.forEach((c,ci)=>{
    for(let i=1;i<=10;i++){
      const id = `${c}-${i}`;
      const base = Math.random()*10;
      const priceChange = (Math.random()-0.5)*20;
      const addr = "0x"+Array.from({length:40},()=>Math.floor(Math.random()*16).toString(16)).join("");
      const buys = Math.floor(Math.random()*1000), sells=Math.floor(Math.random()*800);
      out.push({
        id, name:`Token ${ci*10+i}`, symbol:`TK${ci*10+i}`,
        price: base, change24h: priceChange, priceChange24h: priceChange,
        volume: Math.random()*1_000_000, volume24h: Math.random()*1_000_000,
        marketCap: Math.random()*10_000_000, liquidity: Math.random()*500_000,
        holders: Math.floor(Math.random()*10_000),
        category: c, risk: Math.random()>0.5?"high":"low", verified: Math.random()>0.3, honeypot: Math.random()>0.9,
        lastUpdate: new Date().toISOString(), contractAddress: addr,
        totalSupply: Math.floor(Math.random()*1_000_000_000), circulatingSupply: Math.floor(Math.random()*500_000_000),
        age: Math.floor(Math.random()*365),
        devHolding: Math.random()*15, top10Holders: Math.random()*60, snipersPercent: Math.random()*25, insidersPercent: Math.random()*15,
        numBuys: buys, numSells: sells, transactions: buys+sells,
      });
    }
  });
  return out;
};
