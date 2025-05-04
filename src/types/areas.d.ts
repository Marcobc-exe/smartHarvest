export type InputArea = {
  name: string;
  tagName: string;
  crop: {
    id: number;
    name: string;
  };
};

type Properties = {
  id: number;
  farmId: number;
  name: string;
  tagName: string;
  cropId: number;
  cropName: string;
  status: number;
};

type Geometry = {
  type: "Polygon";
  coordinates: [number[][]];
};

type Features = {
  type: string;
  properties: Properties;
  geometry: Geometry;
};

export type Area = {
  type: string;
  features: [Features];
};
