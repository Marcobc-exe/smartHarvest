import "./index.css";
import { useForm } from "react-hook-form";
import { Area, InputArea } from "../../../types/areas";
import { FC, useState } from "react";
import { useStateProp } from "../../../types/read";
import { MapType } from "../../../types/map";
import { PanelBtn } from "../../ListAreas/PanelBtns/PanelBtn";
import { Input } from "../../Inputs/InputController";
import { requiredRule } from "../../../utils/const";
import { Select } from "../../Selects/Select";

type props = {
  addArea: boolean;
  area: number[][];
  currentMap: MapType;
  handleSetAddArea: (value: boolean) => void;
  handleSetArea: () => void;
  handleUndoPolygon: () => void;
  handleCancelArea: () => void;
};

export const FormArea: FC<props> = ({
  addArea,
  area,
  currentMap,
  handleSetAddArea,
  handleSetArea,
  handleUndoPolygon,
  handleCancelArea,
}) => {
  const { control, handleSubmit, resetField, getValues } = useForm<InputArea>({
    defaultValues: { name: "", tagName: "", crop: { id: 0, name: "" } },
  });
  const [errorArea, setErrorArea]: useStateProp<boolean> = useState(false);

  const handleResetFields = () => {
    resetField("name");
    resetField("crop");
    resetField("tagName");
  };

  const handleSaveArea = (values: InputArea) => {
    const strCrop = getValues("crop");
    const cropChoosed = JSON.parse(strCrop);
    
    if (area.length && cropChoosed.id != 0) {
      const listAreas: Area[] = JSON.parse(
        localStorage.getItem("areas") ?? "[]"
      );
      const newArea: Area = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              id: listAreas.length + 1,
              farmId: parseInt(currentMap.id),
              name: values.name, // required
              tagName: values.tagName ?? "", // optional
              cropId: cropChoosed.id, // required
              cropName: cropChoosed.name, // required
              status: 0, // optional
            },
            geometry: {
              coordinates: [area],
              type: "Polygon",
            },
          },
        ],
      };
      
      const newListAreas = JSON.stringify([...listAreas, newArea]);
      localStorage.setItem("areas", newListAreas);
      setErrorArea(false);
      handleSetAddArea(false);
      handleSetArea();
      handleResetFields();
    } else {
      setErrorArea(true);
    }
  };

  const handleClose = () => {
    handleCancelArea();
    handleResetFields();
  };

  return (
    <>
      {addArea && (
        <form
          className="containerFormArea"
          onSubmit={handleSubmit(handleSaveArea)}
        >
          <PanelBtn
            area={area}
            handleClose={handleClose}
            handleUndoPolygon={handleUndoPolygon}
            handleDelPolygon={handleSetArea}
          />
          <hr className="hrBtnUndo" />
          <span className="tlNewArea">New Area</span>
          <Input
            control={control}
            name="name"
            placeholder="Name"
            rules={requiredRule}
            classNameBox="boxInputCropName"
            classNameInput="inputNameArea"
            classNameIcon="iconPencil"
          />
          <Input
            control={control}
            name="tagName"
            placeholder="Tag name"
            rules={requiredRule}
            classNameBox="boxInputCropName"
            classNameInput="inputTagName"
            classNameIcon="iconPencil"
          />
          <Select
            control={control}
            name="crop"
            rules={requiredRule}
            classSelect="selectCropArea"
            classOption="optionCrop"
          />
          {errorArea && area.length < 3 && <span>Coordinates required</span>}
          <div className="containerBtnsFormArea">
            <hr className="hrBtnsFormArea" />
            <button className="submitArea" type="submit">
              Save
            </button>
            <button className="cancelArea" onClick={() => handleClose()}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};
