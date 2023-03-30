import A from "../config/actionTypes";
import actions from "./index";
import store from "../store/index";

import allFilterOptions from "../config/filterOptions";
import { AppState, FilterOptions } from "../config/types";

const initialSelectionLength = 3;

const filterActions = {
  chooseFilterTheme: (theme: string) => (dispatch: Function) => {
    dispatch(actions.resetImages());
    const filterOptions :FilterOptions = [...allFilterOptions[theme]];
    const initialSelection :FilterOptions = [...filterOptions];
    while (initialSelection.length > initialSelectionLength) {
      const optionPosition = Math.floor(
        Math.random() * initialSelection.length
      );
      initialSelection.splice(optionPosition, 1);
    }
    dispatch({
      type: A.UPDATE_SELECTION,
      payload: initialSelection,
    });
    dispatch({
      type: A.UPDATE_FILTER_OPTIONS,
      payload: filterOptions,
    });
    dispatch({
      type: A.UPDATE_SELECTED_THEME,
      payload: theme,
    });
    initialSelection.map((searchTerm) => {
      return dispatch(actions.requestImages(searchTerm));
    });
  },
  initializeFilter: () => (dispatch: Function) => {
    const filterThemes = Object.keys(allFilterOptions);
    dispatch({
      type: A.INITIALIZE_FILTER,
    });
    dispatch({
      type: A.UPDATE_THEMES,
      payload: filterThemes,
    });

    const randomPick = Math.floor(Math.random() * filterThemes.length);
    dispatch(actions.chooseFilterTheme(filterThemes[randomPick]));
  },
  uninitializeFilter: () => (dispatch: Function) => {
    dispatch(actions.resetImages());
    dispatch(actions.renderResultStream());
    dispatch({
      type: A.UNINITIALIZE_FILTER,
    });
  },
  unselectOption: (searchTerm: string) => (dispatch: Function) => {
    const appState: AppState = store.getState() as AppState;
    const selection = appState.filter.selection;
    const selectionPosition = selection.indexOf(searchTerm);
    if (selectionPosition >= 0) {
      selection.splice(selectionPosition, 1);
      dispatch({
        type: A.UPDATE_SELECTION,
        payload: selection,
      });
      dispatch(actions.removeImages(searchTerm));
    }
  },
  selectOption: (searchTerm: string) => (dispatch: Function) => {
    const appState: AppState = store.getState() as AppState;
    const selection = appState.filter.selection;
    if (selection.indexOf(searchTerm) < 0) {
      selection.push(searchTerm);
      dispatch({
        type: A.UPDATE_SELECTION,
        payload: selection,
      });
      dispatch(actions.requestImages(searchTerm));
    }
  },
};

export default filterActions;
