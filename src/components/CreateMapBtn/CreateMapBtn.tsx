import { FC } from "react";
import "./index.css";

type props = {
  onClickCreateMap: () => void;
};

export const CreateMapBtn: FC<props> = ({ onClickCreateMap }) => {
  return (
    <div className="containerBtnNewMap">
      <button className="btnNewMap" onClick={() => onClickCreateMap()}>
        <div className="boxPlus">
          <span className="plus">+</span>
        </div>
        <span className="newMap">Enter a new map!</span>
      </button>
    </div>
  );
};
