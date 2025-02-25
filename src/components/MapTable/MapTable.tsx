import { useState } from "react";
import { useStateProp } from "../../types/read";
import { ListMaps } from "../ListMaps/ListMaps";
import { MapType } from "../../types/map";
import { MapCanvas } from "../Map/MapCanvas";
import "./index.css";

export const MapTable = () => {
  const storedMaps = JSON.parse(localStorage.getItem("maps") ?? "[]");
  const [listOfMaps, setListOfMaps]: useStateProp<MapType[]> = useState(
    storedMaps || []
  );
  const [currentMap, setCurrentMap]: useStateProp<MapType> = useState(storedMaps[0] || []);

  const onClickmap = (mapData: MapType) => {
    setCurrentMap(mapData);
  };
  
  // const map = [
  //   {
  //     id: "0",
  //     name: "VEGA BAJA",
  //     center: "-32.420329; -70.952348",
  //     zoom: 14,
  //   },
  //   {
  //     id: "1",
  //     name: "Billy Corn",
  //     center: "-32.411042; -71.047160",
  //     zoom: 14,
  //   }
  // ]
  
  // localStorage.setItem('maps', JSON.stringify(map));

  return (
    <div className="containerMapTable">
      {listOfMaps.length ? (
        <ListMaps listOfMaps={listOfMaps} onClickmap={onClickmap} />
      ) : (
        <h2>No maps...</h2>
      )}
      {listOfMaps.length ? <MapCanvas currentMap={currentMap} /> : null}
    </div>
  );
};
