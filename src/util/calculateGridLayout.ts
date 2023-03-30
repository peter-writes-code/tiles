import { Grid, Layout, ScreenType, ScreenTypeSizes } from "../config/types";

const blockTargetSizes: ScreenTypeSizes = {
  desktop: 144,
  mobile: 128,
};

const gapSizes: ScreenTypeSizes = {
  desktop: 4,
  mobile: 6,
};

const calculateIdealBlockSize = (
  screenType: ScreenType,
  gap: number,
  containerWidth: number
): {
  block: number;
  offset: number;
} => {
  const targetBlockSize = blockTargetSizes[screenType];
  let idealBlockSize = targetBlockSize;
  let idealOffset = 0;
  const lowestSize = Math.ceil(targetBlockSize * 0.8);
  const largestSize = Math.floor(targetBlockSize * 1.2);
  const fitWidth = containerWidth + gap;
  let lowestOffset = idealBlockSize + gap;
  for (
    let currentSize = lowestSize;
    currentSize <= largestSize;
    currentSize++
  ) {
    const step = currentSize + gap;
    const rowWidth = Math.ceil(fitWidth / step) * step;
    const currentOffset = rowWidth - fitWidth;
    if (currentOffset < lowestOffset) {
      idealOffset = Math.floor(currentOffset / 2);
      lowestOffset = currentOffset;
      idealBlockSize = currentSize;
    }
  }
  return { block: idealBlockSize, offset: idealOffset };
};

const calculateLayout = (
  block: number,
  gap: number,
  gridWidth: number,
  gridHeight: number,
  offset: number,
  containerWidth: number
): Layout => {
  const layout: Layout = [];
  const step = block + gap;
  for (let xPosition = 0; xPosition < gridWidth; xPosition++) {
    let width = block;
    let x = step * xPosition - offset;
    if (x < 0) {
      width = width + x;
      x = 0;
    }
    const rightEdge = x + block;
    const overhang = rightEdge - containerWidth;
    if (overhang > 0) {
      width = block - overhang;
    }
    layout.push({
      x,
      width,
    });
  }
  return layout;
};

const calculateGridLayout = (
  containerWidth: number,
  screenType: ScreenType
): Grid => {
  const gap: number = gapSizes[screenType];
  const { block, offset } = calculateIdealBlockSize(
    screenType,
    gap,
    containerWidth
  );
  const gridWidth = Math.ceil((containerWidth + gap) / (block + gap));
  const gridHeight = 10;
  const layout = calculateLayout(
    block,
    gap,
    gridWidth,
    gridHeight,
    offset,
    containerWidth
  );
  const grid = {
    block,
    gap,
    gridHeight,
    gridWidth,
    offset,
    layout,
  };
  return grid;
};

export default calculateGridLayout;
