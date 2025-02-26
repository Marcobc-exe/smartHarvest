import DeckGl from "@deck.gl/react";
import { Map, NavigationControl, Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import { ListMaps } from "../../../components/ListMaps/ListMaps";
import { dataNewMap, InputMap, MapType } from "../../../types/map";
import { useState } from "react";
import { useStateProp } from "../../../types/read";
import {
  defaultMap,
  MAP_STYLE,
  MAPBOX_TOKEN,
  STYLE_ADD_MAP,
  STYLE_MAP,
} from "../../../config/configMap";
import { initialView } from "../../../utils/initialViewfunction";
import { FormNewMap } from "../../../components/Forms/FormNewMap/FormNewMap";
import { useForm } from "react-hook-form";
import Pin from "../../../components/Pin/Pin";

export const HomeMapPage = () => {
  const listOfMaps = JSON.parse(localStorage.getItem("maps") ?? "[]");
  const { control, handleSubmit, resetField } = useForm<InputMap>({
    defaultValues: { name: "" },
  });
  const [coords, setCoords]: useStateProp<number[] | []> = useState([]);
  const [errorCoords, setErrorCoords]: useStateProp<boolean> = useState(false);
  const [mapBody, setMapBody]: useStateProp<MapType> = useState(defaultMap);
  const [displayForm, setDisplayForm]: useStateProp<boolean> = useState(false);
  const [currentMap, setCurrentMap]: useStateProp<MapType> = useState(
    listOfMaps[0]
  );

  const onClickmap = (map: MapType) => {
    if (map.id != currentMap.id) {
      setCurrentMap(map);
      if (coords.length) setCoords([]);
    }
  };

  const handleAddMap = () => {
    if (!displayForm) setDisplayForm(true);
  };

  const handleCenterPoint = (data: dataNewMap) => {
    setCoords(data.coords);
    setMapBody((preValues: MapType) => ({
      ...preValues,
      center: data.coords,
      zoom: data.zoom,
    }));
  };

  const handleCreateMap = (value: { name: string }) => {
    if (coords.length) {
      const listFarms = JSON.parse(localStorage.getItem("maps") ?? "[]");
      const newFarm = {
        id: listFarms.length + 1,
        name: value.name,
        center: `${coords[1]}; ${coords[0]}`,
        zoom: Number.parseInt(mapBody.zoom.toString()),
        minZoom: mapBody.minZoom,
        maxZoom: mapBody.maxZoom,
      };
      const list = JSON.stringify([...listFarms, newFarm]);
      localStorage.setItem("maps", list);

      setCurrentMap(newFarm);
      setDisplayForm(false);
      setCoords([]);
      setErrorCoords(false);
    } else {
      setErrorCoords(true);
    }
  };

  const handleCancelCreateMap = () => {
    resetField("name");
    setDisplayForm(false);
    setCoords([]);
    setErrorCoords(false);
  }

  return (
    <>
      <h2>Smart Harvest</h2>
      <div className="container">
        <ListMaps
          displayForm={displayForm}
          listOfMaps={listOfMaps}
          currentMap={currentMap}
          onClickmap={onClickmap}
          handleAddMap={handleAddMap}
        />
        <DeckGl
          initialViewState={initialView(currentMap)}
          controller={true}
          style={displayForm ? STYLE_ADD_MAP : STYLE_MAP}
          onClick={(data) => {
            if (displayForm) {
              handleCenterPoint({
                coords: data.coordinate,
                zoom: data.viewport?.zoom,
              });
            }
          }}
        >
          <Map
            mapStyle={MAP_STYLE}
            mapboxAccessToken={MAPBOX_TOKEN}
            minZoom={currentMap.minZoom}
            maxZoom={currentMap.maxZoom}
            doubleClickZoom={false}
            dragPan={false}
          >
            {coords.length && (
              <Marker
                longitude={coords[0]}
                latitude={coords[1]}
                anchor="bottom"
              >
                <Pin size={20} />
              </Marker>
            )}
            <NavigationControl />
          </Map>
        </DeckGl>
        {displayForm && (
          <FormNewMap
            control={control}
            errorCoords={errorCoords}
            handleCreateMap={handleCreateMap}
            handleSubmit={handleSubmit}
            handleCancelCreateMap={handleCancelCreateMap}
          />
        )}
      </div>
    </>
  );
};
