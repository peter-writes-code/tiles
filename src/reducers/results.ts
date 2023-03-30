import A from "../config/actionTypes";
import { Action, Results } from "../config/types";

const initialState: Results = {
  renderedResults: [],
  renderedFillers: [],
  resultStream: [],
};

export default function results(state: Results = initialState, action: Action) {
  let updatedState: Results = {
    ...{},
    ...state,
  };
  switch (action.type) {
    case A.UPDATE_RESULTS:
      updatedState.renderedResults = action.payload.renderedResults;
      updatedState.renderedFillers = action.payload.renderedFillers;
      break;
    case A.UPDATE_RESULT_STREAM:
      updatedState.resultStream = action.payload;
      break;
    default:
      break;
  }
  return updatedState;
}
