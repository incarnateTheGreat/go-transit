type Trip = {
  id: string;
  is_deleted: boolean;
  trip_update: null;
  vehicle: Vehicle;
  alert: null;
};

type Vehicle = {
  trip: {
    trip_id: string;
    route_id: string;
    direction_id: number;
    start_time: string;
    start_date: string;
    schedule_relationship: string;
  };
  vehicle: { id: string; label: string; license_plate: string };
  position: {
    latitude: number;
    longitude: number;
    bearing: number;
    odometer: number;
    speed: number;
  };
  stop_id: string;
  current_status: string;
  timestamp: number;
  congestion_level: string;
  occupancy_status: string;
};

type TrainTrip = {
  Cars: string;
  TripNumber: string;
  StartTime: string;
  EndTime: string;
  LineCode: string;
  RouteNumber: string;
  VariantDir: string;
  Display: string;
  Latitude: number;
  Longitude: number;
  IsInMotion: boolean;
  DelaySeconds: number;
  Course: number;
  FirstStopCode: string;
  LastStopCode: string;
  PrevStopCode: string;
  NextStopCode: string;
  AtStationCode: string | null;
  ModifiedDate: string;
};

type Stop = {
  ArrivalTime: {
    Computed: string;
    Scheduled: string;
    Status: string;
  };
  DepartureTime: {
    Computed: string;
    Scheduled: string;
    Status: string;
  };
  Code: string;
  Remark: null;
  Status: string;
  Track: {
    Scheduled: string;
    Actual: string;
  };
};

type ScheduleTripData = {
  Destination: string;
  Latitude: number;
  Longitude: number;
  Number: string;
  Status: string;
  Stops: Stop[];
  TimeStamp: string;
};

type ScheduleTrip = {
  Trips: ScheduleTripData[];
};

export type { ScheduleTrip, TrainTrip, Trip, Vehicle };
