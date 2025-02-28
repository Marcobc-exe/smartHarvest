import { FC } from "react";
import { MapType } from "../../../types/map";

type props = {
  displayForm: boolean;
  currentMap: MapType;
  map: MapType;
  onClickmap: (mapData: MapType) => void;
};

export const BtnMap: FC<props> = ({
  displayForm,
  map,
  currentMap,
  onClickmap,
}) => {
  return (
    <button
      className={!displayForm ? "btnMap" : "btnMapDisabled"}
      onClick={() => onClickmap(map)}
      style={{
        fontWeight: currentMap.id == map.id ? "bold" : "normal",
        border:
          currentMap.id == map.id ? "solid 1px rgb(173, 144, 39)" : "none",
        opacity: displayForm ? 0.5 : 1,
        cursor: displayForm ? "default" : "pointer",
      }}
      disabled={displayForm}
    >
      <span className="mapName">{map.name}</span>
    </button>
  );
};
