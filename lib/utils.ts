import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getEnv(name: string, env: string | undefined | null) {
  if (env === undefined || env === null) {
    throw "Missing Env Var for " + name
  }
  return env
}
