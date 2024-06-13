import { useEffect, useState } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { useFetcher } from "@remix-run/react";
import type { Map as MapType } from "leaflet";
import { ScheduleTrip, TrainTrip } from "types";

import TrainIcon from "../TrainIcon";
import TripModal from "../TripModal";

import { useTripsStore } from "~/store/useTripsStore";

type MarkersProps = {
  trips: TrainTrip[];
  mapRef: React.RefObject<MapType>;
};

export default function Markers({ trips, mapRef }: MarkersProps) {
  const [modal, setModal] = useState(false);
  const { selectedTrip, setSelectedTrip } = useTripsStore((e) => e);
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
          clearData={clearData}
        />
      ) : null}
      {trips.map((trip) => {
        const { TripNumber, Latitude, Longitude, Course } = trip;

        return (
          <Marker
            key={TripNumber}
            position={[Latitude, Longitude]}
            icon={TrainIcon(Course, TripNumber, selectedTrip)}
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
