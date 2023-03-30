import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Action } from "../config/types";

import reducer from "../reducers/index";

const debug = () => (next: any) => (action: Action) => next(action);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk, debug))
);

export default store;
