import { Area, Features } from "../types/areas";
import { AreasLayer, NewArea } from "./components/Areas/Areas";

export const handlePolygonLayer = (
  listAreas: Area[] | [],
  area: number[][]
) => {
  if (!listAreas.length && !area.length) return;

  const areas = listAreas.map((area) => area.features[0]);

  const currentAreas = areas.map((data: Features, id) =>
    AreasLayer({ id, data })
  );

  const newArea =
    area.length > 2
      ? NewArea({
          id: listAreas.length + 1,
          data: [{ coordinates: area }],
        })
      : [];

  return [currentAreas, newArea];
};
