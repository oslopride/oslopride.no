import { all, call } from "redux-saga/effects";
import { aboutSaga } from "./about";
import { prideArtSaga } from "./pride-art";
import { prideHouseSaga } from "./pride-house";
import { prideParkSaga } from "./pride-park";

export default function* rootSaga() {
  yield all([
    call(aboutSaga),
    call(prideArtSaga),
    call(prideHouseSaga),
    call(prideParkSaga)
  ]);
}
