import { FC } from "react";

type props = {
  onClickArea: () => void;
};

export const BtnArea: FC<props> = ({ onClickArea }) => {
  return (
    <button
      className="btnArea"
      onClick={() => onClickArea()}
      style={{
        // fontWeight: currentMap.id == map.id ? "bold" : "normal",
        // border:
        //   currentMap.id == map.id ? "solid 1px rgb(173, 144, 39)" : "none",
        // opacity: displayForm ? 0.5 : 1,
        // cursor: displayForm ? "default" : "pointer",
      }}
    >
      <span className="areaName">{"area.name"}</span>
    </button>
  )
}