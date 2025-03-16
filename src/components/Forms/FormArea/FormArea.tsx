import "./index.css";
import { useForm } from "react-hook-form";
import { Area, InputArea } from "../../../types/areas";
import { FC, useCallback, useEffect, useState } from "react";
import { useStateProp } from "../../../types/read";
import { MapType } from "../../../types/map";
import { PanelBtn } from "../../ListAreas/PanelBtns/PanelBtn";
import { Input } from "../../Inputs/InputController";
import { requiredRule } from "../../../utils/const";
import { Select } from "../../Selects/Select";

type props = {
  currentArea: Area | null;
  addArea: boolean;
  area: number[][];
  currentMap: MapType;
  handleSetAddArea: (value: boolean) => void;
  handleSetArea: () => void;
  handleUndoPolygon: () => void;
  handleCancelArea: () => void;
};

export const FormArea: FC<props> = ({
  currentArea,
  addArea,
  area,
  currentMap,
  handleSetAddArea,
  handleSetArea,
  handleUndoPolygon,
  handleCancelArea,
}) => {
  const title = currentArea ? "Edit Area" : "New Area";
  const { control, handleSubmit, resetField, getValues, setValue } =
    useForm<InputArea>({
      defaultValues: { name: "", tagName: "", crop: { id: 0, name: "" } },
    });
  const [errorArea, setErrorArea]: useStateProp<boolean> = useState(false);

  const handleResetFields = () => {
    resetField("name");
    resetField("crop");
    resetField("tagName");
  };

  const handleSaveArea = (values: InputArea) => {
    const cropChoosed = getValues("crop");
    const listAreas: Area[] = JSON.parse(localStorage.getItem("areas") ?? "[]");

    if (currentArea) {
      const newList = listAreas.map(oldArea => {
        const areaId = oldArea.features[0].properties.id;
        const currentAreaId = currentArea.features[0].properties.id;
        const oldProps = oldArea.features[0].properties

        if (areaId === currentAreaId) {
          return {
            ...currentArea,
            features: [
              {
                properties: {
                  id: oldProps.id,
                  name: getValues("name").trim(),
                  tagName: getValues("tagName").trim(),
                  cropId: getValues("crop.id"),
                  cropName: getValues("crop.name"),
                  farmId: oldProps.farmId,
                  status: oldProps.status
                },
                geometry: {
                  coordinates: [area],
                  type: "Polygon"
                },
              },
            ],
          };
        } else {
          return oldArea;
        }
      });
      localStorage.setItem("areas", JSON.stringify(newList));
      setErrorArea(false);
      handleSetAddArea(false);
      handleSetArea();
      handleResetFields();
    } else if (area.length && cropChoosed.id != 0) {
      const newArea: Area = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {
              id: listAreas.length + 1,
              farmId: parseInt(currentMap.id),
              name: values.name.trim(), // required
              tagName: values.tagName.trim() ?? "", // optional
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

  const handleCurrentArea = useCallback(() => {
    if (currentArea !== null) {
      const properties = currentArea.features[0].properties;
      setValue("name", properties.name);
      setValue("tagName", properties.tagName);
      setValue("crop", { id: properties.cropId, name: properties.cropName });
    }
  }, [currentArea, setValue]);

  useEffect(() => {
    handleCurrentArea();
  }, [handleCurrentArea]);

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
          <span className="tlNewArea">{title}</span>
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
