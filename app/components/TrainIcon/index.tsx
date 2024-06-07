import L from "leaflet";

import train_icon from "../../assets/train-icon.svg";

export default function TrainIcon(course: number) {
  const courseVal = -90 + course;
  let scaleY = 1;

  if (courseVal > 120) {
    scaleY = -1;
  }

  return L.divIcon({
    className: "leaflet-div-icon",
    html: `<img style="transform: rotate(${courseVal}deg) scaleY(${scaleY}); height:20px; width:20px" src=${train_icon}>`,
  });
}
