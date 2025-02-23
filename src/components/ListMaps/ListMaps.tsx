import { FC } from "react";
import { MapType } from "../../types/map";
import "./index.css";

type props = {
  listOfMaps: MapType[];
  onClickmap: (mapData: MapType) => void;
};

export const ListMaps: FC<props> = ({ listOfMaps, onClickmap }) => {
  return (
    <div className="listMapsItem">
      {listOfMaps.map((map: MapType) => (
        <button
          key={map.id}
          className="boxMapItem"
          onClick={() => onClickmap(map)}
        >
          <span className="mapName">{map.name}</span>
        </button>
      ))}
    </div>
  );
};
