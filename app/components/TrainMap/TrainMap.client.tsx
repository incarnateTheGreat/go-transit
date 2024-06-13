import { useMemo, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { LatLngBoundsExpression, Map as MapType } from "leaflet";

import Interactions from "../Interactions";
import Markers from "../Markers/Markers.client";
import TrainLines from "../TrainLines";

import "leaflet/dist/leaflet.css";

import { useTripsStore } from "~/store/useTripsStore";
import { mapBounds } from "~/utils";

export default function TrainMap() {
  const trips = useTripsStore((e) => e.tripsData.Trips.Trip);
  const [filteredLine, setFilteredLine] = useState("");
  const mapRef = useRef<MapType>(null);

  let filteredTrips = trips.filter((trip) => trip.LineCode === filteredLine);

  if (filteredTrips.length === 0) {
    filteredTrips = trips;
  }

  const bounds = useMemo(
    () => mapBounds(),
    [mapBounds()]
  ) as LatLngBoundsExpression;

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
        <TrainLines />
        <MarkerClusterGroup
          chunkedLoading
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={false}
          maxClusterRadius={20}
        >
          <Markers trips={filteredTrips} mapRef={mapRef} />
        </MarkerClusterGroup>
        <Interactions
          mapRef={mapRef}
          bounds={bounds}
          filteredLine={filteredLine}
          setFilteredLine={setFilteredLine}
        />
      </MapContainer>
    </div>
  );
}
