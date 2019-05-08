import { all, call } from "redux-saga/effects";
import { aboutSaga } from "./about";
import { articleSaga } from "./articles";
import { becomePartnerSaga } from "./become-partner";
import { contactSaga } from "./contact";
import { eventsSaga } from "./events";
import { frontPageSaga } from "./front-page";
import { interPrideSaga } from "./interpride";
import { pageSaga } from "./pages";
import { partnersSaga } from "./partners";
import { pressSaga } from "./press";
import { pressReleasesSaga } from "./press-releases";
import { prideArtSaga } from "./pride-art";
import { prideHouseSaga } from "./pride-house";
import { prideParadeSaga } from "./pride-parade";
import { prideParkSaga } from "./pride-park";
import { configSaga } from "./config";

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
    call(articleSaga),
    call(interPrideSaga),
    call(pressReleasesSaga),
    call(pressSaga),
    call(eventsSaga),
    call(pageSaga),
    call(configSaga)
  ]);
}
