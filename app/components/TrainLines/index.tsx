import { Polyline } from "react-leaflet";

import { BARRIE_LATLONS } from "~/train_lines/barrie";
import { KITCHENR_LATLONS } from "~/train_lines/kitchener";
import { LAKESHORE_EAST_LATLONS } from "~/train_lines/lakeshore_east";
import { LAKESHORE_WEST_LATLONS } from "~/train_lines/lakeshore_west";
import { MILTON_LATLONS } from "~/train_lines/milton";
import { RICHMOND_HILL_LATLONS } from "~/train_lines/richmond_hill";
import { STOUFFVILLE_LATLONS } from "~/train_lines/stouffvile";

export default function TrainLines() {
  return (
    <>
      <Polyline
        pathOptions={{ color: "#ef2d24" }}
        positions={LAKESHORE_EAST_LATLONS}
      />
      <Polyline
        pathOptions={{ color: "#804f11" }}
        positions={STOUFFVILLE_LATLONS}
      />
      <Polyline
        pathOptions={{ color: "#01abea" }}
        positions={RICHMOND_HILL_LATLONS}
      />
      <Polyline pathOptions={{ color: "#015e9f" }} positions={BARRIE_LATLONS} />
      <Polyline
        pathOptions={{ color: "#00843c" }}
        positions={KITCHENR_LATLONS}
      />
      <Polyline
        pathOptions={{ color: "#8e0134" }}
        positions={LAKESHORE_WEST_LATLONS}
      />
      <Polyline pathOptions={{ color: "#de6428" }} positions={MILTON_LATLONS} />
    </>
  );
}
