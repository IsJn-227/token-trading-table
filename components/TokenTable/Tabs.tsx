"use client";
import React from "react";
export default function Tabs({
  value, onChange, items
}:{ value:string; onChange:(v:string)=>void; items:{value:string;label:string}[] }){
  return (
    <div className="flex gap-2">
      {items.map(it=>{
        const active = it.value===value;
        return (
          <button key={it.value} className={`tab ${active?"tab-active":""}`} onClick={()=>onChange(it.value)}>
            {it.label}
          </button>
        );
      })}
    </div>
  );
}
