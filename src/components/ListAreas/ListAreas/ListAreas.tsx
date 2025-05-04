import { FC } from "react";
import { Area } from "../../../types/areas";
import { BtnArea } from "../BtnArea/BtnArea";
import { BtnEditArea } from "../BtnEditArea/BtnEditArea";
import "./index.css";

type props = {
  listAreas: Area[];
  onClickArea: () => void;
  handleAddArea: (area?: Area) => void;
};

export const ListAreas: FC<props> = ({
  listAreas,
  onClickArea,
  handleAddArea,
}) => {
  return (
    <div className="btnContainerAreas">
      {listAreas.map((area: Area, index) => (
        <div key={index} className={"btnBoxArea"}>
          <BtnArea area={area} onClickArea={onClickArea} />
          <BtnEditArea
            area={area}
            currentArea="a"
            handleAddArea={handleAddArea}
          />
        </div>
      ))}
    </div>
  );
};
