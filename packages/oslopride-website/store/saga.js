import { all, call } from "redux-saga/effects";
import { aboutSaga } from "./about";

export default function* rootSaga() {
  yield all([call(aboutSaga)]);
}
