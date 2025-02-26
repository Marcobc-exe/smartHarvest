import DeckGl from "@deck.gl/react";
import { Map, Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { ListMaps } from "../../components/ListMaps/ListMaps"
import { MapType } from "../../types/map";
import { useState } from "react";
import { useStateProp } from "../../types/read";
import { MAP_STYLE, MAPBOX_TOKEN, STYLE_MAP } from "../../config/configMap";
import { initialView } from "../../utils/initialViewfunction";

export const HomeMapPage = () => {
  const listOfMaps = JSON.parse(localStorage.getItem("maps") ?? "[]");
  const [currentMap, setCurrentMap]: useStateProp<MapType> = useState(listOfMaps[0]);

  const onClickmap = (map: MapType) => {
    if (map.id != currentMap.id) {
      setCurrentMap(map);
    }
  }

  return (
    <div>
      <h2>Smart Harvest</h2>
      <div className="container">
        <ListMaps
          listOfMaps={listOfMaps}
          currentMap={currentMap}
          onClickmap={onClickmap}
        />
        <DeckGl
          initialViewState={initialView(currentMap)}
          controller={true}
          style={STYLE_MAP}
        >
          <Map
            mapStyle={MAP_STYLE}
            mapboxAccessToken={MAPBOX_TOKEN}
            minZoom={currentMap.minZoom}
            maxZoom={currentMap.maxZoom}
            doubleClickZoom={false}
            dragPan={false}
          >
            <NavigationControl />
          </Map>
        </DeckGl>
      </div>
    </div>
  )
}