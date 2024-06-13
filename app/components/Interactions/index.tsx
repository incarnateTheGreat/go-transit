import { Dispatch } from "react";
import type { LatLngBoundsExpression, Map as MapType } from "leaflet";
import type { TrainTrip } from "types";

import Buttons from "./Buttons";
import NoOfTrains from "./NoOfTrains";

type InteractionsProps = {
  trips: TrainTrip[];
  mapRef: React.RefObject<MapType>;
  bounds: LatLngBoundsExpression;
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
  return (
    <div className="absolute bottom-8 right-5 z-[450] w-56">
      <NoOfTrains
        trips={trips}
        filteredLine={filteredLine}
        setFilteredLine={setFilteredLine}
      />
      <Buttons mapRef={mapRef} bounds={bounds} />
    </div>
  );
}
