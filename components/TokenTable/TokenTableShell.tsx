"use client";
import React,{useMemo,useState} from "react";
import { useAppSelector } from "@/store/hooks";
import { Token } from "@/types/token";
import AxiomSection from "./AxiomSection";
import Tabs from "./Tabs";
import TokenTable from "./TokenTable";
import useWebSocket from "@/hooks/useWebSocket";

const groups: { value: Token["category"]; label:string }[] = [
  { value:"new-pairs", label:"New Pairs" },
  { value:"final-stretch", label:"Final Stretch" },
  { value:"migrated", label:"Migrated" },
];

export default function TokenTableShell(){
  useWebSocket();
  const items = useAppSelector(s=>s.tokens.items);
  const [tab,setTab] = useState<Token["category"]>("new-pairs");
  const list = useMemo(()=> items.filter(t=>t.category===tab),[items,tab]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="axiom">Token Discovery</h1>
        <Tabs value={tab} onChange={v=>setTab(v as any)} items={groups}/>
      </div>
      <AxiomSection title={groups.find(g=>g.value===tab)?.label ?? ""}>
        <TokenTable tokens={list}/>
      </AxiomSection>
    </div>
  );
}
