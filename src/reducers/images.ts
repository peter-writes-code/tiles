import A from "../config/actionTypes";
import { Action } from "../config/types";

export default function images(state = {}, action: Action) {
  let updatedState = {
    ...{},
    ...state,
  };
  switch (action.type) {
    case A.RESET_IMAGES:
      updatedState = {};
      break;
    case A.UPDATE_IMAGES:
      updatedState = {
        ...updatedState,
        ...action.payload,
      };
      break;
    default:
      break;
  }
  return updatedState;
}
