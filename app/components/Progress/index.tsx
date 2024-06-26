import { ScheduleTrip } from "types";

import { TRAIN_STATIONS } from "~/constants";
import { cn } from "~/utils";

type Props = {
  scheduleTrip: ScheduleTrip | undefined;
  NextStopCode?: string;
  AtStationCode?: string | null;
};

export default function Progress({ scheduleTrip, NextStopCode }: Props) {
  const journey = scheduleTrip?.Trips[0]?.Stops;

  if (!journey) return <div>No trip data.</div>;

  return (
    <div className="mt-2 bg-slate-900">
      <div>
        <span className="font-semibold px-2">Stops</span>
        <ul>
          {journey.map((stop) => {
            return (
              <li
                key={stop.Code}
                className={cn(
                  "grid-cols-2 grid odd:bg-slate-600/40 px-2 py-1",
                  {
                    "font-bold": stop.Code === NextStopCode,
                  }
                )}
                style={{
                  gridTemplateColumns: "1fr 30%",
                }}
              >
                <span>{TRAIN_STATIONS[stop.Code]} </span>
                <span>
                  {stop.ArrivalTime.Scheduled ?? "--"}
                  {stop.ArrivalTime.Computed ? (
                    <span className="ml-2">({stop.ArrivalTime.Computed})</span>
                  ) : (
                    "--"
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
