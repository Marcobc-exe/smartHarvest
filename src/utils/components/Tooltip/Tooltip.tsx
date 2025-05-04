import { Properties } from "../../../types/areas";

type props = {
  properties: Properties;
};

export const Tooltip = (object: props) => {
  return (
    object &&
    object.properties && {
      html: `
    <span>${object.properties.name}</span> | <span>${object.properties.tagName}</span>
    <br/>
    <span>Crop: ${object.properties.cropName}</span>
  `,
    }
  );
};
