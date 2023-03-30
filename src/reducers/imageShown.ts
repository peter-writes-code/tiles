import A from "../config/actionTypes";
import { Action } from "../config/types";

export default function imageShown(state = {}, action :Action) {
  let updatedState = {
    ...{},
    ...state,
  };
  switch (action.type) {
    case A.HIDE_IMAGE:
      updatedState = {};
      break;
    case A.SHOW_IMAGE:
      updatedState = action.payload;
      break;
    default:
      break;
  }
  return updatedState;
}
