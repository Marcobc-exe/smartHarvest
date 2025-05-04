import { FC } from "react";
import { Area } from "../../../types/areas";

type props = {
  area: Area;
  onClickArea: () => void;
};

export const BtnArea: FC<props> = ({ area, onClickArea }) => {
  // console.log(area.features[0].properties)
  return (
    <button
      className={"btnArea"}
      onClick={() => onClickArea()}
      style={{
        // fontWeight: currentMap.id == map.id ? "bold" : "normal",
        // border:
        //   currentMap.id == map.id ? "solid 1px rgb(173, 144, 39)" : "none",
      }}
    >
      <span className="areaName">{area.features[0].properties.name}</span>
      <span className="areaName">{area.features[0].properties.tagName}</span>
    </button>
  )
}