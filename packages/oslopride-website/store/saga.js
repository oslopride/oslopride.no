import { all, call } from "redux-saga/effects";
import { aboutSaga } from "./about";
import { prideArtSaga } from "./pride-art";

export default function* rootSaga() {
  yield all([call(aboutSaga), call(prideArtSaga)]);
}
