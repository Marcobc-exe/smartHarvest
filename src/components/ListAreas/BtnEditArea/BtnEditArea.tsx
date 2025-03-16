import { PencilSimple } from "@phosphor-icons/react";
import { FC } from "react";
import { Area } from "../../../types/areas";

type props = {
  currentArea: string;
  area: Area;
  handleAddArea: (area?: Area) => void;
};

export const BtnEditArea: FC<props> = ({ area, handleAddArea }) => {
  return (
    <PencilSimple
      size={14}
      className={"btnEditArea"}
      onClick={() => handleAddArea(area)}
      // className={
      //   displayForm || displayEditForm || currentMap.id == map.id
      //     ? "btnEditDisabled"
      //     : "btnEditMap"
      // }
      // onClick={() => {
      // handleEditMap(map);
      // }}
      // style={{
      //   opacity:
      //     displayForm || (displayEditForm && currentMap.id) == map.id ? 0.5 : 1,
      //   cursor:
      //     displayForm || (displayEditForm && currentMap.id == map.id)
      //       ? "default"
      //       : "pointer",
      // }}
    />
  );
};
