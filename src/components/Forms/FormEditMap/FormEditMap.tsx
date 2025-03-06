import { X } from "@phosphor-icons/react";
import "./index.css";
import { FC } from "react";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { ContainerListAreas } from "../../ListAreas/ContainerListAreas";
import { Area } from "../../../types/areas";
import { Input } from "../../Inputs/InputController";
import { requiredRule } from "../../../utils/const";

type props<T extends FieldValues> = {
  addArea: boolean;
  displayEditForm: boolean;
  control: Control<T>;
  errorCoords: boolean;
  listAreas: Area[];
  handleSaveMap: (value: T) => void;
  handleSubmit: UseFormHandleSubmit<T>;
  handleCancelEditMap: () => void;
  handleDeleteMap: () => void;
  handleAddArea: () => void;
  onClickArea: () => void;
};

export const FormEditMap: FC<props<{ name: string }>> = ({
  addArea,
  displayEditForm,
  control,
  errorCoords,
  listAreas,
  handleSaveMap,
  handleSubmit,
  handleCancelEditMap,
  handleDeleteMap,
  handleAddArea,
  onClickArea,
}) => {
  return (
    <>
      {displayEditForm && !addArea && (
        <form className="formMapEdit" onSubmit={handleSubmit(handleSaveMap)}>
          <div style={{ position: "relative", marginBottom: "34px" }}>
            <button
              className="btnClosePanel"
              onClick={() => handleCancelEditMap()}
            >
              <X weight="bold" color="white" />
            </button>
          </div>
          <Input
            control={control}
            name="name"
            placeholder="Name"
            rules={requiredRule}
            classNameBox="boxInputName"
            classNameInput="inputName"
            classNameIcon="inputIconPencil"
          />
          {errorCoords && (
            <span style={{ color: "white" }}>Coordinates required</span>
          )}
          <ContainerListAreas
            listAreas={listAreas}
            onClickArea={onClickArea}
            handleAddArea={handleAddArea}
          />
          <div className="boxButtons">
            <button type="submit" className="btnCreateMap">
              Save
            </button>
            <button
              className="btnCancelMap"
              onClick={() => handleCancelEditMap()}
            >
              Cancel
            </button>
            <hr className="hrDelete" />
            <button className="btnDeleteMap" onClick={() => handleDeleteMap()}>
              Delete
            </button>
          </div>
        </form>
      )}
    </>
  );
};
