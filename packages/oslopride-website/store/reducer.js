import { combineReducers } from "redux";
import { aboutReducer } from "./about";
import { prideArtReducer } from "./pride-art";
import { prideHouseReducer } from "./pride-house";
import { prideParkReducer } from "./pride-park";

export default combineReducers({
  about: aboutReducer,
  prideArt: prideArtReducer,
  prideHouse: prideHouseReducer,
  pridePark: prideParkReducer
});
