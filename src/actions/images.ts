import A from "../config/actionTypes";
import actions from "./index";
import axios from "axios";

import { AppState, Images } from "../config/types";
import store from "../store/index";

const NUMBER_OF_IMAGES = 24;
const PEXELS_API_BASE_URL = "https://api.pexels.com/v1//search";

const imagesActions = {
  removeImages: (searchTerm: string) => (dispatch: Function) => {
    const appState: AppState = store.getState() as AppState;
    const images = appState.images;
    images[searchTerm] && delete images[searchTerm];
    dispatch({
      type: A.UPDATE_IMAGES,
      payload: images,
    });
    dispatch(actions.renderResultStream());
  },
  requestImages: (searchTerm: string) => (dispatch: Function) => {
    const appState: AppState = store.getState() as AppState;
    let loading = appState.filter.loading;
    if (loading.indexOf(searchTerm) < 0) {
      loading.push(searchTerm);
    }
    dispatch({
      type: A.UPDATE_LOADING,
      payload: loading,
    });

    axios
      .get(PEXELS_API_BASE_URL, {
        headers: { Authorization: process.env.REACT_APP_PEXELS_API_KEY },
        params: { query: searchTerm, per_page: NUMBER_OF_IMAGES },
      })
      .then(function (response) {
        const { photos } = response.data;
        const images: Images = {
          [searchTerm]: photos,
        };
        dispatch({
          type: A.UPDATE_IMAGES,
          payload: images,
        });

        const appState: AppState = store.getState() as AppState;
        loading = appState.filter.loading;
        const loadingPosition = loading.indexOf(searchTerm);
        if (loadingPosition >= 0) {
          loading.splice(loadingPosition, 1);
        }
        dispatch({
          type: A.UPDATE_LOADING,
          payload: loading,
        });

        if (!loading.length) {
          dispatch(actions.renderResultStream());
        }
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  },
  resetImages: () => (dispatch: Function) => {
    dispatch({
      type: A.RESET_IMAGES,
    });
  },
};

export default imagesActions;
