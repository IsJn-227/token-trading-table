"use client";
import React,{useState,useCallback} from "react";
import { Token, SortField, SortDirection } from "@/types/token";
import useSortedTokens from "@/hooks/useSortedTokens";
import TokenRow from "./TokenRow";
import ColumnHeader from "./ColumnHeader";
type Props={ tokens:Token[] };
export default function TokenTable({tokens}:Props){
  const [field,setField]=useState<SortField|null>(null);
  const [dir,setDir]=useState<SortDirection>("asc");
  const onSort=useCallback((f:SortField)=>{ if(field===f) setDir(dir==="asc"?"desc":"asc"); else{ setField(f); setDir("asc"); } },[field,dir]);
  const data=useSortedTokens(tokens,{field,direction:dir});
  return(
    <div className="table-wrap sticky">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            <ColumnHeader field={"name"} label="Name" activeField={field} direction={dir} onSort={onSort}/>
            <ColumnHeader field={"symbol"} label="Symbol" activeField={field} direction={dir} onSort={onSort}/>
            <ColumnHeader field={"price"} label="Price" align="right" activeField={field} direction={dir} onSort={onSort}/>
            <ColumnHeader field={"change24h"} label="24h %" align="right" activeField={field} direction={dir} onSort={onSort}/>
            <ColumnHeader field={"volume24h"} label="24h Vol" align="right" activeField={field} direction={dir} onSort={onSort}/>
            <ColumnHeader field={"marketCap"} label="Mkt Cap" align="right" activeField={field} direction={dir} onSort={onSort}/>
            <ColumnHeader field={"liquidity"} label="Liquidity" align="right" activeField={field} direction={dir} onSort={onSort}/>
            <ColumnHeader field={"holders"} label="Holders" align="right" activeField={field} direction={dir} onSort={onSort}/>
            <ColumnHeader field={"age"} label="Age (d)" align="right" activeField={field} direction={dir} onSort={onSort}/>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {data.map(t=> <TokenRow key={t.id} token={t}/>)}
        </tbody>
      </table>
    </div>
  );
}
