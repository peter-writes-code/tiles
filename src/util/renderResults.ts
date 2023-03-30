import {
  AvailablePosition,
  FillGrid,
  FillGridRow,
  Grid,
  ImageResult,
  ImageResultRendered,
  ImageStream,
  ImageStreamRendered,
  Layout,
} from "../config/types";

const addFillGridRow = (fillGrid: FillGrid, gridWidth: number): FillGrid => {
  fillGrid.push(new Array(gridWidth).fill(0));
  return fillGrid;
};

const calculateRenderHeight = (
  renderWidth: number,
  imageToRender: ImageResult
): number => {
  return Math.round((imageToRender.height / imageToRender.width) * renderWidth);
};

const calculateRenderWidth = (
  availableWidth: number,
  minWidth: number,
  maxWidth: number
): number => {
  let renderWidth =
    minWidth + Math.round(Math.random() * (maxWidth - minWidth));
  renderWidth = Math.min(renderWidth, availableWidth);
  return renderWidth;
};

const findAvailableInThisRow = (
  availablePosition: AvailablePosition,
  gridWidth: number
): AvailablePosition => {
  if (!availablePosition.fillGrid[availablePosition.fillY]) {
    availablePosition.fillGrid = addFillGridRow(
      availablePosition.fillGrid,
      gridWidth
    );
  }
  const isReverse: boolean = isReverseRow(availablePosition.fillY);
  const availableX: number = isReverse
    ? availablePosition.fillGrid[availablePosition.fillY].lastIndexOf(0)
    : availablePosition.fillGrid[availablePosition.fillY].indexOf(0);
  if (availableX < 0) {
    availablePosition.fillY++;
  } else {
    availablePosition.availableX = availableX;
    availablePosition.availableY = availablePosition.fillY;
  }
  return availablePosition;
};

const findAvailableWidth = (
  fillGridRow: FillGridRow,
  availableX: number,
  fillY: number
): number => {
  let availableWidth = 1;
  const isReverse: boolean = isReverseRow(fillY);

  if (isReverse) {
    availableX--;
  } else {
    availableX++;
  }
  while (availableX < fillGridRow.length && availableX >= 0) {
    if (!fillGridRow[availableX]) {
      availableWidth++;
      if (isReverse) {
        availableX--;
      } else {
        availableX++;
      }
    } else {
      break;
    }
  }
  return availableWidth;
};

const findAvailablePosition = (
  fillGrid: FillGrid,
  fillY: number,
  gridWidth: number
): AvailablePosition => {
  let availablePosition: AvailablePosition = {
    fillGrid,
    fillY,
  };
  while (availablePosition.availableX === undefined) {
    availablePosition = findAvailableInThisRow(availablePosition, gridWidth);
  }
  return availablePosition;
};

const isReverseRow = (fillY: number): boolean => {
  return fillY / 2 !== Math.round(fillY / 2);
};

const calculateFillerHeight = (
  renderWidth: number,
  fillGridHeight: number,
  fillY: number
): number => {
  return Math.min(
    Math.ceil(Math.random() * (renderWidth * 2)),
    fillGridHeight - fillY
  );
};

const renderFillers = (
  fillGrid: FillGrid,
  fillY: number,
  gridWidth: number,
  minWidth: number,
  maxWidth: number,
  grid: Grid,
  resultStream: ImageStream
): ImageStreamRendered => {
  const fillGridHeight = fillGrid.length;
  const renderedFillers: ImageStreamRendered = [];
  let fillerCount = 0;

  while (
    fillY < fillGridHeight &&
    fillGrid[fillGrid.length - 1].indexOf(0) >= 0
  ) {
    const availablePosition = findAvailablePosition(fillGrid, fillY, gridWidth);
    const availableX = availablePosition.availableX || 0;
    const availableY = availablePosition.availableY || 0;
    fillGrid = availablePosition.fillGrid;
    fillY = availablePosition.fillY;
    const availableWidth = findAvailableWidth(
      fillGrid[fillY],
      availableX,
      fillY
    );

    const renderWidth = calculateRenderWidth(
      availableWidth,
      minWidth,
      maxWidth
    );
    const renderHeight = calculateFillerHeight(
      renderWidth,
      fillGridHeight,
      fillY
    );
    fillGrid = reserveSpace(
      availableX,
      availableY,
      renderWidth,
      renderHeight,
      fillGrid,
      gridWidth
    );

    const filler = renderFiller(
      availableX,
      availableY,
      renderWidth,
      renderHeight,
      resultStream[fillerCount],
      grid.layout,
      grid.block,
      grid.gap
    );
    renderedFillers.push(filler);
    fillerCount++;
  }
  return renderedFillers;
};

const renderFiller = (
  availableX: number,
  availableY: number,
  renderWidth: number,
  renderHeight: number,
  imageToRender: ImageResult,
  layout: Layout,
  block: number,
  gap: number
): ImageResultRendered => {
  const isReverse = isReverseRow(availableY);
  let x: number = isReverse
    ? layout[availableX - (renderWidth - 1)].x
    : layout[availableX].x;
  let y: number = availableY * (block + gap);
  const lastBlock: number = isReverse
    ? availableX
    : availableX + renderWidth - 1;
  let width: number = layout[lastBlock].x + layout[lastBlock].width - x;
  let height: number = renderHeight * (block + gap) - gap;
  const maxDimension: number = Math.max(width, height);
  let src = imageToRender.src.large2x;
  if (maxDimension < 720) {
    if (maxDimension > 360) {
      src = imageToRender.src.large;
    } else {
      src = imageToRender.src.medium;
    }
  }
  let fillerRendered: ImageResultRendered = {
    x,
    y,
    width,
    height,
    src,
    imageResult: imageToRender,
  };

  return fillerRendered;
};

const renderResult = (
  availableX: number,
  availableY: number,
  renderWidth: number,
  renderHeight: number,
  imageToRender: ImageResult,
  layout: Layout,
  block: number,
  gap: number
): ImageResultRendered => {
  const isReverse = isReverseRow(availableY);
  let x: number = isReverse
    ? layout[availableX - (renderWidth - 1)].x
    : layout[availableX].x;
  let y: number = availableY * (block + gap);
  const lastBlock = isReverse ? availableX : availableX + renderWidth - 1;
  let width: number = layout[lastBlock].x + layout[lastBlock].width - x;
  let height: number = renderHeight * (block + gap) - gap;
  const maxDimension: number = Math.max(width, height);
  let src = imageToRender.src.large2x;
  if (maxDimension < 720) {
    if (maxDimension > 360) {
      src = imageToRender.src.large;
    } else {
      src = imageToRender.src.medium;
    }
  }
  let resultRendered: ImageResultRendered = {
    x,
    y,
    width,
    height,
    src,
    imageResult: imageToRender,
  };

  return resultRendered;
};

const reserveSpace = (
  availableX: number,
  availableY: number,
  renderWidth: number,
  renderHeight: number,
  fillGrid: FillGrid,
  gridWidth: number
): FillGrid => {
  const isReverse = isReverseRow(availableY);
  let fillGridUpdated = [...fillGrid];
  for (let y = availableY; y < availableY + renderHeight; y++) {
    if (!fillGridUpdated[y]) {
      fillGridUpdated = addFillGridRow(fillGrid, gridWidth);
    }
    if (isReverse) {
      for (let x = availableX; x > availableX - renderWidth; x--) {
        fillGridUpdated[y][x] = 1;
      }
    } else {
      for (let x = availableX; x < availableX + renderWidth; x++) {
        fillGridUpdated[y][x] = 1;
      }
    }
  }
  return fillGridUpdated;
};

const renderResults = (
  resultStream: ImageStream,
  grid: Grid
): {
  renderedResults: ImageStreamRendered;
  renderedFillers: ImageStreamRendered;
} => {
  const { gridWidth } = grid;
  const streamToRender: ImageStream = [...resultStream];
  const renderedResults: ImageStreamRendered = [];
  let fillGrid: FillGrid = [];
  let fillY = 0;
  const minWidth = Math.max(Math.ceil(gridWidth * 0.2), 2);
  const maxWidth = Math.floor(gridWidth * 0.6);
  let availablePosition;
  while (streamToRender.length) {
    const imageToRender: ImageResult = streamToRender[0];
    streamToRender.shift();
    availablePosition = findAvailablePosition(fillGrid, fillY, gridWidth);
    const availableX = availablePosition.availableX || 0;
    const availableY = availablePosition.availableY || 0;
    fillGrid = availablePosition.fillGrid;
    fillY = availablePosition.fillY;
    const availableWidth = findAvailableWidth(
      fillGrid[fillY],
      availableX,
      fillY
    );

    const renderWidth = calculateRenderWidth(
      availableWidth,
      minWidth,
      maxWidth
    );
    const renderHeight = calculateRenderHeight(renderWidth, imageToRender);
    fillGrid = reserveSpace(
      availableX,
      availableY,
      renderWidth,
      renderHeight,
      fillGrid,
      gridWidth
    );

    const result = renderResult(
      availableX,
      availableY,
      renderWidth,
      renderHeight,
      imageToRender,
      grid.layout,
      grid.block,
      grid.gap
    );
    renderedResults.push(result);
  }

  const renderedFillers = renderFillers(
    fillGrid,
    fillY,
    gridWidth,
    minWidth,
    maxWidth,
    grid,
    resultStream
  );

  return { renderedResults, renderedFillers };
};

export default renderResults;
