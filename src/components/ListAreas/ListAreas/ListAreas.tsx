import { FC } from "react";
import { Area } from "../../../types/areas";
import { BtnArea } from "../BtnArea/BtnArea";
import { BtnEditArea } from "../BtnEditArea/BtnEditArea";
import "./index.css";

type props = {
  listAreas: Area[];
  onClickArea: () => void;
};

export const ListAreas: FC<props> = ({ listAreas, onClickArea }) => {
  return (
    <div className="btnContainerAreas">
      {listAreas.map((area: Area, index) => (
        <div key={index} className={"btnBoxArea"}>
          <BtnArea area={area} onClickArea={onClickArea} />
          <BtnEditArea currentArea="a" />
        </div>
      ))}
    </div>
  );
};
