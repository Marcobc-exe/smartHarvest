export type InputArea = {
  name: string;
  tagName: string;
  cropName: string;
}

type Properties = {
  id: number;
  farmId: number;
  name: string;
  tagName: string;
  cropId: number;
  status: number;
}

type Geometry = {
  type: "Polygon",
  coordinates: [number[][]]
}

type Features = {
  type: string;
  properties: Properties,
  geometry: Geometry
}

export type Area = {
  type: string;
  features: [Features];
}