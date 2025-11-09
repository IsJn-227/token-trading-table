"use client";
import React from "react";
import { SortDirection, SortField } from "@/types/token";
export default function ColumnHeader({
  field,label,activeField,direction,onSort,align="left"
}:{ field:SortField; label:string; activeField:SortField|null; direction:SortDirection; onSort:(f:SortField)=>void; align?:"left"|"right"; }){
  const is = activeField===field;
  const alignClass = align==="right" ? "text-right" : "text-left";
  return (
    <th className={`px-4 py-3 ${alignClass} cursor-pointer select-none`} onClick={()=>onSort(field)} title="Click to sort">
      <span className={`inline-flex items-center gap-1 ${is?"text-white":""}`}>{label}{is&&<span className="text-xs opacity-80">{direction==="asc"?"▲":"▼"}</span>}</span>
    </th>
  );
}
