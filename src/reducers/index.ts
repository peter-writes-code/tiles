import filter from "./filter";
import grid from "./grid";
import images from "./images";
import imageShown from "./imageShown";
import results from "./results";
import screenType from "./screenType";
import { combineReducers } from "redux";

const reducer = combineReducers({
  filter,
  grid,
  images,
  imageShown,
  results,
  screenType,
});

export default reducer;
