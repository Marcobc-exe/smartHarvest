import { MapType } from "../types/map";

export const initialView = (currentMap: MapType) => {
  const coordinates: string[] = currentMap.center.split(';');
  const latitude: number = parseFloat(coordinates[0]);
  const longitude: number = parseFloat(coordinates[1]);
  const zoom: number = currentMap.zoom;
  const minZoom: number = currentMap.minZoom;
  const maxZoom: number = currentMap.maxZoom;

  return {
    latitude,
    longitude,
    zoom,
    minZoom,
    maxZoom, 
  }
}