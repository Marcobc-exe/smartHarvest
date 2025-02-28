import { CursorType } from "../types/map"

export const handleCursor = (event: CursorType) => {
  if (event.isHovering) return "pointer";
  if (event.isDragging) return "grabbing";
  if (!event.isHovering) return "grab"
  if (!event.isDragging) return "grab"
  return "grab"
}