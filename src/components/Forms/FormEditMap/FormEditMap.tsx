import { PencilSimple, X } from "@phosphor-icons/react";
import "./index.css";
import { FC } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormHandleSubmit,
} from "react-hook-form";
import { ContainerListAreas } from "../../ListAreas/ContainerListAreas";
import { Area } from "../../../types/areas";

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
      {(displayEditForm && !addArea) && (
        <form className="formMapEdit" onSubmit={handleSubmit(handleSaveMap)}>
          <div style={{ position: "relative", marginBottom: "34px"}}>
            <button className="btnClosePanel" onClick={() => handleCancelEditMap()}>
              <X weight="bold" color="white"/>
            </button>
          </div>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: { value, onChange, onBlur, ref },
              formState: { errors },
            }) => (
              <div
                className="boxInputName"
                style={{
                  border: errors.name ? "1px solid red" : "none",
                  borderBottom: "1px solid rgba(255, 255, 255, .3)",
                }}
              >
                <input
                  className="inputName"
                  type="text"
                  placeholder="Name"
                  onChange={onChange}
                  onBlur={onBlur}
                  ref={ref}
                  value={value}
                />
                <PencilSimple size={18} className="inputIconPencil" />
              </div>
            )}
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
