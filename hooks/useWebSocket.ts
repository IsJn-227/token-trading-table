"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { updateTokenPrice, setTokens } from "@/store/slices/tokenSlice";
import { useTokenDataQuery } from "./useTokenData";

/** mounts query -> put data to redux once, then push WS-like ticks */
export default function useWebSocket(){
  const dispatch = useAppDispatch();
  const { data } = useTokenDataQuery();
  const ids = useAppSelector(s=>s.tokens.items.map(t=>t.id));

  // seed redux from query (1x)
  useEffect(()=>{
    if(data && ids.length===0){ dispatch(setTokens(data)); }
  },[data, ids.length, dispatch]);

  // mock socket
  useEffect(()=>{
    if(ids.length===0) return;
    const tick = () => {
      const id = ids[Math.floor(Math.random()*ids.length)];
      const price = Number((Math.random()*10).toFixed(6));
      const change24h = Number(((Math.random()-0.5)*20).toFixed(2));
      dispatch(updateTokenPrice({ id, price, change24h }));
    };
    const h = setInterval(tick, 3000);
    return ()=>clearInterval(h);
  },[ids, dispatch]);
}
