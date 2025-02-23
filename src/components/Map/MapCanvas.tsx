import DeckGl from "@deck.gl/react";
import Map from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { FC, Suspense } from "react";
import { LoaderMap } from "../LoaderMap/LoaderMap";
import { initialView } from "./utils/initialViewfunction";
import { MAP_STYLE, MAPBOX_TOKEN } from "../../config/configMap";
import { MapType } from "../../types/map";

const STYLE_MAP = {
  height: "calc(100vh - 180px)",
  width: "100%",
  position: "relative",
};

type props = {
  currentMap: MapType;
};

export const MapCanvas: FC<props> = ({ currentMap }) => {
  return (
    <Suspense fallback={<LoaderMap />}>
      <DeckGl
        initialViewState={initialView(currentMap)}
        controller={true}
        style={STYLE_MAP}
      >
        <Map
          mapStyle={MAP_STYLE}
          mapboxAccessToken={MAPBOX_TOKEN}
          minZoom={13}
          maxZoom={17}
          doubleClickZoom={false}
          dragPan={false}
        />
      </DeckGl>
    </Suspense>
  );
};
