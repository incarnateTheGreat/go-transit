import { useEffect } from "react";
import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData, useRevalidator } from "@remix-run/react";
import { ClientOnly } from "remix-utils";
import { TrainTrip } from "types";

import Map from "~/components/Map/Map.client";
import { getTodaysDate } from "~/utils";

export const meta: MetaFunction = () => {
  return [
    { title: "GO Transit Tracker" },
    { name: "description", content: "This is a GO Transit tracker!" },
  ];
};

const env = import.meta.env;

export async function action({ request }: ActionFunctionArgs) {
  const { TripNumber } = await request.json();

  const routeData = await fetch(
    `${env.VITE_BASE_URL}/Schedule/Trip/${getTodaysDate()}/${TripNumber}/?key=${
      env.VITE_API_KEY
    }`
  );

  return routeData.json();
}

export const loader = async () => {
  const vehiclePos = await fetch(
    `${env.VITE_BASE_URL}/ServiceataGlance/Trains/All?key=${env.VITE_API_KEY}`
    // `${process.env.BASE_URL}/Gtfs/Feed/VehiclePosition?key=30024267`
    // `${process.env.BASE_URL}/UP/Gtfs/Feed/VehiclePosition?key=30024267`
  );

  return vehiclePos.json();
};

// type LoaderData = {
//   header: {
//     gtfs_realtime_version: string;
//     incrementality: string;
//     timestamp: number;
//   };
//   entity: Trip[];
// };

type TrainLoaderData = {
  Metadata: {
    TimeStamp: string;
    ErrorCode: string;
    ErrorMessage: string;
  };
  Trips: {
    Trip: TrainTrip[];
  };
};

export default function Index() {
  const vehiclePosToRender = useLoaderData<TrainLoaderData>();

  const revalidator = useRevalidator();

  useEffect(() => {
    const interval = setInterval(() => {
      revalidator.revalidate();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ClientOnly fallback={null}>
      {() => {
        return (
          // <Map trips={vehiclePosToRender.entity} revalidator={revalidator} />
          <Map
            trips={vehiclePosToRender.Trips.Trip}
            revalidator={revalidator}
          />
        );
      }}
    </ClientOnly>
  );
}
