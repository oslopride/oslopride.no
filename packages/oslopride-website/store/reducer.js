import { combineReducers } from "redux";
import { aboutReducer } from "./about";
import { articleReducer } from "./articles";
import { contactReducer } from "./contact";
import { frontPageReducer } from "./front-page";
import { prideArtReducer } from "./pride-art";
import { prideHouseReducer } from "./pride-house";
import { prideParadeReducer } from "./pride-parade";
import { prideParkReducer } from "./pride-park";

export default combineReducers({
  about: aboutReducer,
  prideArt: prideArtReducer,
  prideHouse: prideHouseReducer,
  pridePark: prideParkReducer,
  prideParade: prideParadeReducer,
  frontPage: frontPageReducer,
  contact: contactReducer,
  articles: articleReducer
});
