import "./index.css";
import { Controller, useForm } from "react-hook-form";
import { Area, InputArea } from "../../../types/areas";
import { FC, useState } from "react";
import { useStateProp } from "../../../types/read";
import { MapType } from "../../../types/map";
import { ArrowBendDownLeft } from "@phosphor-icons/react";

type props = {
  addArea: boolean;
  area: number[][];
  currentMap: MapType;
  handleSetAddArea: (value: boolean) => void;
  handleSetArea: () => void;
  handleUndoPolygon: () => void;
};

export const FormArea: FC<props> = ({ addArea, area, currentMap, handleSetAddArea, handleSetArea, handleUndoPolygon }) => {
  const { control, handleSubmit, resetField, setValue } = useForm<InputArea>({
    defaultValues: { name: "", tagName: "", cropName: "" },
  });
  const [errorArea, setErrorArea]: useStateProp<boolean> = useState(false)

  const handleSaveArea = (values: InputArea) => {
    if (area.length) {
      // const cropName = values.cropName;
      const cropName = 1;
      const listAreas: Area[] = JSON.parse(localStorage.getItem("areas") ?? "[]");
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
              cropId: cropName, // required
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
      resetField("name")
      resetField("cropName")
      resetField("tagName")
    } else {
      setErrorArea(true);
    }
  };

  return (
    <>
      {addArea && (
        <form
          className="containerFormArea"
          onSubmit={handleSubmit(handleSaveArea)}
        >
          <button disabled={area.length == 0} className="btnUndoPolygon" onClick={() => handleUndoPolygon()}>
            <ArrowBendDownLeft size={16} weight="bold"/>
          </button>
          <hr className="hrBtnUndo"/>
          <Controller
            control={control}
            name="name"
            rules={{
              required: true
            }}
            render={({
              field: { value, onChange, onBlur, ref },
              formState: { errors },
            }) => {
              return (
                <input
                  className="inputNameArea"
                  type="text"
                  placeholder="Name"
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  value={value}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="tagName"
            rules={{
              required: true
            }}
            render={({
              field: { value, onChange, onBlur, ref },
              formState: { errors },
            }) => {
              return (
                <input
                  className="inputTagName"
                  type="text"
                  placeholder="Tag name"
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  value={value}
                />
              );
            }}
          />
          <Controller
            control={control}
            name="cropName"
            rules={{
              required: true
            }}
            render={({
              field: { value, onChange, onBlur, ref },
              formState: { errors },
            }) => {
              return (
                <input
                  className="inputCropName"
                  type="text"
                  placeholder="Crop name"
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  value={value}
                />
              );
            }}
          />
          {(errorArea && area.length < 3) && <span>Coordinates required</span>}
          <div className="containerBtnsFormArea">
            <hr className="hrBtnsFormArea"/>
            <button type="submit">Save</button>
            <button>Cancel</button>
          </div>
        </form>
      )}
    </>
  );
};
