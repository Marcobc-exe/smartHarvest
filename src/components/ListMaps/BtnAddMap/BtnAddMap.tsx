import { FC } from "react";

type props = {
  displayForm: boolean;
  displayEditForm: boolean;
  handleAddMap: () => void;
};

export const BtnAddMap: FC<props> = ({
  displayForm,
  displayEditForm,
  handleAddMap,
}) => {
  return (
    <button
      className={
        !displayForm && !displayEditForm ? "btnEnabled" : "btnDisabled"
      }
      onClick={() => handleAddMap()}
      disabled={displayForm || displayEditForm}
    >
      +
    </button>
  );
};
