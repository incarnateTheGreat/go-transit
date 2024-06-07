import { useState } from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { useFetcher } from "@remix-run/react";
import L from "leaflet";
import { ScheduleTrip, TrainTrip } from "types";

import train_icon from "../assets/train-icon.svg";

import PopupData from "./PopupData";

// const TrainIcon = new L.Icon({
//   iconUrl: train_icon,
//   iconRetinaUrl: train_icon,
//   iconSize: new L.Point(25, 25),
//   className: "leaflet-div-icon",
// });

const TrainIcon = (Course: number) => {
  // const courseVal = Math.abs(Course - 90);
  const courseVal = -90 + Course;
  let scaleY = 1;

  if (courseVal > 120) {
    scaleY = -1;
  }

  return L.divIcon({
    // iconSize: [20, 20],
    // iconAnchor: [10, 10],
    className: "leaflet-div-icon",
    html: `<img 
    style="transform: rotate(${courseVal}deg) scaleY(${scaleY}); height:20px; width:20px"
    src=${train_icon}>`,
  });
};

type MarkersProps = {
  // trips: Trip[];
  trips: TrainTrip[];
};

export default function Markers({ trips }: MarkersProps) {
  const [modal, setModal] = useState(false);
  const [tripData, setTripData] = useState<TrainTrip | null>();
  const fetcher = useFetcher<ScheduleTrip>();

  const handleGetRouteData = (TripNumber: string) => () => {
    fetcher.submit(
      { TripNumber },
      {
        method: "POST",
        encType: "application/json",
      }
    );

    // setModal(true);
    // setTripData(trip);
  };

  const clearData = () => {
    setModal(false);
    setTripData(null);
  };

  return (
    <>
      {modal && tripData ? (
        <div className="absolute h-96 right-2 z-[450] w-80 bg-slate-500 text-white mb-2 p-4 py-2 mt-2 overflow-x-auto">
          <div className="flex justify-end">
            <span
              role="none"
              className="cursor-pointer"
              onClick={() => clearData()}
              onKeyDown={() => clearData()}
            >
              X
            </span>
          </div>
          <PopupData trip={tripData} scheduleTrip={fetcher.data} />
        </div>
      ) : null}
      {trips.map((trip) => {
        // const {
        //   vehicle: { position, stop_id, current_status },
        // } = trip;

        // const { latitude, longitude } = position;

        const { TripNumber, Latitude, Longitude, Course } = trip;

        // console.log(TripNumber);

        return (
          <Marker
            key={TripNumber}
            position={[Latitude, Longitude]}
            icon={TrainIcon(Course)}
            eventHandlers={{
              click: handleGetRouteData(TripNumber),
            }}
          >
            <Tooltip>
              {TripNumber} {Course}
            </Tooltip>
            <Popup minWidth={400}>
              <PopupData trip={trip} scheduleTrip={fetcher.data} />
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}
