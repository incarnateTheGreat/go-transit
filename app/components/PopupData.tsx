import { Suspense } from "react";
import { ScheduleTrip, TrainTrip } from "types";

import Progress from "./Progress";

import { LINES, TRAIN_STATIONS } from "~/constants";

type PopupDataProps = {
  trip: TrainTrip;
  scheduleTrip: ScheduleTrip | undefined;
};

export default function PopupData({ trip, scheduleTrip }: PopupDataProps) {
  const { EndTime, LineCode, NextStopCode, LastStopCode, AtStationCode } = trip;

  return (
    <div>
      <div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Line</span>
          <span>{LINES[LineCode]}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Heading towards</span>
          <span>{TRAIN_STATIONS[LastStopCode]}</span>
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Next stop</span>{" "}
          <span>{TRAIN_STATIONS[NextStopCode] ?? NextStopCode}</span>
        </div>
        <div>
          {AtStationCode ? (
            <div className="grid grid-cols-2">
              <span className="font-semibold">Currenty at</span>
              <span>{TRAIN_STATIONS[AtStationCode]}</span>
            </div>
          ) : null}
        </div>
        <div className="grid grid-cols-2">
          <span className="font-semibold">Expected arrival time</span>{" "}
          <span>{EndTime}</span>
        </div>
      </div>
      {scheduleTrip ? (
        <Suspense fallback={<div>Loading...</div>}>
          <Progress
            scheduleTrip={scheduleTrip}
            NextStopCode={NextStopCode}
            AtStationCode={AtStationCode}
          />
        </Suspense>
      ) : null}
    </div>
  );
}
