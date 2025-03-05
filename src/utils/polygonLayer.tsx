import { Area } from "../types/areas";
import { AreasLayer } from "./components/Areas/Areas";

export const handlePolygonLayer = (
  listAreas: Area[] | [],
  area: number[][]
) => {
  if (!listAreas.length && !area.length) return;

  const coordinates = listAreas.map(
    (area) => area.features[0].geometry.coordinates[0]
  );

  const currentAreas = coordinates.map((area, index) =>
    AreasLayer({
      id: index.toString(),
      data: [{ coordinates: area }],
    })
  );

  const newArea = AreasLayer({
    id: (listAreas.length + 1).toString(),
    data: [{ coordinates: area }],
    lineWidthMinPixels: 2,
    getLineWidth: () => 2,
  });

  return [currentAreas, newArea];
};
