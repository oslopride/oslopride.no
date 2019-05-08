import { combineReducers } from "redux";
import { aboutReducer } from "./about";
import { articleReducer } from "./articles";
import { becomePartnerReducer } from "./become-partner";
import { contactReducer } from "./contact";
import { eventsReducer } from "./events";
import { frontPageReducer } from "./front-page";
import { interPrideReducer } from "./interpride";
import { pageReducer } from "./pages";
import { partnersReducer } from "./partners";
import { pressReducer } from "./press";
import { pressReleasesReducer } from "./press-releases";
import { prideArtReducer } from "./pride-art";
import { prideHouseReducer } from "./pride-house";
import { prideParadeReducer } from "./pride-parade";
import { prideParkReducer } from "./pride-park";
import { configReducer } from "./config";

export default combineReducers({
  about: aboutReducer,
  partners: partnersReducer,
  becomePartner: becomePartnerReducer,
  prideArt: prideArtReducer,
  prideHouse: prideHouseReducer,
  pridePark: prideParkReducer,
  prideParade: prideParadeReducer,
  frontPage: frontPageReducer,
  contact: contactReducer,
  articles: articleReducer,
  interPride: interPrideReducer,
  pressReleases: pressReleasesReducer,
  press: pressReducer,
  events: eventsReducer,
  pages: pageReducer,
  config: configReducer
});
