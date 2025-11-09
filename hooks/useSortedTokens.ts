import { useMemo } from "react";
import { Token, SortField, SortDirection } from "@/types/token";
export default function useSortedTokens(tokens:Token[],{field,direction}:{field:SortField|null;direction:SortDirection}){
  return useMemo(()=>{
    if(!field) return tokens;
    const s=[...tokens].sort((a:any,b:any)=>{
      const va=a[field], vb=b[field];
      if(typeof va==="string" && typeof vb==="string") return va.localeCompare(vb);
      const na=Number(va??0), nb=Number(vb??0); return na-nb;
    });
    return direction==="desc"?s.reverse():s;
  },[tokens,field,direction]);
}
