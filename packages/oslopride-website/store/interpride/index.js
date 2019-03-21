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

const REQUEST_INTERPRIDE_CONTENT = "REQUEST_INTERPRIDE_CONTENT";
const SUCCESS_INTERPRIDE_CONTENT = "SUCCESS_INTERPRIDE_CONTENT";
const FAILURE_INTERPRIDE_CONTENT = "FAILURE_INTERPRIDE_CONTENT";

export const interPrideActions = {
  request: () => createAction(REQUEST_INTERPRIDE_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_INTERPRIDE_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_INTERPRIDE_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const interPrideReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_INTERPRIDE_CONTENT:
    case FAILURE_INTERPRIDE_CONTENT:
    case SUCCESS_INTERPRIDE_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getInterPride = () =>
  sanity.fetch(`*[_id=="global-interpride"]{
  image,
  preamble,
  body,
  articles[]->
}[0]`);

function* fetchInterPride() {
  try {
    const response = yield call(getInterPride);
    yield all(
      response.articles.map(article => put(articleActions.success(article)))
    );
    yield put(interPrideActions.success(response));
  } catch (e) {
    yield put(interPrideActions.failure(`${e}`));
  }
}

export function* interPrideSaga() {
  yield takeLeading(REQUEST_INTERPRIDE_CONTENT, fetchInterPride);
}
