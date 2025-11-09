"use client";
import { useAppSelector } from "@/store/hooks";

export default function DebugCount() {
  const items = useAppSelector(s => s.tokens.items);
  return (
    <div className="mb-4 rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-gray-200">
      Redux tokens: <span className="font-semibold">{items.length}</span>
      {items.length > 0 ? <> — first: <span className="font-semibold">{items[0].name}</span></> : null}
    </div>
  );
}
