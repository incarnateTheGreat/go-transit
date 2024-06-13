import L from "leaflet";
import { TrainTrip } from "types";

import train_icon from "../../assets/train-icon.svg";

export default function TrainIcon(
  course: number,
  tripNumber: string,
  selectedTrip: TrainTrip | null | undefined
) {
  const courseVal = -90 + course;
  let scaleY = 1;

  if (courseVal > 120) {
    scaleY = -1;
  }

  let className = "leaflet-div-icon";

  if (tripNumber === selectedTrip?.TripNumber) {
    className += " leaflet-div-icon selected";
  }

  return L.divIcon({
    className,
    html: `<img style="transform: rotate(${courseVal}deg) scaleY(${scaleY}); height:20px; width:20px" src=${train_icon}>`,
  });
}
