import { call, put, takeLeading } from "redux-saga/effects";
import api from "../api";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";

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

function* fetchAbout() {
  try {
    const getAbout = () => api.getDocument("global-about");
    const response = yield call(getAbout);
    yield put(aboutActions.success(response));
  } catch (e) {
    yield put(aboutActions.failure(`${e}`));
  }
}

export function* aboutSaga() {
  yield takeLeading(REQUEST_ABOUT_CONTENT, fetchAbout);
}
