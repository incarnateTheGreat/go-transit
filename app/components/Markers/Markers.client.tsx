import { useEffect, useState } from "react";
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
  const [selectedTrip, setSelectedTrip] = useState<TrainTrip | null>();
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
    setSelectedTrip(trip);

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
    setSelectedTrip(null);
  };

  // TODO: Use Zustand to store Selected Trip.
  // When filtered line is selected and Selected Trip is not part of it, de-select trip.
  useEffect(() => {
    if (selectedTrip) {
      const selectedTripUpdate = trips.find(
        (t) => t.TripNumber === selectedTrip.TripNumber
      );

      if (selectedTripUpdate) {
        const { Latitude, Longitude } = selectedTripUpdate;

        setSelectedTrip(selectedTripUpdate);
        mapRef.current?.flyTo([Latitude, Longitude], mapRef.current?.getZoom());
      }
    }
  }, [trips, selectedTrip, mapRef]);

  return (
    <>
      {modal && selectedTrip ? (
        <TripModal
          fetcher={{
            state: fetcher.state,
            data: fetcher.data,
          }}
          tripData={selectedTrip}
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
