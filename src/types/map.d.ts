export type MapType = {
  id: string;
  name: string;
  center: string;
  zoom: number;
  minZoom: number;
  maxZoom: number;
}

export type dataNewMap = {
  coords: number[];
  zoom: number;
}

export type StyleMap = {
  height: string,
  width: string;
  position: string
  transform: string;
  alignSelf: string
}

export type InputMap = {
  name: string;
};

export type CursorType = {
  isHovering: boolean;
  isDragging: boolean;
}