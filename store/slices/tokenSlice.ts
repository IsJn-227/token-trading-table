import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token } from "@/types/token";

interface TokenState { items: Token[]; loading: boolean; error: string|null; }
const initialState: TokenState = { items: [], loading:false, error:null };

const slice = createSlice({
  name:"tokens",
  initialState,
  reducers:{
    setTokens:(s,a:PayloadAction<Token[]>)=>{ s.items = a.payload; },
    setLoading:(s,a:PayloadAction<boolean>)=>{ s.loading=a.payload; },
    setError:(s,a:PayloadAction<string|null>)=>{ s.error=a.payload; },
    updateToken:(s,a:PayloadAction<Token>)=>{ const i=s.items.findIndex(t=>t.id===a.payload.id); if(i>-1) s.items[i]=a.payload; },
    updateTokenPrice:(s,a:PayloadAction<{id:string;price:number;change24h:number}>)=>{
      const i=s.items.findIndex(t=>t.id===a.payload.id);
      if(i>-1){ s.items[i].price=a.payload.price; s.items[i].change24h=a.payload.change24h; (s.items[i] as any).priceChange24h=a.payload.change24h; }
    }
  }
});
export const { setTokens,setLoading,setError,updateToken,updateTokenPrice } = slice.actions;
export default slice.reducer;
