import { map } from '../../../data/map/map' 

export const initialView = () => {
  const coordinates: string[] = map.center.split(';');
  const latitude: number = parseFloat(coordinates[0]);
  const longitude: number = parseFloat(coordinates[1]);
  const zoom: number = map.zoom;

  return {
    latitude,
    longitude,
    zoom,
    minZoom: 13,
    maxZoom: 18, 
  }
}