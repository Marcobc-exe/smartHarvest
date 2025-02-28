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
  displayForm: boolean;
  control: Control<T>;
  errorCoords: boolean;
  handleCreateMap: (value: T) => void;
  handleSubmit: UseFormHandleSubmit<T>;
  handleCancelCreateMap: () => void;
};

export const FormNewMap: FC<props<{ name: string }>> = ({
  displayForm,
  control,
  errorCoords,
  handleCreateMap,
  handleSubmit,
  handleCancelCreateMap,
}) => {
  return (
    <>
      {displayForm && (
        <form className="formMap" onSubmit={handleSubmit(handleCreateMap)}>
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
              Create
            </button>
            <button
              className="btnCancellMap"
              onClick={() => handleCancelCreateMap()}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
};
