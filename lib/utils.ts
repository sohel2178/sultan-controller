import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatMonthlyDate = (date: Date): string => {
  return new Date(date)
    .toLocaleString("en-US", { month: "short", year: "numeric" })
    .replace(" ", "-");
};
