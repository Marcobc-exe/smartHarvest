import "./index.css";
import { FC } from "react";
import { Control, FieldValues, UseFormHandleSubmit } from "react-hook-form";
import { Input } from "../../Inputs/InputController";
import { requiredRule } from "../../../utils/const";

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
          <div className="boxButtonsNewMap">
            <button type="submit" className="btnCreateNewMap">
              Create
            </button>
            <button
              className="btnCancellNewMap"
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
