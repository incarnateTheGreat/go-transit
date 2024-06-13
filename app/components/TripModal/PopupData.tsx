import { ScheduleTrip } from "types";

import Progress from "../Progress";

import { LINES, TRAIN_STATIONS } from "~/constants";
import { useTripsStore } from "~/store/useTripsStore";

type ColumnsProps = {
  children: JSX.Element | JSX.Element[] | null;
};

const Columns = ({ children }: ColumnsProps) => {
  return (
    <div
      className="grid grid-cols-2"
      style={{
        gridTemplateColumns: "1fr 30%",
      }}
    >
      {children}
    </div>
  );
};

type PopupDataProps = {
  scheduleTrip: ScheduleTrip | undefined;
};

export default function PopupData({ scheduleTrip }: PopupDataProps) {
  const selectedTrip = useTripsStore((e) => e.selectedTrip);

  if (!selectedTrip) return;

  const {
    EndTime,
    LineCode,
    NextStopCode,
    LastStopCode,
    AtStationCode,
    IsInMotion,
  } = selectedTrip;

  return (
    <div>
      <div>
        <Columns>
          <span className="font-semibold">Line</span>
          <span>{LINES[LineCode]}</span>
        </Columns>
        <Columns>
          <span className="font-semibold">Heading towards</span>
          <span>{TRAIN_STATIONS[LastStopCode]}</span>
        </Columns>
        <Columns>
          <span className="font-semibold">Next stop</span>
          <span>{TRAIN_STATIONS[NextStopCode] ?? NextStopCode}</span>
        </Columns>
        <Columns>
          {AtStationCode ? (
            <>
              <span className="font-semibold">Currenty at</span>
              <span>{TRAIN_STATIONS[AtStationCode]}</span>
            </>
          ) : null}
        </Columns>
        <Columns>
          <span className="font-semibold">Expected arrival time</span>
          <span>{EndTime}</span>
        </Columns>
        <Columns>
          <span className="font-semibold">Status</span>
          <span>{IsInMotion ? "Moving" : "Stopped"}</span>
        </Columns>
      </div>
      <Progress
        scheduleTrip={scheduleTrip}
        NextStopCode={NextStopCode}
        AtStationCode={AtStationCode}
      />
    </div>
  );
}
