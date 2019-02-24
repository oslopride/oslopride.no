import { call, put, takeLeading } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_PRIDE_PARADE_CONTENT = "REQUEST_PRIDE_PARADE_CONTENT";
const SUCCESS_PRIDE_PARADE_CONTENT = "SUCCESS_PRIDE_PARADE_CONTENT";
const FAILURE_PRIDE_PARADE_CONTENT = "FAILURE_PRIDE_PARADE_CONTENT";

export const prideParadeActions = {
  request: () =>
    createAction(REQUEST_PRIDE_PARADE_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_PRIDE_PARADE_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_PRIDE_PARADE_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const prideParadeReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRIDE_PARADE_CONTENT:
    case FAILURE_PRIDE_PARADE_CONTENT:
    case SUCCESS_PRIDE_PARADE_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getPrideParade = () => sanity.getDocument("global-pride-parade");

function* fetchPrideParade() {
  try {
    const response = yield call(getPrideParade);
    yield put(prideParadeActions.success(response));
  } catch (e) {
    yield put(prideParadeActions.failure(`${e}`));
  }
}

export function* prideParadeSaga() {
  yield takeLeading(REQUEST_PRIDE_PARADE_CONTENT, fetchPrideParade);
}
