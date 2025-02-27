import { PencilSimple } from "@phosphor-icons/react";
import { MapType } from "../../../types/map";
import { FC } from "react";

type props = {
  displayForm: boolean;
  displayEditForm: boolean;
  currentMap: MapType;
  map: MapType;
  handleEditMap: (map: MapType) => void;
};

export const BtnEditMap: FC<props> = ({
  displayForm,
  displayEditForm,
  currentMap,
  map,
  handleEditMap,
}) => {
  return (
    <PencilSimple
      size={14}
      className={
        displayForm || displayEditForm || currentMap.id == map.id
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
          displayForm || (displayEditForm && currentMap.id) == map.id ? 0.5 : 1,
        cursor:
          displayForm || (displayEditForm && currentMap.id == map.id)
            ? "default"
            : "pointer",
      }}
    />
  );
};
