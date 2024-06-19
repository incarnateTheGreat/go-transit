import { Dispatch } from "react";
import { useRouteLoaderData } from "@remix-run/react";
import type { LatLngBoundsExpression, Map as MapType } from "leaflet";

import Buttons from "./Buttons";
import NoOfTrains from "./NoOfTrains";

import { TrainLoaderData } from "~/routes/_index";

type InteractionsProps = {
  mapRef: React.RefObject<MapType>;
  bounds: LatLngBoundsExpression;
  filteredLine: string;
  setFilteredLine: Dispatch<React.SetStateAction<string>>;
};

export default function Interactions({
  mapRef,
  bounds,
  setFilteredLine,
  filteredLine,
}: InteractionsProps) {
  const tripsData = useRouteLoaderData("routes/_index") as TrainLoaderData;

  const dateTime = new Date(tripsData.Metadata.TimeStamp).toLocaleString(
    "en-US",
    {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: "short",
      second: "numeric",
    }
  );

  return (
    <div className="absolute bottom-8 right-5 z-[450] w-56">
      <div className="bg-slate-500 text-white mb-2 p-4 py-2 flex justify-between">
        <span className="font-semibold">Last Updated</span>
        <span>{dateTime}</span>
      </div>
      <NoOfTrains
        filteredLine={filteredLine}
        setFilteredLine={setFilteredLine}
      />
      <Buttons mapRef={mapRef} bounds={bounds} />
    </div>
  );
}
