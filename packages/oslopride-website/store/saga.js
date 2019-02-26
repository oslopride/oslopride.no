import { all, call } from "redux-saga/effects";
import { aboutSaga } from "./about";
import { frontPageSaga } from "./front-page";
import { prideArtSaga } from "./pride-art";
import { prideHouseSaga } from "./pride-house";
import { prideParadeSaga } from "./pride-parade";
import { prideParkSaga } from "./pride-park";
import { contactSaga } from "./contact";


export default function* rootSaga() {
  yield all([
    call(aboutSaga),
    call(prideArtSaga),
    call(prideHouseSaga),
    call(prideParkSaga),
    call(prideParadeSaga),
    call(frontPageSaga),
    call(contactSaga)
  ]);
}
