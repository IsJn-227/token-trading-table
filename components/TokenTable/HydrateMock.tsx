"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTokens } from "@/store/slices/tokenSlice";
import { generateMockTokens } from "@/lib/mockData";

export default function HydrateMock() {
  const dispatch = useAppDispatch();
  const count = useAppSelector(s => s.tokens.items.length);
  useEffect(() => {
    if (count === 0) {
      const data = generateMockTokens();
      console.log("[HydrateMock] Injecting", data.length, "tokens");
      dispatch(setTokens(data));
    }
  }, [count, dispatch]);
  return null;
}
