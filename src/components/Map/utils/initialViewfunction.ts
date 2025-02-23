import { MapType } from "../../../types/map";

export const initialView = (currentMap: MapType) => {

  const coordinates: string[] = currentMap.center.split(';');
  const latitude: number = parseFloat(coordinates[0]);
  const longitude: number = parseFloat(coordinates[1]);
  const zoom: number = currentMap.zoom;

  return {
    latitude,
    longitude,
    zoom,
    minZoom: 13,
    maxZoom: 18, 
  }
}