import { useRef, useState } from "react";
import { MapContainer, Polyline, TileLayer } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import type { LatLngBoundsLiteral, Map as MapType } from "leaflet";
import { TrainTrip } from "types";

import Interactions from "../Interactions";
import Markers from "../Markers/Markers.client";

import "leaflet/dist/leaflet.css";

import { BALA_LATLONS } from "~/railSubdivisions/bala";
import { KINGSTON_LATLONS } from "~/railSubdivisions/kingston";
import { NEWMARKET_LATLONS } from "~/railSubdivisions/newmarket";
import { OAKVILLE_LATLONS } from "~/railSubdivisions/oakville";
import { UXBRIDGE_LATLONS } from "~/railSubdivisions/uxbridge";
import { WESTON_LATLONS } from "~/railSubdivisions/weston";

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
        <Polyline
          pathOptions={{ color: "green" }}
          positions={KINGSTON_LATLONS}
        />
        <Polyline
          pathOptions={{ color: "purple" }}
          positions={UXBRIDGE_LATLONS}
        />
        <Polyline pathOptions={{ color: "orange" }} positions={BALA_LATLONS} />
        <Polyline
          pathOptions={{ color: "blue" }}
          positions={NEWMARKET_LATLONS}
        />
        <Polyline pathOptions={{ color: "brown" }} positions={WESTON_LATLONS} />
        <Polyline
          pathOptions={{ color: "yellow" }}
          positions={OAKVILLE_LATLONS}
        />
        <MarkerClusterGroup
          chunkedLoading
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={false}
          maxClusterRadius={50}
        >
          <Markers trips={filteredTrips} mapRef={mapRef} />
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
