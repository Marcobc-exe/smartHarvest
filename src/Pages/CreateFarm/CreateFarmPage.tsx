import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import { lazy, Suspense, useState } from "react";
import { Map, NavigationControl } from "react-map-gl/mapbox";
import { LoaderMap } from "../../components/LoaderMap/LoaderMap";
import { initialView } from "../../utils/initialViewfunction";
import { defaultMap, MAP_STYLE, MAPBOX_TOKEN, STYLE_MAP } from "../../config/configMap";
import { dataNewMap, InputMap, MapType } from "../../types/map";
import { useStateProp } from "../../types/read";
import { FormNewMap } from "../../components/Forms/FormNewMap/FormNewMap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MarkerCreateMap } from "../../components/Markers/MarkerCreateMap/MarkerCreateMap";

const DeckGl = lazy(() => import("deck.gl"));

export const CreateFarmPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<InputMap>({
    defaultValues: { name: "" },
  });
  const [coords, setCoords]: useStateProp<number[] | []> = useState([]);
  const [errorCoords, setErrorCoords]: useStateProp<boolean> = useState(false);
  const [mapBody, setMapBody]: useStateProp<MapType> = useState(defaultMap);
  const [displayForm]: useStateProp<boolean> = useState(true);

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
      navigate("/mapView");
      setErrorCoords(false);
    } else {
      setErrorCoords(true);
    }
  };

  const handleCancelCreateMap = () => {
    navigate("/")
  }

  return (
    <Suspense fallback={<LoaderMap />}>
      <h2 className="title">Create map</h2>
      <div className="container">
        <DeckGl
          initialViewState={initialView(defaultMap)}
          controller={true}
          style={STYLE_MAP}
          onClick={(data) => {
            handleCenterPoint({
              coords: (data.coordinate as [number, number] ?? [0, 0]),
              zoom: data.viewport?.zoom ?? 1,
            });
          }}
        >
          <Map
            mapStyle={MAP_STYLE}
            mapboxAccessToken={MAPBOX_TOKEN}
            minZoom={defaultMap.minZoom}
            maxZoom={defaultMap.maxZoom}
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
      </div>
    </Suspense>
  );
};
