import { cn } from '@/lib/utils'

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn('shimmer animate-pulse rounded-md bg-gray-800', className)}
      {...props}
    />
  )
}