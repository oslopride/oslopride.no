import { combineReducers } from "redux";
import { aboutReducer } from "./about";
import { prideArtReducer } from "./pride-art";

export default combineReducers({
  about: aboutReducer,
  prideArt: prideArtReducer
});
