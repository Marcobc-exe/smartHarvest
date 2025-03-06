import { FC } from "react";
import { Marker } from "react-map-gl/mapbox";

type props = {
  area: number[][];
};

export const AreaPoints: FC<props> = ({ area }) => (
  <>
    {area.length > 0 &&
      area.map((area, i) => (
        <Marker key={i} longitude={area[0]} latitude={area[1]}>
          <div className="pointNewArea" />
        </Marker>
      ))}
  </>
);
