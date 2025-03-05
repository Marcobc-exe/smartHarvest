import { PolygonLayer } from "@deck.gl/layers";

type PolygonLayerProps = {
  id: string;
  data: { coordinates: number[][] }[];
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
    id,
    data,
    pickable: true,
    stroked: true,
    filled: true,
    extruded: false,
    lineWidthMinPixels,
    getPolygon: (d) => d.coordinates,
    getFillColor: () => [0, 128, 255, 120], // Function form for Deck.gl compatibility
    getLineColor: () => [255, 255, 255], // Function form
    getLineWidth,
  });
};
