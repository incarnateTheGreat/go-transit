import { ScheduleTrip } from "types";

import Progress from "../Progress";

import { LINES, TRAIN_STATIONS } from "~/constants";
import { useTripsStore } from "~/store/useTripsStore";

type RowsProps = {
  children: JSX.Element | JSX.Element[] | null;
};

const Rows = ({ children }: RowsProps) => {
  return (
    <div
      className="grid grid-cols-2 px-2"
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
    Cars,
  } = selectedTrip;

  return (
    <div>
      <div>
        <Rows>
          <span className="font-semibold">Line</span>
          <span>{LINES[LineCode]}</span>
        </Rows>
        <Rows>
          <span className="font-semibold">Heading towards</span>
          <span>{TRAIN_STATIONS[LastStopCode]}</span>
        </Rows>
        <Rows>
          <span className="font-semibold">Next stop</span>
          <span>{TRAIN_STATIONS[NextStopCode] ?? NextStopCode}</span>
        </Rows>
        <Rows>
          {AtStationCode ? (
            <>
              <span className="font-semibold">Currenty at</span>
              <span>{TRAIN_STATIONS[AtStationCode]}</span>
            </>
          ) : null}
        </Rows>
        <Rows>
          <span className="font-semibold">Expected arrival time</span>
          <span>{EndTime}</span>
        </Rows>
        <Rows>
          <span className="font-semibold">Status</span>
          <span>{IsInMotion ? "Moving" : "Stopped"}</span>
        </Rows>
        <Rows>
          <span className="font-semibold">Cars</span>
          <span>{Cars}</span>
        </Rows>
      </div>
      <Progress
        scheduleTrip={scheduleTrip}
        NextStopCode={NextStopCode}
        AtStationCode={AtStationCode}
      />
    </div>
  );
}
