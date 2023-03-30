import A from "../config/actionTypes";
import actions from "./index";
import calculateGridLayout from "../util/calculateGridLayout";
import { ScreenType, WindowGlobals } from "../config/types";

const gridActions = {
  calculateGrid: (screenType: ScreenType) => (dispatch :Function) => {
    const containerWidth = (window as any).containerRef.current.offsetWidth;
    const grid = calculateGridLayout(containerWidth, screenType);
    dispatch({
      type: A.UPDATE_GRID,
      payload: grid,
    });
    dispatch(actions.rerenderResults());
  },
};

export default gridActions;
