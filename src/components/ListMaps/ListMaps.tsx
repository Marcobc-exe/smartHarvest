import "./index.css";
import { FC } from "react";
import { MapType } from "../../types/map";
import { PencilSimple } from "@phosphor-icons/react";

type props = {
  displayEditForm: boolean;
  displayForm: boolean;
  listOfMaps: MapType[];
  currentMap: MapType;
  onClickmap: (mapData: MapType) => void;
  handleAddMap: () => void;
  handleEditMap: (map: MapType) => void;
};

export const ListMaps: FC<props> = ({
  displayEditForm,
  displayForm,
  listOfMaps,
  currentMap,
  onClickmap,
  handleAddMap,
  handleEditMap,
}) => {
  return (
    <div className="listMapsItem">
      <button
        className={
          !displayForm && !displayEditForm ? "btnEnabled" : "btnDisabled"
        }
        onClick={() => handleAddMap()}
        disabled={displayForm || displayEditForm}
      >
        +
      </button>
      {listOfMaps.map((map: MapType) => (
        <div key={map.id} className="btnContainer">
          <button
            className={!displayForm ? "btnMap" : "btnMapDisabled"}
            onClick={() => {
              if (!displayForm) {
                onClickmap(map);
              }
            }}
            style={{
              fontWeight: currentMap.id == map.id ? "bold" : "normal",
              border:
                currentMap.id == map.id
                  ? "solid 1px rgb(173, 144, 39)"
                  : "none",
              opacity: displayForm ? 0.5 : 1,
              cursor: displayForm ? "default" : "pointer",
            }}
          >
            <span className="mapName">{map.name}</span>
          </button>
          <PencilSimple
            size={14}
            className={
              (displayForm || displayEditForm) || currentMap.id == map.id
                ? "btnEditDisabled"
                : "btnEditMap"
            }
            onClick={() => {
              if (!displayForm) {
                handleEditMap(map);
              }
            }}
            style={{
              opacity:
                displayForm || (displayEditForm && currentMap.id) == map.id
                  ? 0.5
                  : 1,
              cursor:
                displayForm || (displayEditForm && currentMap.id == map.id)
                  ? "default"
                  : "pointer",
            }}
          />
        </div>
      ))}
    </div>
  );
};
