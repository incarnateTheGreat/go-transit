import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { BARRIE_LATLONS } from "./train_lines/barrie";
import { KITCHENR_LATLONS } from "./train_lines/kitchener";
import { LAKESHORE_EAST_LATLONS } from "./train_lines/lakeshore_east";
import { LAKESHORE_WEST_LATLONS } from "./train_lines/lakeshore_west";
import { RICHMOND_HILL_LATLONS } from "./train_lines/richmond_hill";
import { STOUFFVILLE_LATLONS } from "./train_lines/stouffvile";

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

const mapBounds = () => {
  const points = [
    LAKESHORE_WEST_LATLONS[0],
    KITCHENR_LATLONS[0],
    BARRIE_LATLONS[BARRIE_LATLONS.length - 1],
    RICHMOND_HILL_LATLONS[RICHMOND_HILL_LATLONS.length - 1],
    STOUFFVILLE_LATLONS[STOUFFVILLE_LATLONS.length - 1],
    LAKESHORE_EAST_LATLONS[LAKESHORE_EAST_LATLONS.length - 1],
  ];

  return points;
};

export { cn, getTodaysDate, mapBounds };
