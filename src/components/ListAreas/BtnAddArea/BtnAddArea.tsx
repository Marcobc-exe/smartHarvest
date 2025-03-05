import { FC } from "react";
import "./index.css";

type props = {
  handleAddArea: () => void;
};

export const BtnAddArea: FC<props> = ({ handleAddArea }) => {
  return (
    <>
      <button
        className={"btnAddEnabled"}
        onClick={() => handleAddArea()}
      >
        Add area
      </button>
      <hr className="hrAddArea" />
    </>
  );
};
