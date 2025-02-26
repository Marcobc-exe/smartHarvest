import { FC } from "react";
import { MapType } from "../../types/map";
import "./index.css";

type props = {
  displayForm: boolean;
  listOfMaps: MapType[];
  currentMap: MapType;
  onClickmap: (mapData: MapType) => void;
  handleAddMap: () => void;
};

export const ListMaps: FC<props> = ({
  displayForm,
  listOfMaps,
  currentMap,
  onClickmap,
  handleAddMap,
}) => {
  return (
    <div className="listMapsItem">
      <button
        className={!displayForm ? "btnEnabled" : "btnDisabled"}
        onClick={() => handleAddMap()}
        disabled={displayForm}
      >
        +
      </button>
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
