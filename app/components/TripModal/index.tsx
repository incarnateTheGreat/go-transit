import { useEffect } from "react";
import { ScheduleTrip } from "types";

import Loading from "../Loading";

import PopupData from "./PopupData";

type TripModal = {
  fetcher: {
    state: "idle" | "loading" | "submitting";
    data: ScheduleTrip | undefined;
  };
  clearData: () => void;
};

export default function TripModal({ fetcher, clearData }: TripModal) {
  const keyInput = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      clearData();
    }
  };

  useEffect(() => {
    const tripModal = document.getElementById("trip-modal");

    tripModal?.focus();
    document.addEventListener("keydown", keyInput);

    return () => {
      tripModal?.blur();
      document.removeEventListener("keydown", keyInput);
    };
  }, []);

  return (
    <div
      className="absolute min-h-96 max-h-[30rem] right-2 z-[450] w-96 bg-slate-500 text-white mb-2 px-4 py-3 mt-2 overflow-x-auto flex flex-col"
      id="trip-modal"
    >
      <div className="flex justify-end">
        <span
          role="none"
          className="cursor-pointer"
          onClick={() => clearData()}
        >
          X
        </span>
      </div>

      <div className="flex flex-1">
        {fetcher.state === "loading" || fetcher.state === "submitting" ? (
          <div className="flex justify-center items-center w-full">
            <Loading />
          </div>
        ) : null}

        {fetcher.state === "idle" ? (
          <div className="w-full">
            <PopupData scheduleTrip={fetcher.data} />
          </div>
        ) : null}
      </div>
    </div>
  );
}
