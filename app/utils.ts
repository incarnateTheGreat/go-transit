import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const getTodaysDate = () => {
  const date = new Date();

  const day = date.toLocaleString("en-US", { day: "2-digit" });
  const month = date.toLocaleString("en-US", { month: "2-digit" });
  const year = date.getUTCFullYear();

  return `${year}${month}${day}`;
};

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export { cn, getTodaysDate };
