import { Marker } from "react-map-gl/mapbox";
import Pin from "../../Pin/Pin";
import { FC } from "react";

type props = {
  coords: number[] | [];
  addArea?: boolean;
};

export const MarkerCreateMap: FC<props> = ({ coords, addArea }) => {
  return (
    <>
      {(coords.length && !addArea) && (
        <Marker longitude={coords[0]} latitude={coords[1]} anchor="bottom">
          <Pin size={20} />
        </Marker>
      )}
    </>
  );
};
