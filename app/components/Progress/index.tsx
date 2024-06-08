import { ScheduleTrip } from "types";

import { TRAIN_STATIONS } from "~/constants";

type Props = {
  scheduleTrip: ScheduleTrip | undefined;
  NextStopCode?: string;
  AtStationCode?: string | null;
};

export default function Progress({
  scheduleTrip,
  NextStopCode,
  AtStationCode,
}: Props) {
  const journey = scheduleTrip?.Trips[0]?.Stops;

  if (!journey) return <div>No trip data.</div>;

  return (
    <div className="mt-2">
      <div className="grid grid-cols-2">
        <span className="font-semibold">Stops</span>{" "}
        <ul>
          {journey.map((stop) => {
            return (
              <li
                key={stop.Code}
                className={
                  stop.Code === NextStopCode || stop.Code === AtStationCode
                    ? "font-bold"
                    : ""
                }
              >
                {TRAIN_STATIONS[stop.Code]}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
