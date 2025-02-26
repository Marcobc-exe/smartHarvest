import { Marker } from "react-map-gl/mapbox";
import Pin from "../../Pin/Pin";
import { FC } from "react";

type props = {
  coords: number[] | [];
};

export const MarkerCreateMap: FC<props> = ({ coords }) => {
  return (
    <>
      {coords.length && (
        <Marker longitude={coords[0]} latitude={coords[1]} anchor="bottom">
          <Pin size={20} />
        </Marker>
      )}
    </>
  );
};
