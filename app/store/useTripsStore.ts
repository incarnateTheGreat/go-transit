import { TrainTrip } from "types";
import { create } from "zustand";

import { TrainLoaderData } from "~/routes/_index";

interface TripsStore {
  tripsData: TrainLoaderData;
  setTripsData: (tripsDataTpUpdate: TrainLoaderData) => void;
  selectedTrip: TrainTrip | null;
  setSelectedTrip: (selectedTripToUpdate: TrainTrip | null) => void;
}

export const useTripsStore = create<TripsStore>()((set) => ({
  tripsData: {
    Metadata: {
      TimeStamp: "",
      ErrorCode: "",
      ErrorMessage: "",
    },
    Trips: {
      Trip: [],
    },
  },
  setTripsData: (tripsDataTpUpdate: TrainLoaderData) =>
    set(() => ({ tripsData: tripsDataTpUpdate })),
  selectedTrip: null,
  setSelectedTrip: (selectedTripToUpdate: TrainTrip | null) =>
    set(() => ({ selectedTrip: selectedTripToUpdate })),
}));
