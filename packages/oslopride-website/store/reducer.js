import { combineReducers } from "redux";
import { aboutReducer } from "./about";

export default combineReducers({
  about: aboutReducer
});
