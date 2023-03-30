import A from "../config/actionTypes";
import { ImageResult } from "../config/types";

const imageShownActions = {
  hideImage: () => (dispatch: Function) => {
    dispatch({
      type: A.HIDE_IMAGE,
    });
  },
  showImage: (imageToShow: ImageResult) => (dispatch: Function) => {
    dispatch({
      type: A.SHOW_IMAGE,
      payload: imageToShow,
    });
  },
};

export default imageShownActions;
