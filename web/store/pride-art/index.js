import logError from "@/utils/sentry";
import { all, call, put, takeLeading } from "redux-saga/effects";
import { articleActions } from "../articles";
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

export const getPrideArt = () =>
  sanity.fetch(`*[_id=="global-pride-art"]{
  image,
  preamble,
  body,
  articles[]->,
}[0]`);

function* fetchPrideArt() {
  try {
    const response = yield call(getPrideArt);
    yield all(
      response.articles.map(article => put(articleActions.success(article)))
    );
    yield put(prideArtActions.success(response));
  } catch (e) {
    logError(e);
    yield put(prideArtActions.failure());
  }
}

export function* prideArtSaga() {
  yield takeLeading(REQUEST_PRIDE_ART_CONTENT, fetchPrideArt);
}
