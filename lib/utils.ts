import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEnv(name: string) {
  let val = process.env[name]
  if (val === undefined || val === null) {
    throw "Missing Env Var for " + name
  }
  return val
}
