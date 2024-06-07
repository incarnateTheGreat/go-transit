import { Dispatch } from "react";
import { useRevalidator } from "@remix-run/react";
import type { LatLngBoundsLiteral, Map as MapType } from "leaflet";
import type { TrainTrip } from "types";

import { LINES } from "~/constants";
import { cn } from "~/utils";

type InteractionsProps = {
  trips: TrainTrip[];
  mapRef: React.RefObject<MapType>;
  bounds: LatLngBoundsLiteral;
  filteredLine: string;
  setFilteredLine: Dispatch<React.SetStateAction<string>>;
};

export default function Interactions({
  trips,
  mapRef,
  bounds,
  setFilteredLine,
  filteredLine,
}: InteractionsProps) {
  const revalidator = useRevalidator();

  const lines = trips.reduce((acc: Record<string, number>, train) => {
    if (train.LineCode in acc) {
      acc[train.LineCode] += 1;
    } else {
      acc[train.LineCode] = 1;
    }

    return acc;
  }, {});

  const sortedLines = Object.fromEntries(
    Object.entries(lines).sort(([, a], [, b]) => b - a)
  );

  return (
    <div className="absolute bottom-8 right-5 z-[450] w-56">
      <div className="bg-slate-500 text-white mb-2 p-4 py-2">
        <div className="flex justify-between border-b border-white mb-1">
          <div className="font-semibold">Line</div>
          <div className="font-semibold">No. of Trains</div>
        </div>
        {Object.entries(sortedLines).map((line) => {
          const [key, value] = line;

          return (
            <div
              role="none"
              key={key}
              className={cn("flex justify-between hover:font-semibold", {
                "font-semibold": filteredLine === key,
              })}
              onClick={() => {
                if (filteredLine === key) {
                  setFilteredLine("");
                } else {
                  setFilteredLine(key);
                }
              }}
            >
              <div>{LINES[key] ?? key}</div>
              <div>{value}</div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="p-2 bg-slate-500 text-white font-semibold rounded mr-2"
          onClick={() => {
            revalidator.revalidate();
          }}
        >
          Refresh
        </button>
        <button
          type="button"
          className="p-2 bg-slate-500 text-white font-semibold rounded"
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.fitBounds(bounds);
            }
          }}
        >
          Reset Bounds
        </button>
      </div>
    </div>
  );
}
