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

const REQUEST_PRESS_CONTENT = "REQUEST_PRESS_CONTENT";
const SUCCESS_PRESS_CONTENT = "SUCCESS_PRESS_CONTENT";
const FAILURE_PRESS_CONTENT = "FAILURE_PRESS_CONTENT";

export const pressActions = {
  request: () => createAction(REQUEST_PRESS_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_PRESS_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_PRESS_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const pressReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PRESS_CONTENT:
    case FAILURE_PRESS_CONTENT:
    case SUCCESS_PRESS_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getPress = () => sanity.getDocument("global-press");

function* fetchPress() {
  try {
    const response = yield call(getPress);
    yield put(pressActions.success(response));
  } catch (e) {
    logError(e);
    yield put(pressActions.failure());
  }
}

export function* pressSaga() {
  yield takeLeading(REQUEST_PRESS_CONTENT, fetchPress);
}
