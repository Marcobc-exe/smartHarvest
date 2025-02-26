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
};

export const FormEditMap: FC<props<{ name: string }>> = ({
  displayEditForm,
  control,
  errorCoords,
  handleSaveMap,
  handleSubmit,
  handleCancelEditMap,
}) => {
  return (
    <>
      {displayEditForm && (
        <form className="formMap" onSubmit={handleSubmit(handleSaveMap)}>
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
              <input
                className="inputName"
                type="text"
                placeholder="Name"
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
                value={value}
                style={{
                  border: errors.name ? "1px solid red" : "none",
                }}
              />
            )}
          />
          <button type="submit" className="btnCreateMap">
            Save
          </button>
          <button className="btnCancellMap" onClick={() => handleCancelEditMap()}>
            Cancel
          </button>
          {errorCoords && (
            <span style={{ color: "white" }}>Coordinates required</span>
          )}
        </form>
      )}
    </>
  );
};
