import { FC } from "react";
import { MapType } from "../../types/map";
import "./index.css";

type props = {
  listOfMaps: MapType[];
  currentMap: MapType;
  onClickmap: (mapData: MapType) => void;
};

export const ListMaps: FC<props> = ({ listOfMaps, currentMap, onClickmap }) => {
  return (
    <div className="listMapsItem">
      {listOfMaps.map((map: MapType) => (
        <button
          key={map.id}
          className="boxMapItem"
          onClick={() => onClickmap(map)}
          style={{
            fontWeight: currentMap.id == map.id ? "bold" : "normal",
            border:
              currentMap.id == map.id ? "solid 1px rgb(173, 144, 39)" : "none",
          }}
        >
          <span className="mapName">{map.name}</span>
        </button>
      ))}
    </div>
  );
};
