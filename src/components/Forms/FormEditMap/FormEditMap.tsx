import { PencilSimple } from "@phosphor-icons/react";
import "./index.css";
import { FC } from "react";
import {
  Control,
  Controller,
  FieldValues,
  UseFormHandleSubmit,
} from "react-hook-form";

type props<T extends FieldValues> = {
  displayEditForm: boolean;
  control: Control<T>;
  errorCoords: boolean;
  handleSaveMap: (value: T) => void;
  handleSubmit: UseFormHandleSubmit<T>;
  handleCancelEditMap: () => void;
  handleDeleteMap: () => void;
};

export const FormEditMap: FC<props<{ name: string }>> = ({
  displayEditForm,
  control,
  errorCoords,
  handleSaveMap,
  handleSubmit,
  handleCancelEditMap,
  handleDeleteMap,
}) => {
  return (
    <>
      {displayEditForm && (
        <form className="formMapEdit" onSubmit={handleSubmit(handleSaveMap)}>
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
                <PencilSimple size={18} className="inputIconPencil"/>
              </div>
            )}
          />
          {errorCoords && (
            <span style={{ color: "white" }}>Coordinates required</span>
          )}
          <div className="boxButtons">
            <button type="submit" className="btnCreateMap">
              Save
            </button>
            <button className="btnCancelMap" onClick={() => handleCancelEditMap()}>
              Cancel
            </button>
            <hr className="hrDelete"/>
            <button className="btnDeleteMap" onClick={() => handleDeleteMap()}>
              Delete
            </button>
          </div>
        </form>
      )}
    </>
  );
};
