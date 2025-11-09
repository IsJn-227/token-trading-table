"use client";
import React,{memo,useRef,useEffect,useState,useMemo} from "react";
import { Token } from "@/types/token";
import TokenDetailsModal from "./TokenDetailsModal";
type Props={token:Token};
export default memo(function TokenRow({token}:Props){
  const [open,setOpen]=useState(false);
  const prev=useRef(token.price); const [flash,setFlash]=useState("");
  useEffect(()=>{ const dir=token.price>prev.current?"price-up":token.price<prev.current?"price-down":""; if(dir){ setFlash(dir); const t=setTimeout(()=>setFlash(""),600); return()=>clearTimeout(t);} prev.current=token.price; },[token.price]);
  const pct=useMemo(()=>`${token.change24h>=0?"+":""}${token.change24h.toFixed(2)}%`,[token.change24h]);
  const fmt=(n:number)=>Math.round(n).toLocaleString();
  return(<>
    <tr className="hover:bg-gray-800/30 transition-colors">
      <td className="px-4 py-3 text-white">
        <span className="underline decoration-dotted" title={`Contract: ${token.contractAddress}`}>{token.name}</span>
        {token.verified && <span className="ml-2 text-blue-400" title="Verified">✔</span>}
        {token.honeypot && <span className="ml-2 text-red-400" title="Honeypot risk">⚠</span>}
      </td>
      <td className="px-4 py-3 text-gray-300">{token.symbol}</td>
      <td className={`px-4 py-3 text-right text-gray-100 price-flash ${flash}`}>{`$${token.price.toFixed(6)}`}</td>
      <td className={`px-4 py-3 text-right ${token.change24h>=0?"text-green-400":"text-red-400"}`}>{pct}</td>
      <td className="px-4 py-3 text-right text-gray-200">{fmt(token.volume24h)}</td>
      <td className="px-4 py-3 text-right text-gray-200">{fmt(token.marketCap)}</td>
      <td className="px-4 py-3 text-right text-gray-200">{fmt(token.liquidity)}</td>
      <td className="px-4 py-3 text-right text-gray-200">{token.holders.toLocaleString()}</td>
      <td className="px-4 py-3 text-right text-gray-200"><span className="underline decoration-dotted" title={`Updated: ${new Date(token.lastUpdate).toLocaleString()}`}>{token.age ?? 0}</span></td>
      <td className="px-4 py-3 text-right"><button className="btn" onClick={()=>setOpen(true)}>Details</button></td>
    </tr>
    {open && <TokenDetailsModal token={token} onClose={()=>setOpen(false)} />}
  </>);
});
