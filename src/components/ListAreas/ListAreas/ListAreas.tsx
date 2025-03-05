import { FC } from "react";
import { AreaType } from "../../../types/areas";
import { BtnArea } from "../BtnArea/BtnArea";
import { BtnEditArea } from "../BtnEditArea/BtnEditArea";
import "./index.css"

type props = {
  listOfAreas: AreaType[];
  onClickArea: () => void;
};

export const ListAreas: FC<props> = ({ listOfAreas, onClickArea }) => {
  return (
    <div className="btnContainerAreas">
      {listOfAreas.map((map: AreaType) => (
        <div key={map.id} className="btnBoxArea">
          <BtnArea onClickArea={onClickArea} />
          <BtnEditArea currentArea="a"/>
        </div>
      ))}
    </div>
  );
};
