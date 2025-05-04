import { PolygonLayer } from "@deck.gl/layers";
import { Features } from "../../../types/areas";

type PolygonLayerProps = {
  id: number;
  data: Features;
  lineWidthMinPixels?: number;
  getLineWidth?: () => number;
};

/**
 * This function returns a new instance of `PolygonLayer`.
 * It does not render JSX, but can be used inside a `DeckGL` component.
 */
export const AreasLayer = ({
  id,
  data,
  lineWidthMinPixels = 1,
  getLineWidth = () => 1,
}: PolygonLayerProps) => {
  return new PolygonLayer({
    id: id.toString(),
    data: [data],
    pickable: true,
    stroked: true,
    filled: true,
    extruded: false,
    lineWidthMinPixels,
    autoHighlight: true,
    getPolygon: (d) => d.geometry.coordinates,
    getFillColor: () => [0, 128, 255, 120],
    getLineColor: () => [255, 255, 255],
    getLineWidth,
    highlightColor: () => [255, 212, 57, 100],
  });
};

type NewAreaProps = {
  id: number;
  data: [{ coordinates: number[][] }];
};

export const NewArea = ({ id, data }: NewAreaProps) => {
  return new PolygonLayer({
    id: id.toString(),
    data,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: false,
    lineWidthMinPixels: 4,
    autoHighlight: true,
    getPolygon: (d) => d.coordinates,
    getFillColor: () => [0, 128, 255, 120],
    getLineColor: () => [255, 255, 255],
    getLineWidth: () => 4,
    highlightColor: () => [255, 212, 57, 100],
  });
};
