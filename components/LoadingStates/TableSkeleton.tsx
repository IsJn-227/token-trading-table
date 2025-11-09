import React from "react";
import { Skeleton } from "../ui/Skeleton";

export function TableSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="grid grid-cols-8 gap-4 p-4 bg-gray-800/50 rounded-lg"
        >
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
      ))}
    </div>
  );
}
