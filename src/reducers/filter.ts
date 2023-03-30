import A from "../config/actionTypes";
import { Action, Filter } from "../config/types";

const initialState: Filter = {
  filterOptions: [],
  filterThemes: [],
  initialized: false,
  loading: [],
  selection: [],
  theme: "",
};

export default function filter(state: Filter = initialState, action: Action) {
  let updatedState: Filter = {
    ...{},
    ...state,
  };
  switch (action.type) {
    case A.INITIALIZE_FILTER:
      updatedState.initialized = true;
      break;
    case A.UNINITIALIZE_FILTER:
      updatedState.initialized = false;
      break;
    case A.UPDATE_FILTER_OPTIONS:
      updatedState.filterOptions = action.payload;
      break;
    case A.UPDATE_LOADING:
      updatedState.loading = action.payload;
      break;
    case A.UPDATE_SELECTION:
      updatedState.selection = action.payload;
      break;
    case A.UPDATE_SELECTED_THEME:
      updatedState.theme = action.payload;
      break;
    case A.UPDATE_THEMES:
      updatedState.filterThemes = action.payload;
      break;
    default:
      break;
  }
  return updatedState;
}
