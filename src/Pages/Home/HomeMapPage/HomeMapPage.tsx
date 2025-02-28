import "./index.css";
import { Suspense, useState } from "react";
import { Map, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import DeckGl from "deck.gl";
import {PolygonLayer} from "@deck.gl/layers"
// import { DrawLineStringMode, EditingMode, Editor } from "react-map-gl-draw";

import { useForm } from "react-hook-form";
import { Coords, dataNewMap, InputMap, MapType } from "../../../types/map";
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
import { FormEditMap } from "../../../components/Forms/FormEditMap/FormEditMap";
import { MarkerCreateMap } from "../../../components/Markers/MarkerCreateMap/MarkerCreateMap";
import { useNavigate } from "react-router-dom";
import { handleCursor } from "../../../utils/handleCursor";
import { LoaderMap } from "../../../components/LoaderMap/LoaderMap";
import { ContainerListMaps } from "../../../components/ListMaps/ContainerListMaps";

export const HomeMapPage = () => {
  const navigate = useNavigate();
  const listOfMaps: MapType[] | [] = JSON.parse(
    localStorage.getItem("maps") ?? "[]"
  );
  const { control, handleSubmit, resetField, setValue } = useForm<InputMap>({
    defaultValues: { name: "" },
  });
  const [coords, setCoords]: useStateProp<number[] | []> = useState([]);
  const [errorCoords, setErrorCoords]: useStateProp<boolean> = useState(false);
  const [displayForm, setDisplayForm]: useStateProp<boolean> = useState(false);
  const [displayEditForm, setDisplayEditForm]: useStateProp<boolean> =
    useState(false);
  const [currentMap, setCurrentMap]: useStateProp<MapType> = useState(
    listOfMaps[0]
  );
  const [addLayer, setAddLayer]: useStateProp<boolean> = useState(false)
  const [polygon, setPolygon]: useStateProp<number[][]> = useState([])
  const [isDrawing, setIsDrawing]: useStateProp<boolean> = useState(false)

  const onClickmap = (map: MapType) => {
    if (map.id != currentMap.id) {
      setCurrentMap(map);
      if (coords.length) setCoords([]);
    }
  };

  const handleAddMap = () => {
    if (!displayForm) setDisplayForm(true);
    setCurrentMap(defaultMap);
    resetField("name");
  };

  const handleCenterPoint = (data: dataNewMap) => {
    setCoords(data.coords);
    setCurrentMap((preValues: MapType) => ({
      ...preValues,
      center: `${data.coords[1]}; ${data.coords[0]}`,
      zoom: data.zoom,
    }));
  };

  const handleDrawPolygon = (data: { coords: Coords }) => {
    const [longitude, latitude] = data.coords;
    console.log(longitude, latitude)

    if (!isDrawing) {
      setPolygon([[longitude, latitude]])
      setIsDrawing(true)
    } else {
      setPolygon((prev: number[][]) => [...prev, [longitude, latitude]])
    }
  }

  const handleCreateMap = (value: { name: string }) => {
    if (coords.length) {
      const listFarms = JSON.parse(localStorage.getItem("maps") ?? "[]");
      const newFarm = {
        id: listFarms.length + 1,
        name: value.name,
        center: `${coords[1]}; ${coords[0]}`,
        zoom: currentMap.zoom,
        minZoom: 1,
        maxZoom: 20,
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
    setCurrentMap(listOfMaps[0]);
  };

  const handleEditMap = (map: MapType) => {
    if (map.id != currentMap.id || !displayEditForm) {
      const center = map.center
        .split(";")
        .map((coord) => parseFloat(coord))
        .reverse();

      setDisplayEditForm(true);
      setCoords(center);
      setCurrentMap(map);
      setValue("name", map.name);
    }
  };

  const handleSaveMap = (value: { name: string }) => {
    const listFarms: MapType[] = JSON.parse(
      localStorage.getItem("maps") ?? "[]"
    );
    const editFarm = {
      ...currentMap,
      name: value.name,
      center: `${coords[1]}; ${coords[0]}`,
      zoom: currentMap.zoom,
    };
    const newListFarm = listFarms.map((farm) => {
      if (farm.id == editFarm.id) {
        return editFarm;
      } else {
        return farm;
      }
    });

    localStorage.setItem("maps", JSON.stringify(newListFarm));
    setCurrentMap(editFarm);
    setDisplayEditForm(false);
    setCoords([]);
    setErrorCoords(false);
  };

  const handleCancelEditMap = () => {
    setDisplayEditForm(false);
    setCoords([]);
    setErrorCoords(false);
  };

  const handleDeleteMap = () => {
    const maps: MapType[] = JSON.parse(localStorage.getItem("maps") ?? "[]");
    const updatedMaps = maps.filter((map) => map.id !== currentMap.id);

    localStorage.setItem("maps", JSON.stringify(updatedMaps));

    if (updatedMaps.length > 0) {
      setCurrentMap(updatedMaps[0]);
    } else {
      navigate("/");
    }
  };

  // Create Polygon Layer
  const polygonLayer = new PolygonLayer({
    id: "polygon-layer",
    data: polygon.length > 2 ? [{ coordinates: polygon }] : [],
    pickable: true,
    stroked: true,
    filled: true,
    extruded: false,
    lineWidthMinPixels: 2,
    getPolygon: (d) => d.coordinates,
    getFillColor: [0, 128, 255, 120], // Blue with transparency
    getLineColor: [255, 255, 255], // White border
    getLineWidth: 2,
  });

  return (
    <Suspense fallback={<LoaderMap />}>
      <h2>Smart Harvest</h2>
      <div className="container">
        <ContainerListMaps
          displayEditForm={displayEditForm}
          displayForm={displayForm}
          listOfMaps={listOfMaps}
          currentMap={currentMap}
          onClickmap={onClickmap}
          handleAddMap={handleAddMap}
          handleEditMap={handleEditMap}
        />
        <DeckGl
          initialViewState={initialView(currentMap)}
          controller={true}
          style={displayForm || displayEditForm ? STYLE_ADD_MAP : STYLE_MAP}
          onClick={(data) => {
            if (displayForm || displayEditForm) {
              handleCenterPoint({
                coords: (data.coordinate as Coords) ?? [0, 0],
                zoom: data.viewport?.zoom ?? 1,
              });
            } else if (addLayer) {
              handleDrawPolygon({
                coords: (data.coordinate as Coords) ?? [0, 0],
              })
            }
          }}
          getCursor={(event) => handleCursor(event)}
          layers={[polygonLayer]}
        >
          <Map
            mapStyle={MAP_STYLE}
            mapboxAccessToken={MAPBOX_TOKEN}
            minZoom={currentMap.minZoom}
            maxZoom={currentMap.maxZoom}
            doubleClickZoom={false}
            dragPan={false}
          >
            <MarkerCreateMap coords={coords} />
            <NavigationControl />
          </Map>
        </DeckGl>
        <FormNewMap
          displayForm={displayForm}
          control={control}
          errorCoords={errorCoords}
          handleCreateMap={handleCreateMap}
          handleSubmit={handleSubmit}
          handleCancelCreateMap={handleCancelCreateMap}
        />
        <FormEditMap
          displayEditForm={displayEditForm}
          control={control}
          errorCoords={errorCoords}
          handleSaveMap={handleSaveMap}
          handleSubmit={handleSubmit}
          handleCancelEditMap={handleCancelEditMap}
          handleDeleteMap={handleDeleteMap}
        />
      </div>
    </Suspense>
  );
};
