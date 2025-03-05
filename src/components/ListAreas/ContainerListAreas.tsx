import { FC } from "react";
import { BtnAddArea } from "./BtnAddArea/BtnAddArea";
import "./index.css";
import { ListAreas } from "./ListAreas/ListAreas";
import { AreaType } from "../../types/areas";

type props = {
  addArea: boolean;
  listOfAreas: AreaType[];
  handleAddArea: () => void;
  onClickArea: () => void;
};

export const ContainerListAreas: FC<props> = ({
  addArea,
  listOfAreas,
  handleAddArea,
  onClickArea,
}) => {
  return (
    <div className="containerBtnAreas">
      <BtnAddArea addArea={addArea} handleAddArea={handleAddArea} />
      <ListAreas listOfAreas={listOfAreas} onClickArea={onClickArea} />
    </div>
  );
};
