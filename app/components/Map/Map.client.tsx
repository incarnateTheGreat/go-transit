import { useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { LatLngBoundsLiteral, Map as MapType } from "leaflet";
import { TrainTrip } from "types";

import Interactions from "../Interactions";
import Markers from "../Markers/Markers.client";

import "leaflet/dist/leaflet.css";

type MapProps = {
  //   trips: Trip[];
  trips: TrainTrip[];
  revalidator: {
    revalidate: () => void;
  };
};

export default function Map({ trips }: MapProps) {
  const [filteredLine, setFilteredLine] = useState("");
  const mapRef = useRef<MapType>(null);

  let filteredTrips = trips.filter((trip) => trip.LineCode === filteredLine);

  if (filteredTrips.length === 0) {
    filteredTrips = trips;
  }

  const bounds = filteredTrips.reduce((acc: LatLngBoundsLiteral, trip) => {
    const { Latitude, Longitude } = trip;

    acc.push([Latitude, Longitude]);

    return acc;
  }, []);

  return (
    <div className="h-screen">
      <MapContainer
        bounds={bounds}
        className="h-full flex"
        scrollWheelZoom
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MarkerClusterGroup
          chunkedLoading
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={false}
          maxClusterRadius={50}
        >
          <Markers trips={filteredTrips} />
        </MarkerClusterGroup>
        <Interactions
          trips={trips}
          mapRef={mapRef}
          bounds={bounds}
          filteredLine={filteredLine}
          setFilteredLine={setFilteredLine}
        />
      </MapContainer>
    </div>
  );
}
