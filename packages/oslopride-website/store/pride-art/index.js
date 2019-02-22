import { call, put, takeLeading } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_PRIDE_ART_CONTENT = "REQUEST_PRIDE_ART_CONTENT";
const SUCCESS_PRIDE_ART_CONTENT = "SUCCESS_PRIDE_ART_CONTENT";
const FAILURE_PRIDE_ART_CONTENT = "FAILURE_PRIDE_ART_CONTENT";

export const prideArtActions = {
  request: () => createAction(REQUEST_PRIDE_ART_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_PRIDE_ART_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_PRIDE_ART_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const prideArtReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRIDE_ART_CONTENT:
    case FAILURE_PRIDE_ART_CONTENT:
    case SUCCESS_PRIDE_ART_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getPrideArt = () => sanity.getDocument("global-pride-art");

function* fetchPrideArt() {
  try {
    const response = yield call(getPrideArt);
    yield put(prideArtActions.success(response));
  } catch (e) {
    yield put(prideArtActions.failure(`${e}`));
  }
}

export function* prideArtSaga() {
  yield takeLeading(REQUEST_PRIDE_ART_CONTENT, fetchPrideArt);
}
