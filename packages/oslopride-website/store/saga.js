import { all, call } from "redux-saga/effects";
import { aboutSaga } from "./about";
import { prideArtSaga } from "./pride-art";
import { prideHouseSaga } from "./pride-house";

export default function* rootSaga() {
  yield all([call(aboutSaga), call(prideArtSaga), call(prideHouseSaga)]);
}
