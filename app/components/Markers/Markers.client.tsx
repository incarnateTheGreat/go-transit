import { useState } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { useFetcher } from "@remix-run/react";
import type { Map as MapType } from "leaflet";
import { ScheduleTrip, TrainTrip } from "types";

import TrainIcon from "../TrainIcon";
import TripModal from "../TripModal";

type MarkersProps = {
  // trips: Trip[];
  trips: TrainTrip[];
  mapRef: React.RefObject<MapType>;
};

export default function Markers({ trips, mapRef }: MarkersProps) {
  const [modal, setModal] = useState(false);
  const [tripData, setTripData] = useState<TrainTrip | null>();
  const fetcher = useFetcher<ScheduleTrip>();

  const handleGetRouteData = (TripNumber: string, trip: TrainTrip) => () => {
    const { Latitude, Longitude } = trip;

    fetcher.submit(
      { TripNumber },
      {
        method: "POST",
        encType: "application/json",
      }
    );

    setModal(true);
    setTripData(trip);

    if (mapRef.current) {
      if (mapRef.current?.getZoom() >= 12) {
        mapRef.current?.flyTo([Latitude, Longitude], mapRef.current?.getZoom());
      } else {
        mapRef.current?.flyTo([Latitude, Longitude], 12);
      }
    }
  };

  const clearData = () => {
    setModal(false);
    setTripData(null);
  };

  return (
    <>
      {modal && tripData ? (
        <TripModal
          fetcher={{
            state: fetcher.state,
            data: fetcher.data,
          }}
          tripData={tripData}
          clearData={clearData}
        />
      ) : null}
      {trips.map((trip) => {
        // const {
        //   vehicle: { position, stop_id, current_status },
        // } = trip;

        // const { latitude, longitude } = position;

        const { TripNumber, Latitude, Longitude, Course } = trip;

        return (
          <Marker
            key={TripNumber}
            position={[Latitude, Longitude]}
            icon={TrainIcon(Course)}
            eventHandlers={{
              click: handleGetRouteData(TripNumber, trip),
            }}
          >
            <Tooltip>
              {TripNumber} {Course}
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}
