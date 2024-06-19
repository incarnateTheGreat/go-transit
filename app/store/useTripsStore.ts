import { TrainTrip } from "types";
import { create } from "zustand";

interface TripsStore {
  selectedTrip: TrainTrip | null;
  setSelectedTrip: (selectedTripToUpdate: TrainTrip | null) => void;
}

export const useTripsStore = create<TripsStore>()((set) => ({
  selectedTrip: null,
  setSelectedTrip: (selectedTripToUpdate: TrainTrip | null) =>
    set(() => ({ selectedTrip: selectedTripToUpdate })),
}));
