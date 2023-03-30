import { DisplayDimensions } from "../config/types";

const calculateDisplayDimensions = (
  originalWidth: number,
  originalHeight: number,
  displayWidth: number,
  displayHeight: number
): DisplayDimensions => {
  let width: number = Math.round(
    (originalWidth / originalHeight) * displayHeight
  );
  let height: number = displayHeight;
  if (width > displayWidth) {
    width = displayWidth;
    height = Math.round((originalHeight / originalWidth) * displayWidth);
  }
  const displayDimensions: DisplayDimensions = {
    width,
    height,
  };

  return displayDimensions;
};

export default calculateDisplayDimensions;
