import { call, put, takeLeading } from "redux-saga/effects";
import {
  createAction,
  webResponseFailure,
  webResponseInitial,
  webResponseRequest,
  webResponseSuccess
} from "../helpers";
import sanity from "../sanity";

const REQUEST_CONFIG_CONTENT = "REQUEST_CONFIG_CONTENT";
const SUCCESS_CONFIG_CONTENT = "SUCCESS_CONFIG_CONTENT";
const FAILURE_CONFIG_CONTENT = "FAILURE_CONFIG_CONTENT";

export const configActions = {
  request: () => createAction(REQUEST_CONFIG_CONTENT, webResponseRequest()),
  success: data =>
    createAction(SUCCESS_CONFIG_CONTENT, webResponseSuccess(data)),
  failure: error =>
    createAction(FAILURE_CONFIG_CONTENT, webResponseFailure(error))
};

const initialState = webResponseInitial();

export const configReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_CONFIG_CONTENT:
    case FAILURE_CONFIG_CONTENT:
    case SUCCESS_CONFIG_CONTENT:
      return action.payload;
    default:
      return state;
  }
};

export const getConfig = () => sanity.getDocument("global-config");

function* fetchConfig() {
  try {
    const response = yield call(getConfig);
    yield put(configActions.success(response));
  } catch (e) {
    yield put(configActions.failure(`${e}`));
  }
}

export function* configSaga() {
  yield takeLeading(REQUEST_CONFIG_CONTENT, fetchConfig);
}
