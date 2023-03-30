import A from "../config/actionTypes";
import { Action } from "../config/types";

export default function screenType(state = '', action :Action) {
  switch (action.type) {
    case A.UPDATE_SCREEN_TYPE:
      return action.payload;
    default:
      return state;
  }
}
