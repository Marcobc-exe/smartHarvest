import DeckGl from "@deck.gl/react";
import { Map, Marker, NavigationControl } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import "./index.css";
import { Suspense, useState } from "react";
import { LoaderMap } from "../../components/LoaderMap/LoaderMap";
import { initialView } from "../../utils/initialViewfunction";
import { MAP_STYLE, MAPBOX_TOKEN, STYLE_NEW_MAP } from "../../config/configMap";
import { dataNewMap, MapType } from "../../types/map";
import { useStateProp } from "../../types/read";
import Pin from "../../components/Pin/Pin";
import { FormNewMap } from "../../components/Forms/FormNewMap/FormNewMap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type InputMap = {
  name: string;
};

const map = {
  id: "-1",
  name: "Default",
  center: "0; 0",
  zoom: 1.5,
  minZoom: 1,
  maxZoom: 20,
};

export const CreateFarmPage = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<InputMap>({
    defaultValues: { name: "" },
  });
  const [coords, setCoords]: useStateProp<number[] | []> = useState([]);
  const [errorCoords, setErrorCoords]: useStateProp<boolean> = useState(false);
  const [mapBody, setMapBody]: useStateProp<MapType> = useState(map);

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

  return (
    <Suspense fallback={<LoaderMap />}>
      <h2 className="title">Create map</h2>
      <div className="container">
        <DeckGl
          initialViewState={initialView(map)}
          controller={true}
          style={STYLE_NEW_MAP}
          onClick={(data) => {
            handleCenterPoint({
              coords: data.coordinate,
              zoom: data.viewport?.zoom,
            });
          }}
        >
          <Map
            mapStyle={MAP_STYLE}
            mapboxAccessToken={MAPBOX_TOKEN}
            minZoom={map.minZoom}
            maxZoom={map.maxZoom}
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
        <FormNewMap
          control={control}
          errorCoords={errorCoords}
          handleCreateMap={handleCreateMap}
          handleSubmit={handleSubmit}
        />
      </div>
    </Suspense>
  );
};
