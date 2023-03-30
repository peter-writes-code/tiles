import A from "../config/actionTypes";
import actions from "./index";

const screenTypeActions = {
  updateScreenType: () => (dispatch: Function) => {
    if (
      window.screen.availWidth !== (window as any).previousAvailWidth ||
      window.innerWidth !== (window as any).previousInnerWidth
    ) {
      (window as any).previousAvailWidth = window.screen.availWidth;
      (window as any).previousInnerWidth = window.innerWidth;

      const screenType =
        window.screen.availWidth <= 800 || window.innerWidth <= 800
          ? "mobile"
          : "desktop";
      dispatch({
        type: A.UPDATE_SCREEN_TYPE,
        payload: screenType,
      });
      dispatch(actions.calculateGrid(screenType));
    }
  },
};

export default screenTypeActions;
