import { all, call } from "redux-saga/effects";
import { aboutSaga } from "./about";
import { articleSaga } from "./articles";
import { becomePartnerSaga } from "./become-partner";
import { contactSaga } from "./contact";
import { frontPageSaga } from "./front-page";
import { partnersSaga } from "./partners";
import { prideArtSaga } from "./pride-art";
import { prideHouseSaga } from "./pride-house";
import { prideParadeSaga } from "./pride-parade";
import { prideParkSaga } from "./pride-park";

export default function* rootSaga() {
  yield all([
    call(aboutSaga),
    call(partnersSaga),
    call(becomePartnerSaga),
    call(prideArtSaga),
    call(prideHouseSaga),
    call(prideParkSaga),
    call(prideParadeSaga),
    call(frontPageSaga),
    call(contactSaga),
    call(articleSaga)
  ]);
}
