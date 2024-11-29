import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//base url
// export const baseUrl = "http://192.168.200.46:7003/api";
export const baseUrl = "https://admin.agronomics.pk/internal/api";
