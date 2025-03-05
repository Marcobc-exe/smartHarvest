import { PencilSimple } from "@phosphor-icons/react";
import { FC } from "react";

type props = {
  currentArea: string;
};

export const BtnEditArea: FC<props> = () => {
  return (
    <PencilSimple
      size={14}
      className="btnEditArea"
      // className={
      //   displayForm || displayEditForm || currentMap.id == map.id
      //     ? "btnEditDisabled"
      //     : "btnEditMap"
      // }
      // onClick={() => {
      //   if (!displayForm) {
      //     handleEditMap(map);
      //   }
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
