import { FC } from "react";
import "./index.css";

type props = {
  addArea: boolean;
  handleAddArea: () => void;
};

export const BtnAddArea: FC<props> = ({ addArea, handleAddArea }) => {
  return (
    <>
      <button
        className={addArea ? "btnAddDisabled" : "btnAddEnabled"}
        disabled={addArea}
        onClick={() => handleAddArea()}
      >
        Add area
      </button>
      <hr className="hrAddArea" />
    </>
  );
};
