import { FC } from "react";
import { MapType } from "../../../types/map";
import { BtnEditMap } from "../BtnEditMap/BtnEditMap";
import { BtnMap } from "../BtnMap/BtnMap";

type props = {
  listOfMaps: MapType[];
  currentMap: MapType;
  displayEditForm: boolean;
  displayForm: boolean;
  onClickmap: (mapData: MapType) => void;
  handleEditMap: (map: MapType) => void;
}

export const ListMaps: FC<props> = ({
  listOfMaps,
  displayForm,
  displayEditForm,
  currentMap,
  onClickmap,
  handleEditMap,
}) => {
  return (
    <>
      {listOfMaps.map((map: MapType) => (
        <div key={map.id} className="btnContainer">
          <BtnMap
            displayForm={displayForm}
            currentMap={currentMap}
            map={map}
            onClickmap={onClickmap}
          />
          <BtnEditMap
            displayForm={displayForm}
            displayEditForm={displayEditForm}
            currentMap={currentMap}
            map={map}
            handleEditMap={handleEditMap}
          />
        </div>
      ))}
    </>
  );
};
