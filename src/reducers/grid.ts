import A from "../config/actionTypes";
import { Action } from "../config/types";

export default function grid(state = {}, action: Action) {
  switch (action.type) {
    case A.UPDATE_GRID:
      return action.payload;
    default:
      return state;
  }
}
