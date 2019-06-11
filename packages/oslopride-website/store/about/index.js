import logError from "@/utils/sentry";
import { call, put, takeLeading } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_ABOUT_CONTENT = "REQUEST_ABOUT_CONTENT";
const SUCCESS_ABOUT_CONTENT = "SUCCESS_ABOUT_CONTENT";
const FAILURE_ABOUT_CONTENT = "FAILURE_ABOUT_CONTENT";

export const aboutActions = {
  request: () => createAction(REQUEST_ABOUT_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_ABOUT_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_ABOUT_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const aboutReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ABOUT_CONTENT:
    case FAILURE_ABOUT_CONTENT:
    case SUCCESS_ABOUT_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getAbout = () => sanity.getDocument("global-about");

function* fetchAbout() {
  try {
    const response = yield call(getAbout);
    yield put(aboutActions.success(response));
  } catch (e) {
    logError(e);
    yield put(aboutActions.failure());
  }
}

export function* aboutSaga() {
  yield takeLeading(REQUEST_ABOUT_CONTENT, fetchAbout);
}
