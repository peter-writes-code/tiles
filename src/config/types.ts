
type Action = { type: string; payload: any };
type ActionTypes = { [action: string]: string };
type AllFilterOptions = { [theme: string]: Array<string> };
type AppState = {
  filter: Filter;
  grid: Grid;
  images: Images;
  imageShown: ImageResult;
  results: Results;
  screenType: ScreenType;
};
type AvailablePosition = {
  availableX?: number;
  availableY?: number;
  fillY: number;
  fillGrid: FillGrid;
};
type DisplayDimensions = { width: number; height: number };
type FillGrid = Array<FillGridRow>;
type FillGridRow = Array<number>;
type Filter = {
  filterOptions: Array<string>;
  filterThemes: Array<string>;
  initialized: boolean;
  loading: Array<string>;
  selection: Array<string>;
  theme: string;
};
type FilterOptions = Array<string>;
type FilterState = { initialized?: boolean };
type Grid = {
  block: number;
  gap: number;
  gridHeight: number;
  gridWidth: number;
  offset: number;
  layout: Layout;
};
type ImageResult = {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer_id: number;
  photographer_url: string;
  photographer: string;
  avg_color: string;
  liked: boolean;
  alt: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    tiny: string;
    portrait: string;
    landscape: string;
  };
};
type ImageResultRendered = {
  x: number;
  y: number;
  width: number;
  height: number;
  src: string;
  imageResult: ImageResult;
};
type Images = { [theme: string]: Array<ImageResult> };
type ImageStream = Array<ImageResult>;
type ImageStreamRendered = Array<ImageResultRendered>;
type Layout = Array<LayoutVBlock>;
type LayoutVBlock = {
  x: number;
  width: number;
};
type Results = {
  renderedResults: ImageStreamRendered;
  renderedFillers: ImageStreamRendered;
  resultStream: ImageStream;
};
type ScreenType = "desktop" | "mobile";
type ScreenTypeSizes = {
  [screenType in ScreenType]: number;
};
type WindowGlobals = {
  containerRef: Object;
};

export {
  Action,
  ActionTypes,
  AllFilterOptions,
  AppState,
  AvailablePosition,
  DisplayDimensions,
  FillGrid,
  FillGridRow,
  Filter,
  FilterOptions,
  FilterState,
  Grid,
  ImageResult,
  ImageResultRendered,
  Images,
  ImageStream,
  ImageStreamRendered,
  Layout,
  LayoutVBlock,
  Results,
  ScreenType,
  ScreenTypeSizes,
  WindowGlobals,
};
