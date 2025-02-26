export type MapType = {
  id: string;
  name: string;
  center: string;
  zoom: number;
  minZoom: number;
  maxZoom: number;
}

export type Coords = [number, number];

export type dataNewMap = {
  coords: Coords;
  zoom: number;
}

export type StyleMap = {
  height: string,
  width: string;
  position: string
  transform: string;
  alignSelf: string
}