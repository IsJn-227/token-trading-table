import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(6)}`
}

export function formatNumber(num: number): string {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`
  return num.toFixed(2)
}

export function formatPercentage(num: number): string {
  return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`
}

export function formatAge(hours: number | string): string {
  const h = typeof hours === 'string' ? parseFloat(hours) : hours
  if (h < 1) return `${Math.floor(h * 60)}m`
  if (h < 24) return `${Math.floor(h)}h`
  return `${Math.floor(h / 24)}d`
}

export function getColorForChange(change: number): string {
  if (change > 0) return "text-green-400"
  if (change < 0) return "text-red-400"
  return "text-gray-400"
}
