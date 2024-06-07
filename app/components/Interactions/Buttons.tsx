import { useRevalidator } from "@remix-run/react";
import type { LatLngBoundsLiteral, Map as MapType } from "leaflet";

import Loading from "../Loading";

type Props = {
  mapRef: React.RefObject<MapType>;
  bounds: LatLngBoundsLiteral;
};

export default function Buttons({ mapRef, bounds }: Props) {
  const revalidator = useRevalidator();

  return (
    <div className="flex justify-between">
      <button
        type="button"
        className="p-2 bg-slate-500 text-white font-semibold rounded mr-2"
        onClick={() => {
          revalidator.revalidate();
        }}
      >
        {revalidator.state === "loading" ? (
          <div className="w-14 flex justify-center">
            <Loading variant="small" />
          </div>
        ) : null}
        {revalidator.state === "idle" ? (
          <div className="w-14 flex justify-center">Refresh</div>
        ) : null}
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
  );
}
