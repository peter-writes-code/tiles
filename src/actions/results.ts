import A from "../config/actionTypes";
import actions from "./index";
import renderResults from "../util/renderResults";
import renderResultStream from "../util/renderResultStream";
import store from "../store/index";
import { AppState, ImageStream } from "../config/types";

const resultsActions = {
  renderResultStream: () => (dispatch: Function) => {
    const appState: AppState = store.getState() as AppState;
    const images = appState.images || {};
    const resultStream = renderResultStream(images);
    dispatch({
      type: A.UPDATE_RESULT_STREAM,
      payload: resultStream,
    });
    dispatch(actions.renderResults(resultStream));
  },
  renderResults: (resultStream: ImageStream) => (dispatch: Function) => {
    const appState: AppState = store.getState() as AppState;
    const grid = appState.grid;
    const { renderedResults, renderedFillers } = renderResults(
      resultStream,
      grid
    );
    dispatch({
      type: A.UPDATE_RESULTS,
      payload: {
        renderedResults: [],
        renderedFillers: [],
      },
    });
    setTimeout(() => {
      dispatch({
        type: A.UPDATE_RESULTS,
        payload: {
          renderedResults,
          renderedFillers,
        },
      });
    }, 32);
  },
  rerenderResults: () => (dispatch: Function) => {
    dispatch({
      type: A.UPDATE_RESULTS,
      payload: {
        renderedResults: [],
        renderedFillers: [],
      },
    });
    setTimeout(() => {
      const appState: AppState = store.getState() as AppState;
      const { resultStream } = appState.results;
      resultStream && dispatch(actions.renderResults(resultStream));
    }, 32);
  },
};

export default resultsActions;
