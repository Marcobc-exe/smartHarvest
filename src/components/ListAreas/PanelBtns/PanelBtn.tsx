import "./index.css";
import { ArrowBendDownLeft, TrashSimple, X } from "@phosphor-icons/react";
import { FC } from "react";

type props = {
  area: number[][];
  handleClose: () => void;
  handleUndoPolygon: () => void;
  handleDelPolygon: () => void;
};

export const PanelBtn: FC<props> = ({
  area,
  handleClose,
  handleUndoPolygon,
  handleDelPolygon,
}) => {
  const isDisabled = area.length == 0 ? true : false;

  return (
    <div className="containerPanelBtns">
      <div className="containerEditBtns">
        <button
          disabled={isDisabled}
          className={isDisabled ? "btnUndoPolygonDisabled" : "btnUndoPolygon"}
          onClick={() => handleUndoPolygon()}
        >
          <ArrowBendDownLeft size={18} weight="bold" />
        </button>
        <button
          disabled={isDisabled}
          className={isDisabled ? "btnDelPolygonDisabled" : "btnDelPolygon"}
          onClick={() => handleDelPolygon()}
        >
          <TrashSimple size={18} weight="bold" />
        </button>
      </div>
      <button className="btnClosePanel" onClick={() => handleClose()}>
        <X size={16} weight="bold" color="white" />
      </button>
    </div>
  );
};
