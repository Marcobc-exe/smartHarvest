import { FC } from "react";
import { BtnAddArea } from "./BtnAddArea/BtnAddArea";
import "./index.css";
import { ListAreas } from "./ListAreas/ListAreas";
import { Area } from "../../types/areas";

type props = {
  listAreas: Area[];
  handleAddArea: () => void;
  onClickArea: () => void;
};

export const ContainerListAreas: FC<props> = ({
  listAreas,
  handleAddArea,
  onClickArea,
}) => {
  return (
    <div className="containerBtnAreas">
      <BtnAddArea handleAddArea={handleAddArea} />
      <ListAreas listAreas={listAreas} onClickArea={onClickArea} />
    </div>
  );
};
