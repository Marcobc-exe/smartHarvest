import "./index.css";
import { FC } from "react";
import { MapType } from "../../types/map";
import { BtnAddMap } from "./BtnAddMap/BtnAddMap";
import { ListMaps } from "./ListMaps/ListMaps";

type props = {
  displayEditForm: boolean;
  displayForm: boolean;
  listOfMaps: MapType[];
  currentMap: MapType;
  onClickmap: (mapData: MapType) => void;
  handleAddMap: () => void;
  handleEditMap: (map: MapType) => void;
};

export const ContainerListMaps: FC<props> = ({
  displayEditForm,
  displayForm,
  listOfMaps,
  currentMap,
  onClickmap,
  handleAddMap,
  handleEditMap,
}) => {
  return (
    <div className="listMapsItem">
      <BtnAddMap
        displayForm={displayForm}
        displayEditForm={displayEditForm}
        handleAddMap={handleAddMap}
      />
      <ListMaps
        listOfMaps={listOfMaps}
        currentMap={currentMap}
        displayForm={displayForm}
        displayEditForm={displayEditForm}
        onClickmap={onClickmap}
        handleEditMap={handleEditMap}
      />
    </div>
  );
};
